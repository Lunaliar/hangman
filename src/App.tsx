import {useState, useEffect, useCallback} from "react";
import {HangmanDrawing} from "./HangmanDrawing";
import {HangmanWord} from "./HangmanWord";
import {Keyboard} from "./Keyboard";
import words from "./wordList.json";
function App() {
	function getWord() {
		return words[Math.floor(Math.random() * words.length)];
	}
	const [secretWord, setSecretWord] = useState(getWord());

	console.log(secretWord); //!! GET RID OF THIS LINE

	const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
	const incorrectLetters = guessedLetters.filter(
		(letter) => !secretWord.includes(letter)
	);
	const isLoser = incorrectLetters.length >= 6;
	const isWinner = secretWord
		.split("")
		.every((letter) => guessedLetters.includes(letter));
	const disabled = isLoser || isWinner;
	const addGussedLetter = useCallback(
		(letter: string) => {
			if (guessedLetters.includes(letter) || isLoser || isWinner) return;
			setGuessedLetters((currentLetters) => [...currentLetters, letter]);
		},
		[guessedLetters, isWinner, isLoser]
	);

	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (!key.match(/^[a-z]$/)) return;
			e.preventDefault();
			addGussedLetter(key);
		};
		document.addEventListener("keypress", handler);
		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters]);
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			const key = e.key;
			if (key !== "Enter") return;

			e.preventDefault();
			setGuessedLetters([]);
			setSecretWord(getWord());
		};
		document.addEventListener("keypress", handler);
		return () => {
			document.removeEventListener("keypress", handler);
		};
	}, [guessedLetters]);

	return (
		<div className="App">
			<div className="left">
				<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
				<div className="win-loss">
					{isWinner && "- You've won! -  [Enter] to retry"}
					{isLoser && "- You've lost - [Enter] to retry"}
				</div>
			</div>
			<div>
				<HangmanWord
					reveal={isLoser}
					guessedLetters={guessedLetters}
					wordToGuess={secretWord}
				/>
				<Keyboard
					activeLetters={guessedLetters.filter((letter) =>
						secretWord.includes(letter)
					)}
					disabled={disabled}
					inactiveLetters={incorrectLetters}
					addGuessedLetter={addGussedLetter}
				/>
			</div>
		</div>
	);
}

export default App;
