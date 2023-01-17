import {useState, useEffect, useCallback} from 'react'
import {HangmanDrawing} from './HangmanDrawing'
import {HangmanWord} from './HangmanWord'
import {Keyboard} from './Keyboard'
import {FaSkull} from 'react-icons/fa'
import words from './wordList.json'
function App() {
  const getWord = () => words[Math.floor(Math.random() * words.length)]

  const [secretWord, setSecretWord] = useState(getWord())

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const incorrectLetters = guessedLetters.filter(
    letter => !secretWord.includes(letter)
  )
  const isLoser = incorrectLetters.length >= 6

  const isWinner = secretWord
    .split('')
    .every(letter => guessedLetters.includes(letter))

  const disabled = isLoser || isWinner

  const addGussedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return
      setGuessedLetters(currentLetters => [...currentLetters, letter])
    },
    [guessedLetters, isWinner, isLoser]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGussedLetter(e.key)
    }
    document.addEventListener('keypress', handler)
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      setGuessedLetters([])
      setSecretWord(getWord())
    }
    document.addEventListener('keypress', handler)
    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

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
        {!isWinner && !isLoser ? 'Good luck!' : ''}
        {isWinner && (
          <div className="win-loss-message">
            <span>- You've Won! -</span>
            <span>[Enter] to retry</span>
          </div>
        )}
        {isLoser && (
          <div className="win-loss-message">
            <span>- You've lost -</span>
            <span>[Enter] to retry</span>
          </div>
        )}
      </div>
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={secretWord}
      />
      <Keyboard
        activeLetters={guessedLetters.filter(letter =>
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
  )
}

export default App
