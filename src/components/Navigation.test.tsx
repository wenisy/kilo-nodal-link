import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact'
      }
      return translations[key] || key
    }
  })
}))

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('Navigation', () => {
  beforeEach(() => {
    // Reset URL for each test
    window.history.pushState({}, '', '/')
  })

  it('renders navigation with correct brand name', () => {
    renderWithRouter(<Navigation />)

    expect(screen.getByText('Nodal Link')).toBeInTheDocument()
    expect(screen.getByAltText('Nodal Link Logo')).toBeInTheDocument()
  })

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />)

    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    renderWithRouter(<Navigation />)

    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Main navigation')

    const brandLink = screen.getByLabelText('Nodal Link - Connecting AI Nodes Through Context')
    expect(brandLink).toBeInTheDocument()
  })

  it('highlights current page correctly', () => {
    // Mock current location as /about
    window.history.pushState({}, '', '/about')
    renderWithRouter(<Navigation />)

    const aboutLink = screen.getByText('About')
    expect(aboutLink).toHaveAttribute('aria-current', 'page')
  })

  it('preserves language parameter in navigation links', () => {
    // Mock URL with language parameter
    window.history.pushState({}, '', '/?lang=zh')
    renderWithRouter(<Navigation />)

    const homeLink = screen.getByText('Home').closest('a')
    expect(homeLink).toHaveAttribute('href', '/?lang=zh')
  })

  it('brand link navigates to home page', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Navigation />)

    const brandLink = screen.getByLabelText('Nodal Link - Connecting AI Nodes Through Context')
    await user.click(brandLink)

    // In a real app, this would navigate to home page
    // For testing, we just verify the link exists and is clickable
    expect(brandLink).toHaveAttribute('href', '/')
  })

  it('navigation links have correct href attributes', () => {
    renderWithRouter(<Navigation />)

    const homeLink = screen.getByText('Home').closest('a')
    const aboutLink = screen.getByText('About').closest('a')
    const blogLink = screen.getByText('Blog').closest('a')
    const contactLink = screen.getByText('Contact').closest('a')

    expect(homeLink).toHaveAttribute('href', '/')
    expect(aboutLink).toHaveAttribute('href', '/about')
    expect(blogLink).toHaveAttribute('href', '/blog')
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('has proper semantic structure', () => {
    renderWithRouter(<Navigation />)

    const nav = screen.getByRole('navigation')
    const list = screen.getByRole('list')
    const listItems = screen.getAllByRole('listitem')

    expect(nav).toBeInTheDocument()
    expect(list).toBeInTheDocument()
    expect(listItems).toHaveLength(4) // Home, About, Blog, Contact
  })
})