import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../lib/serverAuth';
import { User } from '@prisma/client';

type Data =
	| {
			message: string;
	  }
	| User;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'DELETE':
			return deleteExistingFavoriteId(req, res);

		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}
const deleteExistingFavoriteId = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { currentUser } = await serverAuth(req, res);
	const { movieId } = req.query;
	try {
		const existingMovie = await prismadb.movie.findUnique({
			where: {
				id: movieId!.toString(),
			},
		});
		if (!existingMovie) {
			throw new Error('Invalid ID');
		}
		const updatedUser = await prismadb.user.update({
			where: {
				email: currentUser.email || '',
			},
			data: {
				favoriteIds: currentUser.favoriteIds.filter(favoriteId => favoriteId !== movieId),
			},
		});
		return res.status(200).json(updatedUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};
