import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useMovie } from '../../../hooks';

const Watch = () => {
	const router = useRouter();
	const { movieId } = router.query;

	const { data: movie } = useMovie(movieId as string);
	return (
		<div className='h-screen w-screen bg-black'>
			<nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70 '>
				<AiOutlineArrowLeft className='text-white cursor-pointer' size={40} onClick={() => router.push('/')} />
				<p className='text-white text-xl md:text-3xl font-bold'>
					<span className='font-light'>Watching:</span>
					{movie?.title}
				</p>
			</nav>
			<video src={movie?.videoUrl} className='h-full w-full' autoPlay controls />
		</div>
	);
};

export default Watch;
