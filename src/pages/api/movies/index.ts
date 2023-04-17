import type { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '../../../../lib/prismadb';
import serverAuth from '../../../../lib/serverAuth';
import { Movie } from '@prisma/client';
type Data =
	| {
			message: string;
	  }
	| Movie[];

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getMovies(req, res);

		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}

const getMovies = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		await serverAuth(req);
		const movies = await prismadb.movie.findMany();
		return res.status(200).json(movies);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Some error occur.' });
	}
};
