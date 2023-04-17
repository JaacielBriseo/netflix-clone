import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../lib/serverAuth';
import prismadb from '../../../lib/prismadb';
import { Movie } from '@prisma/client';

type Data =
	| {
			message: string;
	  }
	| Movie[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getFavorites(req, res);

		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}

const getFavorites = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { currentUser } = await serverAuth(req,res);
		const favoriteMovies = await prismadb.movie.findMany({
			where: {
				id: {
					in: currentUser.favoriteIds,
				},
			},
		});
		return res.status(200).json(favoriteMovies);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};
