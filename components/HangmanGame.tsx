'use client'

import React, { useState, useEffect } from 'react'

const WORDS = [
  'PROGRAMOWANIE',
  'KOMPUTER',
  'JAVASCRIPT',
  'REAKTYWNY',
  'WISIELEC',
  'ZABAWA',
  'GDZIEŚ',
  'MOŻE',
  'TAKŻE',
  'WŁAŚNIE'
]

const POLISH_ALPHABET = [
  'A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 
  'M', 'N', 'Ń', 'O', 'Ó', 'P', 'Q', 'R', 'S', 'Ś', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Ź', 'Ż'
]

const MAX_ERRORS = 6

export default function HangmanGame() {
  const [currentWord, setCurrentWord] = useState('')
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [errors, setErrors] = useState(0)
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing')

  const initializeGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setCurrentWord(randomWord)
    setGuessedLetters([])
    setErrors(0)
    setGameStatus('playing')
  }

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (currentWord && guessedLetters.length > 0) {
      const wordLetters = currentWord.split('')
      const isWordComplete = wordLetters.every(letter => guessedLetters.includes(letter))
      
      if (isWordComplete) {
        setGameStatus('won')
      } else if (errors >= MAX_ERRORS) {
        setGameStatus('lost')
      }
    }
  }, [currentWord, guessedLetters, errors])

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameStatus !== 'playing') {
      return
    }

    const newGuessedLetters = [...guessedLetters, letter]
    setGuessedLetters(newGuessedLetters)

    if (!currentWord.includes(letter)) {
      setErrors(errors + 1)
    }
  }

  const getDisplayWord = () => {
    if (!currentWord) return ''
    
    return currentWord
      .split('')
      .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
      .join(' ')
  }

  const getGameMessage = () => {
    if (gameStatus === 'won') {
      return '🎉 Gratulacje! Wygrałeś! 🎉'
    } else if (gameStatus === 'lost') {
      return `💀 Przegrałeś! Słowo to: ${currentWord} 💀`
    }
    return ''
  }

  return (
    <div className="hangman-game">
      <h1>🎮 WISIELEC 🎮</h1>
      
      <div className="game-info">
        <div data-testid="error-count" className="error-count">
          Błędy: {errors}/{MAX_ERRORS}
        </div>
        
        <div className="hangman-display">
          {getHangmanDisplay(errors)}
        </div>
      </div>

      <div data-testid="word-display" className="word-display">
        {getDisplayWord()}
      </div>

      <div className="game-message">
        {getGameMessage()}
      </div>

      <div className="alphabet-grid">
        {POLISH_ALPHABET.map(letter => (
          <button
            key={letter}
            className={`letter-button ${guessedLetters.includes(letter) ? 'used' : ''}`}
            onClick={() => handleLetterGuess(letter)}
            disabled={guessedLetters.includes(letter) || gameStatus !== 'playing'}
          >
            {letter}
          </button>
        ))}
      </div>

      <button className="new-game-button" onClick={initializeGame}>
        🆕 Nowa Gra 🆕
      </button>
    </div>
  )
}

function getHangmanDisplay(errors: number): string {
  const hangmanStages = [
    '',
    '  +---+\n      |',
    '  +---+\n  |   |',
    '  +---+\n  |   |\n  O   |',
    '  +---+\n  |   |\n  O   |\n  |   |',
    '  +---+\n  |   |\n  O   |\n /|   |',
    '  +---+\n  |   |\n  O   |\n /|\\  |\n /    |\n      |\n=========',
  ]
  
  return hangmanStages[errors] || hangmanStages[hangmanStages.length - 1]
}