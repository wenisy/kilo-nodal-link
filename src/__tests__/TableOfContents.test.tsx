import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import TableOfContents from '../components/TableOfContents'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('TableOfContents', () => {
  it('renders without crashing', () => {
    render(<TableOfContents />)
    expect(true).toBe(true)
  })
})