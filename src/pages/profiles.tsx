import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { getSession } from 'next-auth/react';
import { useCurrentUser } from '../../hooks';

const ProfilesPage = () => {
	const router = useRouter();
	const { data: user } = useCurrentUser();

	return (
		<div className='flex items-center justify-center h-full'>
			<div className='flex flex-col'>
				<h1 className='text-3xl md:text-6xl text-white text-center'>Who is watching?</h1>
				<div className='flex items-center justify-center gap-8 mt-10'>
					<div onClick={() => router.push('/')}>
						<div className='group flex-row w-44 mx-auto'>
							<div className='w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden'>
								<Image
									src='/default-slate.png'
									alt='Default'
									width={1000}
									height={1000}
									style={{
										maxWidth: '100%',
										height: 'auto',
									}}
								/>
							</div>
							<div className='mt-4 text-gray-400 text-2xl text-center group-hover:text-white capitalize'>
								{user?.name}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ctx => {
	const session = await getSession(ctx);
	if (!session) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
export default ProfilesPage;
