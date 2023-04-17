import { useCallback, useState } from 'react';
import type { GetServerSideProps } from 'next';
import { getSession, signIn } from 'next-auth/react';
import Image from 'next/image';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Input } from '@/components/Input';

const AuthPage = () => {
	const [userData, setUserData] = useState({
		email: '',
		name: '',
		password: '',
	});
	const [variant, setVariant] = useState<'login' | 'register'>('login');

	const toggleVariant = useCallback(() => {
		setVariant(currentVariant => (currentVariant === 'login' ? 'register' : 'login'));
	}, []);

	const register = useCallback(async () => {
		const { email, name, password } = userData;
		try {
			await axios.post('/api/register', {
				email,
				name,
				password,
			});
			await signIn('credentials', { email, password });
		} catch (error) {
			console.log(error);
		}
	}, [userData]);

	const login = useCallback(async () => {
		const { email, password } = userData;
		try {
			await signIn('credentials', { email, password });
		} catch (error) {
			console.log(error);
		}
	}, [userData]);
	return (
		<div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
			<div className='bg-black w-full h-full lg:bg-opacity-50'>
				<nav className='px-12 py-5'>
					<Image
						src='/images/logo.png'
						alt='Logo'
						width={100}
						height={48}
						style={{ width: 'auto', height: 'auto' }}
						priority
					/>
				</nav>
				<div className='flex justify-center'>
					<div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full'>
						<h2 className='text-white text-4xl mb-8 font-semibold'>{variant === 'login' ? 'Sign in' : 'Register'}</h2>
						<div className='flex flex-col gap-4'>
							{variant === 'register' && (
								<Input
									label='Name'
									id='name'
									type='name'
									value={userData.name}
									onValueChange={({ target }) => setUserData({ ...userData, [target.id]: target.value })}
								/>
							)}
							<Input
								label='Email'
								id='email'
								type='email'
								value={userData.email}
								onValueChange={({ target }) => setUserData({ ...userData, [target.id]: target.value })}
							/>
							<Input
								label='Password'
								id='password'
								type='password'
								value={userData.password}
								onValueChange={({ target }) => setUserData({ ...userData, [target.id]: target.value })}
							/>
						</div>
						<button
							onClick={variant === 'login' ? login : register}
							className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'>
							{variant === 'login' ? 'Login' : 'Sign up'}
						</button>
						<div className='flex flex-row items-center gap-4 mt-8 justify-center'>
							<div
								onClick={() => signIn('google', { callbackUrl: '/profiles' })}
								className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
								<FcGoogle size={30} />
							</div>
							<div
								onClick={() => signIn('github', { callbackUrl: '/profiles' })}
								className='w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition'>
								<FaGithub size={30} />
							</div>
						</div>
						<p className='text-neutral-500 mt-12'>
							{variant === 'login' ? 'First time using Netflix ?' : 'Already have an account?'}
							<span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
								{variant === 'login' ? 'Create an account' : 'Login'}
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx);
	if (session) {
		return {
			redirect: {
				destination: '/profiles',
				permanent: false,
			},
		};
	}
	return {
		props: {},
	};
};
export default AuthPage;
