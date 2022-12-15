import {useEffect} from 'react'

const KEYS = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

type keyboardProps = {
  activeLetters: string[]
  disabled: boolean
  inactiveLetters: string[]
  addGuessedLetter: (letter: string) => void
}

export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled,
}: keyboardProps) {
  return (
    <div className="keyboard">
      {KEYS.map(key => {
        const isActive = activeLetters.includes(key)
        const isInActive = inactiveLetters.includes(key)
        return (
          <button
            className={`button ${isActive ? 'active' : ''} ${
              isInActive ? 'inactive' : ''
            }`}
            key={key}
            disabled={isActive || isInActive || disabled}
            onClick={() => addGuessedLetter(key)}
          >
            {key}
          </button>
        )
      })}
    </div>
  )
}
