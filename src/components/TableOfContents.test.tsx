import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TableOfContents from './TableOfContents'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'toc.title': 'Table of Contents',
        'toc.introduction': 'Introduction',
        'toc.whatIsContext': 'What is Context',
        'toc.whatIsContextEngineering': 'What is Context Engineering',
        'toc.whyImportant': 'Why Important',
        'toc.corePractices': 'Core Practices',
        'toc.advancedStrategies': 'Advanced Strategies',
        'toc.conclusion': 'Conclusion'
      }
      return translations[key] || key
    }
  })
}))

describe('TableOfContents', () => {
  let scrollToSpy: vi.SpyInstance

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToSpy = vi.fn()
    Object.defineProperty(window, 'scrollTo', {
      writable: true,
      value: scrollToSpy
    })

    // Mock getBoundingClientRect for elements
    Element.prototype.getBoundingClientRect = vi.fn(() => ({
      width: 100,
      height: 100,
      top: 0,
      left: 0,
      bottom: 100,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => ({})
    }))

    // Reset scroll position
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 0
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not render when scroll position is less than 300px', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 200
    })

    render(<TableOfContents />)
    expect(screen.queryByText('Table of Contents')).not.toBeInTheDocument()
  })

  it('renders when scroll position is greater than 300px', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    render(<TableOfContents />)
    expect(screen.getByText('Table of Contents')).toBeInTheDocument()
  })

  it('displays all table of contents items', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    render(<TableOfContents />)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('What is Context')).toBeInTheDocument()
    expect(screen.getByText('What is Context Engineering')).toBeInTheDocument()
    expect(screen.getByText('Why Important')).toBeInTheDocument()
    expect(screen.getByText('Core Practices')).toBeInTheDocument()
    expect(screen.getByText('Advanced Strategies')).toBeInTheDocument()
    expect(screen.getByText('Conclusion')).toBeInTheDocument()
  })

  it('has correct CSS classes', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    render(<TableOfContents />)

    const container = screen.getByText('Table of Contents').parentElement?.parentElement
    expect(container).toHaveClass('toc-container')

    const toc = screen.getByText('Table of Contents').parentElement
    expect(toc).toHaveClass('toc')

    const title = screen.getByText('Table of Contents')
    expect(title).toHaveClass('toc-title')
  })

  it('scrolls to correct section when link is clicked', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    // Mock scrollIntoView
    const scrollIntoViewMock = vi.fn()
    Element.prototype.scrollIntoView = scrollIntoViewMock

    render(<TableOfContents />)

    const introductionLink = screen.getByText('Introduction')
    fireEvent.click(introductionLink)

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('updates active section based on scroll position', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    // Mock element positions
    const mockGetElementById = vi.fn((id: string) => {
      if (id === 'introduction') {
        return { offsetTop: 300 }
      }
      return { offsetTop: 600 }
    })

    vi.spyOn(document, 'getElementById').mockImplementation(mockGetElementById)

    render(<TableOfContents />)

    // Trigger scroll event
    fireEvent.scroll(window)

    // The active section should be 'introduction' since it's at offsetTop 300
    const introductionLink = screen.getByText('Introduction').closest('button')
    expect(introductionLink).toHaveClass('active')
  })

  it('handles scroll events correctly', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(<TableOfContents />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('has proper semantic structure', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    render(<TableOfContents />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()

    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(7) // All TOC items
  })

  it('has correct accessibility attributes', () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      value: 400
    })

    render(<TableOfContents />)

    const links = screen.getAllByRole('button')
    links.forEach(link => {
      expect(link).toHaveAttribute('type', 'button')
    })
  })
})