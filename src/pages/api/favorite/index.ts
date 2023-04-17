import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../lib/serverAuth';
import prismadb from '../../../../lib/prismadb';
import { User } from '@prisma/client';

type Data =
	| {
			message: string;
	  }
	| User;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'POST':
			return updateFavoriteUserMovies(req, res);


		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const updateFavoriteUserMovies = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const { currentUser } = await serverAuth(req, res);
	const { movieId } = req.body;
	const existingMovie = await prismadb.movie.findUnique({
		where: {
			id: movieId,
		},
	});
	if (!existingMovie) {
		throw new Error('Invalid ID');
	}
	try {
		const user = await prismadb.user.update({
			where: {
				email: currentUser.email || '',
			},
			data: {
				favoriteIds: {
					push: movieId,
				},
			},
		});
		return res.status(200).json(user);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};

