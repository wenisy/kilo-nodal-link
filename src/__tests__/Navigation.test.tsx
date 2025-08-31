import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

// Mock react-router-dom hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
    useSearchParams: () => [new URLSearchParams()],
    Link: ({ to, children, ...props }: any) => <a href={to} {...props}>{children}</a>,
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navigation', () => {
  it('renders navigation with correct structure', () => {
    renderWithRouter(<Navigation />)

    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it('renders navigation container with correct class', () => {
    renderWithRouter(<Navigation />)

    const container = document.querySelector('.nav-container')
    expect(container).toBeInTheDocument()
  })

  it('renders navigation brand with logo and text', () => {
    renderWithRouter(<Navigation />)

    const brandLink = screen.getByRole('link', { name: /nodal link - connecting ai nodes through context/i })
    expect(brandLink).toBeInTheDocument()
    expect(brandLink).toHaveAttribute('href', '/')

    const logo = document.querySelector('.nav-logo')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/favicon.svg')
    expect(logo).toHaveAttribute('alt', 'Nodal Link Logo')
  })

  it('renders all navigation links', () => {
    renderWithRouter(<Navigation />)

    const navList = screen.getByRole('list')
    expect(navList).toBeInTheDocument()

    const links = screen.getAllByRole('link')
    // Should have brand link + 4 navigation links
    expect(links).toHaveLength(5)
  })

  it('renders home link with correct attributes', () => {
    renderWithRouter(<Navigation />)

    const homeLink = screen.getByRole('link', { name: 'nav.home' })
    expect(homeLink).toBeInTheDocument()
    expect(homeLink).toHaveAttribute('href', '/')
    expect(homeLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders about link', () => {
    renderWithRouter(<Navigation />)

    const aboutLink = screen.getByRole('link', { name: 'nav.about' })
    expect(aboutLink).toBeInTheDocument()
    expect(aboutLink).toHaveAttribute('href', '/about')
  })

  it('renders blog link', () => {
    renderWithRouter(<Navigation />)

    const blogLink = screen.getByRole('link', { name: 'nav.blog' })
    expect(blogLink).toBeInTheDocument()
    expect(blogLink).toHaveAttribute('href', '/blog')
  })

  it('renders contact link', () => {
    renderWithRouter(<Navigation />)

    const contactLink = screen.getByRole('link', { name: 'nav.contact' })
    expect(contactLink).toBeInTheDocument()
    expect(contactLink).toHaveAttribute('href', '/contact')
  })

  it('applies correct CSS classes', () => {
    renderWithRouter(<Navigation />)

    expect(document.querySelector('.navigation')).toBeInTheDocument()
    expect(document.querySelector('.nav-links')).toBeInTheDocument()
    expect(document.querySelector('.nav-brand')).toBeInTheDocument()
  })
})