import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import About from './About'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'about.title': 'About Nodal Link',
        'about.introduction.title': 'Our Mission',
        'about.introduction.content': 'In this era of interconnected AI intelligence...',
        'about.vision.title': 'Our Vision',
        'about.vision.content': 'We envision a future where AI intelligence forms...',
        'about.whatWeDo.title': 'Our Services',
        'about.whatWeDo.memory.title': 'Intelligent Context Persistence',
        'about.whatWeDo.memory.description': 'We provide advanced tools...',
        'about.whatWeDo.retrieval.title': 'Advanced Context Retrieval',
        'about.whatWeDo.retrieval.description': 'We build AI-native retrieval...',
        'about.whatWeDo.optimization.title': 'Context Optimization',
        'about.whatWeDo.optimization.description': 'We provide innovative methods...',
        'about.whatWeDo.architecture.title': 'Multi-Agent Architectures',
        'about.whatWeDo.architecture.description': 'We design and deploy...',
        'about.whatWeDo.evaluation.title': 'Context Quality Evaluation',
        'about.whatWeDo.evaluation.description': 'We provide generative benchmarking...',
        'about.team.title': 'Our Team',
        'about.team.content': 'Our team consists of AI researchers...',
        'about.contact.title': 'Get In Touch',
        'about.contact.content': 'Ready to connect your AI nodes...'
      }
      return translations[key] || key
    }
  })
}))

describe('About', () => {
  it('renders without crashing', () => {
    render(<About />)
    expect(screen.getByText('About Nodal Link')).toBeInTheDocument()
  })

  it('renders main title correctly', () => {
    render(<About />)
    expect(screen.getByText('About Nodal Link')).toBeInTheDocument()
  })

  it('renders mission section', () => {
    render(<About />)

    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('In this era of interconnected AI intelligence...')).toBeInTheDocument()
  })

  it('renders vision section', () => {
    render(<About />)

    expect(screen.getByText('Our Vision')).toBeInTheDocument()
    expect(screen.getByText('We envision a future where AI intelligence forms...')).toBeInTheDocument()
  })

  it('renders services section with all services', () => {
    render(<About />)

    expect(screen.getByText('Our Services')).toBeInTheDocument()

    // Check all service titles
    expect(screen.getByText('Intelligent Context Persistence')).toBeInTheDocument()
    expect(screen.getByText('Advanced Context Retrieval')).toBeInTheDocument()
    expect(screen.getByText('Context Optimization')).toBeInTheDocument()
    expect(screen.getByText('Multi-Agent Architectures')).toBeInTheDocument()
    expect(screen.getByText('Context Quality Evaluation')).toBeInTheDocument()
  })

  it('renders team section', () => {
    render(<About />)

    expect(screen.getByText('Our Team')).toBeInTheDocument()
    expect(screen.getByText('Our team consists of AI researchers...')).toBeInTheDocument()
  })

  it('renders contact section', () => {
    render(<About />)

    expect(screen.getByText('Get In Touch')).toBeInTheDocument()
    expect(screen.getByText('Ready to connect your AI nodes...')).toBeInTheDocument()
  })

  it('has proper CSS classes applied', () => {
    render(<About />)

    const aboutElement = document.querySelector('.about')
    expect(aboutElement).toBeInTheDocument()

    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()

    const sections = document.querySelectorAll('.section')
    expect(sections.length).toBe(4) // Mission, Vision, Services, Team, Contact
  })

  it('renders services grid with correct structure', () => {
    render(<About />)

    const servicesGrid = document.querySelector('.services-grid')
    expect(servicesGrid).toBeInTheDocument()

    const serviceCards = document.querySelectorAll('.service-card')
    expect(serviceCards.length).toBe(5) // All 5 services
  })

  it('has proper semantic structure', () => {
    render(<About />)

    // Should have main heading
    const h1 = document.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('About Nodal Link')

    // Should have section headings
    const h2Elements = document.querySelectorAll('h2')
    expect(h2Elements.length).toBe(5) // Mission, Vision, Services, Team, Contact

    // Should have service headings
    const h3Elements = document.querySelectorAll('h3')
    expect(h3Elements.length).toBe(5) // All service titles
  })

  it('has accessible heading hierarchy', () => {
    render(<About />)

    const headings = document.querySelectorAll('h1, h2, h3')
    expect(headings.length).toBeGreaterThan(5)

    // H1 should be the main title
    const h1 = document.querySelector('h1')
    expect(h1).toHaveTextContent('About Nodal Link')

    // H2s should be section titles
    const h2s = document.querySelectorAll('h2')
    expect(h2s).toHaveLength(5)
  })

  it('renders all service descriptions', () => {
    render(<About />)

    expect(screen.getByText('We provide advanced tools...')).toBeInTheDocument()
    expect(screen.getByText('We build AI-native retrieval...')).toBeInTheDocument()
    expect(screen.getByText('We provide innovative methods...')).toBeInTheDocument()
    expect(screen.getByText('We design and deploy...')).toBeInTheDocument()
    expect(screen.getByText('We provide generative benchmarking...')).toBeInTheDocument()
  })

  it('has proper container structure', () => {
    render(<About />)

    const aboutContainer = document.querySelector('.about')
    expect(aboutContainer).toBeInTheDocument()

    const mainContainer = document.querySelector('.container')
    expect(mainContainer).toBeInTheDocument()

    // All content should be within containers
    const sections = document.querySelectorAll('.section')
    sections.forEach(section => {
      expect(section.closest('.container')).toBe(mainContainer)
    })
  })

  it('maintains consistent styling classes', () => {
    render(<About />)

    // Check main classes
    expect(document.querySelector('.about')).toBeInTheDocument()
    expect(document.querySelector('.container')).toBeInTheDocument()

    // Check section classes
    const sections = document.querySelectorAll('.section')
    sections.forEach(section => {
      expect(section).toHaveClass('section')
    })

    // Check services grid classes
    expect(document.querySelector('.services-grid')).toBeInTheDocument()
    expect(document.querySelectorAll('.service-card')).toHaveLength(5)
  })
})