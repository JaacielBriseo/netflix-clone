import useSwr from 'swr';
import fetcher from '../lib/fetcher';
import { Movie } from '@prisma/client';
export const useMovie = (movieId?: string) => {
	const {data,error,isLoading} = useSwr<Movie>(movieId ? `/api/movies/${movieId}` : null, fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return {data,error,isLoading};
};
