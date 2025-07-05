import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test } from '@jest/globals'

function TestComponent() {
  return <div>Test Setup Working</div>
}

test('renders test component', () => {
  render(<TestComponent />)
  expect(screen.getByText('Test Setup Working')).toBeInTheDocument()
})