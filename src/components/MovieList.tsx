import { Movie } from "@prisma/client";
import { MovieCard } from "./";

interface Props {
	movies:Movie[];
	title: string;
}
export const MovieList: React.FC<Props> = ({ movies, title }) => {
	if (!movies) {
		return null;
	}
	return (
		<div className='px-4 md:px-12 mt-4 space-y-8 '>
			<div>
				<p className="text-white text-md md:text-xl lg:text-2xl font-semibold ">{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {movies.map((movie)=>(
            <MovieCard  key={movie.id} movie={movie}/>
          ))}
        </div>
			</div>
		</div>
	);
};
