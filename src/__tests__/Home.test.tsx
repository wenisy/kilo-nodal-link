import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Home from '../pages/Home'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock components
vi.mock('../components/TableOfContents', () => ({
  default: () => <div data-testid="table-of-contents">TableOfContents</div>
}))

vi.mock('../components/SearchBar', () => ({
  default: () => <div data-testid="search-bar">SearchBar</div>
}))

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(true).toBe(true)
  })
})