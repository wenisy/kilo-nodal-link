import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchBar from './SearchBar'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'search.placeholder': 'Search content...',
        'search.noResults': 'No results found',
        'search.results': 'Search Results',
        'search.clear': 'Clear search'
      }
      return translations[key] || key
    }
  })
}))

describe('SearchBar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders search input with correct placeholder', () => {
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('displays clear button when there is search query', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'test query')

    const clearButton = screen.getByText('×')
    expect(clearButton).toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'test query')

    expect(input).toHaveValue('test query')

    const clearButton = screen.getByText('×')
    await user.click(clearButton)

    expect(input).toHaveValue('')
  })

  it('shows search results when query matches content', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'Context')

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument()
    })

    // Should find results containing "Context"
    const results = screen.getAllByRole('button').filter(button =>
      button.textContent?.includes('Context')
    )
    expect(results.length).toBeGreaterThan(0)
  })

  it('shows no results message when query does not match', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'nonexistentterm')

    await waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument()
    })
  })

  it('clears results when search query is cleared', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'Context')

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument()
    })

    // Clear the search
    const clearButton = screen.getByText('×')
    await user.click(clearButton)

    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()
  })

  it('scrolls to section when result is clicked', async () => {
    const user = userEvent.setup()

    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock

    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'Context')

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument()
    })

    // Click on a result
    const resultButtons = screen.getAllByRole('button')
    const contextResult = resultButtons.find(button =>
      button.textContent?.includes('Context')
    )

    if (contextResult) {
      await user.click(contextResult)
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
    }
  })

  it('has proper CSS classes', () => {
    render(<SearchBar />)

    const container = screen.getByPlaceholderText('Search content...').parentElement?.parentElement
    expect(container).toHaveClass('search-container')

    const searchBar = screen.getByPlaceholderText('Search content...').parentElement
    expect(searchBar).toHaveClass('search-bar')

    const input = screen.getByPlaceholderText('Search content...')
    expect(input).toHaveClass('search-input')
  })

  it('handles empty search query correctly', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, '   ') // Only spaces

    // Should not show results for empty/whitespace queries
    expect(screen.queryByText('Search Results')).not.toBeInTheDocument()
    expect(screen.queryByText('No results found')).not.toBeInTheDocument()
  })

  it('is case insensitive in search', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'context') // lowercase

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument()
    })

    // Should still find "Context" (title case)
    const results = screen.getAllByRole('button').filter(button =>
      button.textContent?.toLowerCase().includes('context')
    )
    expect(results.length).toBeGreaterThan(0)
  })

  it('shows result excerpts correctly', async () => {
    const user = userEvent.setup()
    render(<SearchBar />)

    const input = screen.getByPlaceholderText('Search content...')
    await user.type(input, 'Context')

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument()
    })

    // Check that results show excerpts (truncated content)
    const resultItems = screen.getAllByRole('listitem')
    resultItems.forEach(item => {
      const excerpt = item.querySelector('p')
      if (excerpt) {
        expect(excerpt.textContent).toMatch(/\.\.\.$/) // Should end with "..."
      }
    })
  })
})