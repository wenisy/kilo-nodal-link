import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'hero.title': 'Nodal Link',
        'hero.subtitle': 'Connecting AI Nodes Through Context',
        'hero.description': 'Transforming AI development by connecting intelligent nodes through systematic context engineering.',
        'sections.introduction.title': 'Introduction',
        'sections.introduction.content': 'Current AI application development content...',
        'sections.whatIsContext.title': 'What is Context',
        'sections.whatIsContext.definition': 'Context definition...',
        'sections.whatIsContextEngineering.title': 'What is Context Engineering',
        'sections.whatIsContextEngineering.definition': 'Context engineering definition...',
        'sections.whyImportant.title': 'Why Context Engineering is Essential',
        'sections.corePractices.title': 'Core Practices',
        'sections.advancedStrategies.title': 'Advanced Strategies',
        'sections.conclusion.title': 'Conclusion',
        'sections.conclusion.content': 'Conclusion content...'
      }
      return translations[key] || key
    }
  })
}))

// Mock TableOfContents component
vi.mock('../components/TableOfContents', () => ({
  default: () => <div data-testid="table-of-contents">Table of Contents</div>
}))

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />)
    expect(screen.getByText('Nodal Link')).toBeInTheDocument()
  })

  it('renders hero section with correct content', () => {
    render(<Home />)

    expect(screen.getByText('Nodal Link')).toBeInTheDocument()
    expect(screen.getByText('Connecting AI Nodes Through Context')).toBeInTheDocument()
    expect(screen.getByText('Transforming AI development by connecting intelligent nodes through systematic context engineering.')).toBeInTheDocument()
  })

  it('renders TableOfContents component', () => {
    render(<Home />)
    expect(screen.getByTestId('table-of-contents')).toBeInTheDocument()
  })

  it('renders all main sections', () => {
    render(<Home />)

    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('What is Context')).toBeInTheDocument()
    expect(screen.getByText('What is Context Engineering')).toBeInTheDocument()
    expect(screen.getByText('Why Context Engineering is Essential')).toBeInTheDocument()
    expect(screen.getByText('Core Practices')).toBeInTheDocument()
    expect(screen.getByText('Advanced Strategies')).toBeInTheDocument()
    expect(screen.getByText('Conclusion')).toBeInTheDocument()
  })

  it('has proper section IDs for navigation', () => {
    render(<Home />)

    // Check that sections have the correct IDs for TOC navigation
    expect(document.getElementById('hero')).toBeInTheDocument()
    expect(document.getElementById('introduction')).toBeInTheDocument()
    expect(document.getElementById('what-is-context')).toBeInTheDocument()
    expect(document.getElementById('what-is-context-engineering')).toBeInTheDocument()
    expect(document.getElementById('why-important')).toBeInTheDocument()
    expect(document.getElementById('core-practices')).toBeInTheDocument()
    expect(document.getElementById('advanced-strategies')).toBeInTheDocument()
    expect(document.getElementById('conclusion')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Home />)

    const homeElement = document.querySelector('.home')
    expect(homeElement).toBeInTheDocument()

    // Check for sections
    const sections = document.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(5) // Should have multiple sections

    // Check for headings
    const headings = document.querySelectorAll('h1, h2, h3')
    expect(headings.length).toBeGreaterThan(5)
  })

  it('renders context categories section', () => {
    render(<Home />)

    // Should have context categories grid
    const contextCategories = document.querySelector('.context-categories')
    expect(contextCategories).toBeInTheDocument()

    // Should have category cards
    const categoryCards = document.querySelectorAll('.category-card')
    expect(categoryCards.length).toBe(3) // Instructional, Informational, Actionable
  })

  it('renders practices grid section', () => {
    render(<Home />)

    // Should have practices grid
    const practicesGrid = document.querySelector('.practices-grid')
    expect(practicesGrid).toBeInTheDocument()

    // Should have practice cards
    const practiceCards = document.querySelectorAll('.practice-card')
    expect(practiceCards.length).toBe(4) // Writing, Selection, Compression, Isolation
  })

  it('has proper CSS classes applied', () => {
    render(<Home />)

    expect(document.querySelector('.home')).toBeInTheDocument()
    expect(document.querySelector('.hero')).toBeInTheDocument()
    expect(document.querySelector('.hero-content')).toBeInTheDocument()
    expect(document.querySelectorAll('.section')).toHaveLength(7) // All main sections
  })

  it('renders hero section with gradient background class', () => {
    render(<Home />)

    const heroSection = document.querySelector('.hero')
    expect(heroSection).toBeInTheDocument()
    expect(heroSection).toHaveClass('hero')
  })

  it('has accessible heading structure', () => {
    render(<Home />)

    // Should have main heading
    const h1 = document.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Nodal Link')

    // Should have section headings
    const h2Elements = document.querySelectorAll('h2')
    expect(h2Elements.length).toBeGreaterThan(5)

    // Check specific section headings
    expect(screen.getByText('Introduction')).toBeInTheDocument()
    expect(screen.getByText('What is Context')).toBeInTheDocument()
  })

  it('renders all content sections with proper structure', () => {
    render(<Home />)

    // Each section should have a container
    const sections = document.querySelectorAll('.section')
    sections.forEach(section => {
      const container = section.querySelector('.container')
      expect(container).toBeInTheDocument()
    })
  })
})