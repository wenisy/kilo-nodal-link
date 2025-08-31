import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { LoadingSpinner } from '../App'
import App from '../App'

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
    Route: ({ element }: { element: React.ReactNode }) => element,
    useLocation: () => ({ pathname: '/' }),
    useSearchParams: () => [new URLSearchParams()],
  }
})

// Mock components
vi.mock('../components/Navigation', () => ({
  default: () => <div data-testid="navigation">Navigation</div>
}))

vi.mock('../components/LanguageSwitcher', () => ({
  default: () => <div data-testid="language-switcher">LanguageSwitcher</div>
}))

vi.mock('../pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('../pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>
}))

vi.mock('../pages/Blog', () => ({
  default: () => <div data-testid="blog-page">Blog Page</div>
}))

vi.mock('../pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>
}))

describe('LoadingSpinner', () => {
  it('renders loading spinner with correct text', () => {
    render(<LoadingSpinner />)

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('has correct class name', () => {
    render(<LoadingSpinner />)

    const container = screen.getByText('Loading...').parentElement
    expect(container).toHaveClass('loading-spinner')
  })

  it('contains spinner element', () => {
    render(<LoadingSpinner />)

    const spinner = document.querySelector('.spinner')
    expect(spinner).toBeInTheDocument()
  })
})

describe('App', () => {
  it('renders App component with navigation and language switcher', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    expect(screen.getByTestId('navigation')).toBeInTheDocument()
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('renders skip link for accessibility', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const skipLink = screen.getByRole('link', { name: /skip to main content/i })
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  it('renders main content area with correct attributes', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const main = screen.getByRole('main')
    expect(main).toHaveAttribute('id', 'main-content')
    expect(main).toHaveAttribute('role', 'main')
  })

  it('has correct App class name', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )

    const appDiv = document.querySelector('.App')
    expect(appDiv).toBeInTheDocument()
  })
})