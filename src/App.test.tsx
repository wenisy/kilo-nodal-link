import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Mock all child components
vi.mock('./components/Navigation', () => ({
  default: () => <nav data-testid="navigation">Navigation</nav>
}))

vi.mock('./components/LanguageSwitcher', () => ({
  default: () => <div data-testid="language-switcher">Language Switcher</div>
}))

vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>
}))

vi.mock('./pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>
}))

vi.mock('./pages/Contact', () => ({
  default: () => <div data-testid="contact-page">Contact Page</div>
}))

vi.mock('./pages/Blog', () => ({
  default: () => <div data-testid="blog-page">Blog Page</div>
}))

const renderWithRouter = (component: React.ReactElement, initialRoute = '/') => {
  window.history.pushState({}, '', initialRoute)
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('App', () => {
  it('renders without crashing', () => {
    renderWithRouter(<App />)
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('renders navigation component', () => {
    renderWithRouter(<App />)
    expect(screen.getByTestId('navigation')).toBeInTheDocument()
  })

  it('renders language switcher component', () => {
    renderWithRouter(<App />)
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument()
  })

  it('renders home page by default', () => {
    renderWithRouter(<App />, '/')
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders about page on /about route', () => {
    renderWithRouter(<App />, '/about')
    expect(screen.getByTestId('about-page')).toBeInTheDocument()
  })

  it('renders contact page on /contact route', () => {
    renderWithRouter(<App />, '/contact')
    expect(screen.getByTestId('contact-page')).toBeInTheDocument()
  })

  it('renders blog page on /blog route', () => {
    renderWithRouter(<App />, '/blog')
    expect(screen.getByTestId('blog-page')).toBeInTheDocument()
  })

  it('handles language-prefixed routes correctly', () => {
    renderWithRouter(<App />, '/en/about')
    expect(screen.getByTestId('about-page')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    renderWithRouter(<App />)

    // Should have main content area
    const mainContent = document.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()

    // Should have App container
    const appContainer = document.querySelector('.App')
    expect(appContainer).toBeInTheDocument()
  })

  it('renders all route components', () => {
    // Test home route
    renderWithRouter(<App />, '/')
    expect(screen.getByTestId('home-page')).toBeInTheDocument()

    // Test about route
    renderWithRouter(<App />, '/about')
    expect(screen.getByTestId('about-page')).toBeInTheDocument()

    // Test contact route
    renderWithRouter(<App />, '/contact')
    expect(screen.getByTestId('contact-page')).toBeInTheDocument()

    // Test blog route
    renderWithRouter(<App />, '/blog')
    expect(screen.getByTestId('blog-page')).toBeInTheDocument()
  })

  it('maintains consistent layout across routes', () => {
    const routes = ['/', '/about', '/contact', '/blog']

    routes.forEach(route => {
      renderWithRouter(<App />, route)

      // Navigation should always be present
      expect(screen.getByTestId('navigation')).toBeInTheDocument()

      // Language switcher should always be present
      expect(screen.getByTestId('language-switcher')).toBeInTheDocument()

      // Main content should always be present
      const mainContent = document.querySelector('.main-content')
      expect(mainContent).toBeInTheDocument()
    })
  })

  it('handles unknown routes gracefully', () => {
    // For unknown routes, React Router should handle 404 or redirect
    // This test ensures the app doesn't crash on unknown routes
    expect(() => {
      renderWithRouter(<App />, '/unknown-route')
    }).not.toThrow()
  })

  it('has proper CSS classes applied', () => {
    renderWithRouter(<App />)

    const appElement = document.querySelector('.App')
    expect(appElement).toBeInTheDocument()
    expect(appElement).toHaveClass('App')

    const mainContent = document.querySelector('.main-content')
    expect(mainContent).toBeInTheDocument()
    expect(mainContent).toHaveClass('main-content')
  })
})