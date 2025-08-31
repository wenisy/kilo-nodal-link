import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Contact from '../pages/Contact'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('Contact', () => {
  it('renders without crashing', () => {
    render(<Contact />)
    expect(true).toBe(true)
  })
})