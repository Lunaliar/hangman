import "./app.css";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

type HangmanDrawingProps = {
	numberOfGuesses: number;
};

export function HangmanDrawing({numberOfGuesses}: HangmanDrawingProps) {
	const lives = 6 - numberOfGuesses;
	return (
		<div className="lives">
			{[...Array(lives)].map((n) => (
				<AiFillHeart />
			))}
			{[...Array(numberOfGuesses)].map((n) => (
				<AiOutlineHeart />
			))}
		</div>
	);
}
