import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { useCurrentUser } from '../../hooks';

interface Props {
	visible?: boolean;
}
export const AccountMenu: React.FC<Props> = ({ visible }) => {
	const { data: user } = useCurrentUser();
	if (!visible) {
		return null;
	}
	return (
		<div className='bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800'>
			<div className='flex flex-col gap-3'>
				<div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
					<Image
						src='/images/default-slate.png'
						alt='Default'
						width={1000}
						height={1000}
						style={{
							maxWidth: '100%',
							height: 'auto',
						}}
						className='w-8 rounded-md'
					/>
					<p className='text-white text-sm group-hover/item:underline'>{user?.name}</p>
				</div>
				<hr className='bg-gray-600 border-0 h-px my-4' />
				<div onClick={() => signOut()} className='px-3 text-center text-white text-sm hover:underline'>
					Sign out of Netflix
				</div>
			</div>
		</div>
	);
};
