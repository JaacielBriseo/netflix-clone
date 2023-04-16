interface Props {
	label: string;
}
export const NavbarItem: React.FC<Props> = ({ label }) => {
	return <div className='text-white cursor-pointer hover:text-gray-300 transition'>{label}</div>;
};
