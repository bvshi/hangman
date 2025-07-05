import { expect, test } from '@jest/globals'

test('jest configuration is working', () => {
  expect(1 + 1).toBe(2)
})

test('testing library jest-dom matchers are available', () => {
  const element = document.createElement('div')
  element.textContent = 'Hello World'
  expect(element).toHaveTextContent('Hello World')
})