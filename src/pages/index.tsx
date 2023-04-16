import type { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useCurrentUser } from '../../hooks';

export default function Home() {
	const { data: user } = useCurrentUser();
	return (
		<>
			<h1 className='text-2xl'>Netlix Clone</h1>
			<p>Logged in as : {user?.name}</p>
			<button onClick={() => signOut()} className='h-10 w-full bg-white'>
				Logout
			</button>
		</>
	);
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ctx => {
	const session = await getSession(ctx);

	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
