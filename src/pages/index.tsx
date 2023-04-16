import type { GetServerSideProps } from 'next';
import { getSession, signOut } from 'next-auth/react';
import { useCurrentUser } from '../../hooks';
import { Navbar } from '@/components';

export default function Home() {
	return (
		<>
			<Navbar/>
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
