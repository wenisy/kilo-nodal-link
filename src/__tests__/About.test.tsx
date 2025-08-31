import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import About from '../pages/About'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('About', () => {
  it('renders without crashing', () => {
    render(<About />)
    expect(true).toBe(true)
  })
})