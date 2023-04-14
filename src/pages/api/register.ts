import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import prismadb from '../../../lib/prismadb';
import { User } from '@prisma/client';
type Data =
	| {
			message: string;
	  }
	| User;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return registerUser(req, res);

		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}
const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { email = '', name = '', password = '' } = req.body as { email: string; name: string; password: string };
	try {
		const existingUser = await prismadb.user.findUnique({
			where: {
				email,
			},
		});
		if (existingUser) {
			return res.status(422).json({ message: 'Email already taken' });
		}
		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prismadb.user.create({
			data: {
				email,
				name,
				hashedPassword,
				image: '',
				emailVerified: new Date(),
			},
		});
		return res.status(201).json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json({
			message: 'Error, contact the admin.',
		});
	}
};
