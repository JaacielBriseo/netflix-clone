import type { NextApiRequest, NextApiResponse } from 'next';
import serverAuth from '../../../lib/serverAuth';
import { User } from '@prisma/client';

type Data =
	| {
			message: string;
	  }
	| User;
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	switch (req.method) {
		case 'GET':
			return getCurrentUser(req, res);

		default:
			return res.status(400).json({ message: 'Bad request.' });
	}
}
const getCurrentUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	try {
		const { currentUser } = await serverAuth(req);
		return res.status(200).json(currentUser);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Some error happened.Contact the admin.',
		});
	}
};
