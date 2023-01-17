import {useEffect} from 'react'

const alphabet = () => {
  const codes = Array.from(Array(26)).map((e, i) => i + 65)
  return codes.map(x => String.fromCharCode(x).toLowerCase())
}

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
      {alphabet().map(key => {
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
