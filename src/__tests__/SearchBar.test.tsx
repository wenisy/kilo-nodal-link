import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import SearchBar from '../components/SearchBar'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('SearchBar', () => {
  it('renders without crashing', () => {
    render(<SearchBar />)
    expect(true).toBe(true)
  })
})