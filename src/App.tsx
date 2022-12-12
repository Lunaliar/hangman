import {useState, useEffect, useCallback} from "react";
import {HangmanDrawing} from "./HangmanDrawing";
import {HangmanWord} from "./HangmanWord";
import {Keyboard} from "./Keyboard";
import {FaSkull} from "react-icons/fa";
import words from "./wordList.json";
function App() {
	function getWord() {
		return words[Math.floor(Math.random() * words.length)];
	}
	const [secretWord, setSecretWord] = useState(getWord());

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
			<div className="icons">
				{incorrectLetters.length < 6 ? (
					<HangmanDrawing numberOfGuesses={incorrectLetters.length} />
				) : (
					<FaSkull className="skull" />
				)}
			</div>
			<div className="win-loss">
				{!isWinner && !isLoser ? "Good luck!" : ""}
				{isWinner && "- You've won! -  [Enter] to retry"}
				{isLoser && "- You've lost - [Enter] to retry"}
			</div>
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
			<p className="credit">
				<a href="https://savcodes.dev">Sav Costabile</a> Ⓒ 2022
			</p>
		</div>
	);
}

export default App;
