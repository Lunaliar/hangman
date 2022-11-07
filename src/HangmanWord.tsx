type HangmanWordProps = {
	guessedLetters: string[];
	wordToGuess: string;
	reveal?: boolean;
};
export function HangmanWord({
	reveal,
	guessedLetters,
	wordToGuess,
}: HangmanWordProps) {
	return (
		<div className="word">
			{wordToGuess.split("").map((letter, index) => {
				return (
					<span className="letter-container">
						<span
							style={{
								visibility:
									guessedLetters.includes(letter) || reveal
										? "visible"
										: "hidden",
								color: !guessedLetters.includes(letter) && reveal ? "red" : "",
							}}
							key={`${index}|${letter}`}
						>
							{letter}
						</span>
					</span>
				);
			})}
		</div>
	);
}
