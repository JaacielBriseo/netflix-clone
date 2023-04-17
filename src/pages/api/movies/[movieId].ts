import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../../lib/serverAuth';
import prismadb from '../../../../lib/prismadb';
import { Movie } from '@prisma/client';

type Data = { message: string } | Movie;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getMovie(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}
const getMovie = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await serverAuth(req, res);
		const { movieId = '' } = req.query;

		if (typeof movieId !== 'string') {
			throw new Error('Invalid ID');
		}
		const movie = await prismadb.movie.findUnique({
			where: {
				id: movieId,
			},
		});
		if (!movie) {
			throw new Error('Not movie found');
		}
		return res.status(200).json(movie);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};
