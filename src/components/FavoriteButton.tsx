import { useCallback, useMemo } from 'react';
import axios from 'axios';
import { AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { useCurrentUser, useFavorites } from '../../hooks';

interface Props {
	movieId: string;
}

export const FavoriteButton: React.FC<Props> = ({ movieId }) => {
	const { mutate: mutateFavorites } = useFavorites();
	const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
	const isFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(movieId);
	}, [currentUser?.favoriteIds, movieId]);

	const toggleFavorites = useCallback(async () => {
		let response;
		if (isFavorite) {
			response = await axios.delete(`/api/favorite/${movieId}`);
		} else {
			response = await axios.post('/api/favorite', { movieId });
		}
		const updatedFavoriteIds = response.data.favoriteIds;
		mutateCurrentUser({
			...currentUser!,
			favoriteIds: updatedFavoriteIds,
		});
		mutateFavorites();
	}, [isFavorite, movieId, currentUser, mutateCurrentUser, mutateFavorites]);
	const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
	return (
		<div
			onClick={toggleFavorites}
			className='cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300'>
			<Icon className='text-white' size={25} />
		</div>
	);
};
