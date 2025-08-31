import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import Blog from '../pages/Blog'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      if (options?.returnObjects) {
        return [
          {
            id: '1',
            title: 'Blog Post 1',
            excerpt: 'Excerpt 1',
            date: '2024-01-01',
            readTime: '5 min',
            category: 'Tech'
          }
        ]
      }
      return key
    },
  }),
}))

describe('Blog', () => {
  it('renders without crashing', () => {
    render(<Blog />)
    expect(true).toBe(true)
  })
})