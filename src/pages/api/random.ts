import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../lib/serverAuth';
import prismadb from '../../../lib/prismadb';
import { Movie } from '@prisma/client';
type Data =
	| {
			message: string;
	  }
	| Movie;

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getRandom(req, res);

		default:
			return res.status(400).json({ message: 'Bad request' });
	}
}

const getRandom = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await serverAuth(req);
		const movieCount = await prismadb.movie.count();
		const randomIndex = Math.floor(Math.random() * movieCount);
		const randomMovies = await prismadb.movie.findMany({
			take: 1,
			skip: randomIndex,
		});
		return res.status(200).json(randomMovies[0]);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};
