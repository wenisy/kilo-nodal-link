import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blog.title': 'Blog',
        'blog.subtitle': 'Latest Insights on AI Node Linking',
        'blog.introduction': 'Stay updated with the latest developments...',
        'blog.posts.title': 'Recent Posts',
        'blog.posts.empty': 'No blog posts available yet.',
        'blog.categories.title': 'Categories',
        'blog.tags.title': 'Tags',
        'blog.search.placeholder': 'Search articles...',
        'blog.readMore': 'Read More'
      }
      return translations[key] || key
    }
  })
}))

describe('Blog', () => {
  it('renders without crashing', () => {
    render(<Blog />)
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders main title and subtitle', () => {
    render(<Blog />)

    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Latest Insights on AI Node Linking')).toBeInTheDocument()
  })

  it('renders introduction text', () => {
    render(<Blog />)

    expect(screen.getByText('Stay updated with the latest developments...')).toBeInTheDocument()
  })

  it('renders blog structure sections', () => {
    render(<Blog />)

    expect(screen.getByText('Recent Posts')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('shows empty state message', () => {
    render(<Blog />)

    expect(screen.getByText('No blog posts available yet.')).toBeInTheDocument()
  })

  it('has proper CSS classes applied', () => {
    render(<Blog />)

    expect(document.querySelector('.blog')).toBeInTheDocument()
    expect(document.querySelector('.container')).toBeInTheDocument()
    expect(document.querySelector('.blog-content')).toBeInTheDocument()
    expect(document.querySelector('.blog-sidebar')).toBeInTheDocument()
  })

  it('has proper semantic structure', () => {
    render(<Blog />)

    const h1 = document.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent('Blog')

    const h2Elements = document.querySelectorAll('h2')
    expect(h2Elements.length).toBeGreaterThan(2)
  })

  it('renders search input', () => {
    render(<Blog />)

    const searchInput = screen.getByPlaceholderText('Search articles...')
    expect(searchInput).toBeInTheDocument()
  })

  it('has accessible structure', () => {
    render(<Blog />)

    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3')
    expect(headings.length).toBeGreaterThan(3)

    // Check for main content areas
    expect(document.querySelector('.blog-content')).toBeInTheDocument()
    expect(document.querySelector('.blog-sidebar')).toBeInTheDocument()
  })

  it('maintains consistent layout', () => {
    render(<Blog />)

    // Blog should have main container
    const blogContainer = document.querySelector('.blog')
    expect(blogContainer).toBeInTheDocument()

    // Should have content and sidebar
    const content = document.querySelector('.blog-content')
    const sidebar = document.querySelector('.blog-sidebar')
    expect(content).toBeInTheDocument()
    expect(sidebar).toBeInTheDocument()
  })

  it('has proper blog sections structure', () => {
    render(<Blog />)

    // Should have posts section
    const postsSection = document.querySelector('.blog-posts')
    expect(postsSection).toBeInTheDocument()

    // Should have categories section
    const categoriesSection = document.querySelector('.blog-categories')
    expect(categoriesSection).toBeInTheDocument()

    // Should have tags section
    const tagsSection = document.querySelector('.blog-tags')
    expect(tagsSection).toBeInTheDocument()
  })

  it('renders blog metadata correctly', () => {
    render(<Blog />)

    // Check for proper text content
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('Latest Insights on AI Node Linking')).toBeInTheDocument()
    expect(screen.getByText('Recent Posts')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('has responsive design classes', () => {
    render(<Blog />)

    const blogElement = document.querySelector('.blog')
    expect(blogElement).toBeInTheDocument()

    // Check for responsive classes that would be applied
    const container = document.querySelector('.container')
    expect(container).toBeInTheDocument()
  })
})