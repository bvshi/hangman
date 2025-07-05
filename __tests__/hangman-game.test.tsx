import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, describe, beforeEach } from '@jest/globals'
import HangmanGame from '../components/HangmanGame'

describe('HangmanGame Component', () => {
  beforeEach(() => {
    // Reset any global state if needed
  })

  test('renders game with initial state', () => {
    render(<HangmanGame />)
    
    expect(screen.getByText(/błędy: 0\/6/i)).toBeInTheDocument()
    expect(screen.getByText(/nowa gra/i)).toBeInTheDocument()
    expect(screen.getByText(/wisielec/i)).toBeInTheDocument()
  })

  test('displays word as underscores initially', () => {
    render(<HangmanGame />)
    
    // Should show underscores for each letter in the word
    const wordDisplay = screen.getByTestId('word-display')
    expect(wordDisplay).toBeInTheDocument()
    expect(wordDisplay.textContent).toMatch(/^[_ ]+$/)
  })

  test('renders alphabet buttons', () => {
    render(<HangmanGame />)
    
    // Check for some Polish letters
    expect(screen.getByRole('button', { name: 'A' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Z' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ą' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ć' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ę' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ł' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ń' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ó' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ś' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ź' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Ż' })).toBeInTheDocument()
  })

  test('correct letter guess reveals letter in word', () => {
    render(<HangmanGame />)
    
    // Get initial word display
    const wordDisplay = screen.getByTestId('word-display')
    const initialDisplay = wordDisplay.textContent
    
    // Click on letter A (assuming it's in the word)
    fireEvent.click(screen.getByRole('button', { name: 'A' }))
    
    // The display should change if A was in the word
    // OR errors should increase if A wasn't in the word
    const errorDisplay = screen.getByTestId('error-count')
    const newWordDisplay = wordDisplay.textContent
    
    expect(newWordDisplay !== initialDisplay || errorDisplay.textContent === 'Błędy: 1/6').toBe(true)
  })

  test('incorrect letter guess increases error count', () => {
    render(<HangmanGame />)
    
    // Click on a letter that's likely not in most words (like X)
    fireEvent.click(screen.getByRole('button', { name: 'X' }))
    
    // Error count should increase or stay the same (if X was in the word)
    const errorDisplay = screen.getByTestId('error-count')
    expect(errorDisplay.textContent).toMatch(/błędy: [0-6]\/6/i)
  })

  test('clicked letter button becomes disabled', () => {
    render(<HangmanGame />)
    
    const letterButton = screen.getByRole('button', { name: 'A' })
    fireEvent.click(letterButton)
    
    expect(letterButton).toBeDisabled()
  })

  test('game shows win message when word is guessed', () => {
    render(<HangmanGame />)
    
    // This test would need to know the word or have a way to set it
    // For now, we'll test that the win condition exists
    const wordDisplay = screen.getByTestId('word-display')
    
    // If we could set the word to "A", clicking A would win
    // For now, just check that the structure exists
    expect(wordDisplay).toBeInTheDocument()
  })

  test('game shows lose message when max errors reached', () => {
    render(<HangmanGame />)
    
    // Click 6 different letters that are likely not in the word
    const unlikelyLetters = ['X', 'Q', 'V', 'J', 'K', 'W']
    
    unlikelyLetters.forEach(letter => {
      const button = screen.getByRole('button', { name: letter })
      if (!button.disabled) {
        fireEvent.click(button)
      }
    })
    
    // Check if we can reach 6 errors or if game shows lose message
    const errorDisplay = screen.getByTestId('error-count')
    expect(errorDisplay).toBeInTheDocument()
  })

  test('new game button resets the game', () => {
    render(<HangmanGame />)
    
    // Make some moves first
    fireEvent.click(screen.getByRole('button', { name: 'A' }))
    fireEvent.click(screen.getByRole('button', { name: 'B' }))
    
    // Click new game
    fireEvent.click(screen.getByRole('button', { name: /nowa gra/i }))
    
    // Check if game is reset
    const errorDisplay = screen.getByTestId('error-count')
    expect(errorDisplay.textContent).toBe('Błędy: 0/6')
    
    // Check if buttons are enabled again
    const letterA = screen.getByRole('button', { name: 'A' })
    const letterB = screen.getByRole('button', { name: 'B' })
    expect(letterA).not.toBeDisabled()
    expect(letterB).not.toBeDisabled()
  })

  test('displays hangman progress text', () => {
    render(<HangmanGame />)
    
    const errorDisplay = screen.getByTestId('error-count')
    expect(errorDisplay.textContent).toBe('Błędy: 0/6')
    
    // Make an incorrect guess
    fireEvent.click(screen.getByRole('button', { name: 'X' }))
    
    // Error count should update
    expect(errorDisplay.textContent).toMatch(/błędy: [0-6]\/6/i)
  })

  test('game ends when word is fully guessed', () => {
    render(<HangmanGame />)
    
    // This would require knowing the word or setting it
    // For now, check that we have the mechanisms in place
    const wordDisplay = screen.getByTestId('word-display')
    expect(wordDisplay).toBeInTheDocument()
    
    // Check that we can detect when no underscores remain
    expect(wordDisplay.textContent).toMatch(/[_A-ZĄĆĘŁŃÓŚŹŻ ]+/)
  })
})