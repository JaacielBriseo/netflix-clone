import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import prismadb from '../../../../lib/prismadb';
import { compare } from 'bcryptjs';
export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'text',
				},
				password: {
					label: 'Password',
					type: 'password',
				},
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					throw new Error('Email and password required');
				}
				const user = await prismadb.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (!user || !user.hashedPassword) {
					throw new Error('Email does not exist');
				}
				const isCorrectPassword = await compare(credentials.password, user.hashedPassword);
				if (!isCorrectPassword) {
					throw new Error('Incorrect password');
				}
				return user;
			},
		}),
	],
	pages: {
		signIn: '/auth',
	},
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.NEXTAUTH_SECRET,

	session: {
		maxAge: 2592000, 
		strategy: 'jwt',
		updateAge: 86400, 
	},

	jwt: {
		secret: process.env.NEXTAUTH_JWT_SECRET,
	},
};

export default NextAuth(authOptions);