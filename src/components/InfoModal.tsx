import { useCallback, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useInfoModal, useMovie } from '../../hooks';
import { FavoriteButton, PlayButton } from './';

interface Props {
	visible?: boolean;
	onClose: any;
}

export const InfoModal: React.FC<Props> = ({ onClose, visible }) => {
	const [isVisible, setIsVisible] = useState(!!visible);
	const { movieId } = useInfoModal();
	const { data: movie } = useMovie(movieId);
  
	useEffect(() => {
		setIsVisible(!!visible);
	}, [visible]);

	const handleClose = useCallback(() => {
		setIsVisible(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [onClose]);
	if (!visible) {
		return null;
	}
	return (
		<div className='z-50 transition duration-300 bg-black/80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0'>
			<div className='relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden'>
				<div
					className={`${
						isVisible ? 'scale-100' : 'scale-0'
					} transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}>
					<div className='relative h-96'>
						<video
							autoPlay
							muted
							loop
							poster={movie?.thumbnailUrl}
							src={movie?.videoUrl}
							className='w-full brightness-[60%] object-cover h-full'
						/>
						<div
							className='cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black/70 flex items-center justify-center'
							onClick={handleClose}>
							<AiOutlineClose className='text-white' size={20} />
						</div>
						<div className='absolute bottom-[10%] left-10'>
							<p className='text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8'>{movie?.title}</p>
							<div className='flex flex-row gap-4 items-center'>
								<PlayButton movieId={movie?.id || ''} />
								<FavoriteButton movieId={movie?.id || ''} />
							</div>
						</div>
					</div>
					<div className='px-12 py-8'>
						<p className='text-green-400 font-semibold text-lg'>New</p>
						<p className='text-white text-lg'>{movie?.duration}</p>
						<p className='text-white text-lg'>{movie?.genre}</p>
						<p className='text-white text-lg'>{movie?.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};
