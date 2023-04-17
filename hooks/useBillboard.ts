import useSwr from 'swr';
import fetcher from '../lib/fetcher';
import { Movie } from '@prisma/client';

export const useBillboard = () => {
	const { data, error, isLoading } = useSwr<Movie>('/api/random', fetcher, {
		revalidateIfStale: false,
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
	});
	return { data, error, isLoading };
};
