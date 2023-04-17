import type { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { useMovieList } from '../../hooks';
import { Billboard, MovieList, Navbar } from '@/components';

export default function Home() {
	const { data: movies = [] } = useMovieList();
	return (
		<>
			<Navbar />
			<Billboard />
			<div className='pb-40'>
				<MovieList title='Trending now' movies={movies} />
			</div>
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
