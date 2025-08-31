import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'contact.title': 'Contact Us',
        'contact.subtitle': 'Connect with Nodal Link',
        'contact.introduction': 'Ready to connect your AI nodes...',
        'contact.form.name': 'Name',
        'contact.form.email': 'Email',
        'contact.form.subject': 'Subject',
        'contact.form.message': 'Message',
        'contact.form.submit': 'Send Message',
        'contact.info.title': 'Contact Information',
        'contact.info.email': 'Email: info@nodal-link.com',
        'contact.info.response': 'We typically respond within 24-48 hours.',
        'contact.social.title': 'Follow Us',
        'contact.social.description': 'Stay connected with the latest developments...'
      }
      return translations[key] || key
    }
  })
}))

// Mock window.alert
const mockAlert = vi.fn()
Object.defineProperty(window, 'alert', {
  writable: true,
  value: mockAlert
})

describe('Contact', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<Contact />)
    expect(screen.getByText('Contact Us')).toBeInTheDocument()
  })

  it('renders main title and subtitle', () => {
    render(<Contact />)

    expect(screen.getByText('Contact Us')).toBeInTheDocument()
    expect(screen.getByText('Connect with Nodal Link')).toBeInTheDocument()
  })

  it('renders introduction text', () => {
    render(<Contact />)

    expect(screen.getByText('Ready to connect your AI nodes...')).toBeInTheDocument()
  })

  it('renders contact form with all required fields', () => {
    render(<Contact />)

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Subject')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument()
  })

  it('renders contact information section', () => {
    render(<Contact />)

    expect(screen.getByText('Contact Information')).toBeInTheDocument()
    expect(screen.getByText('Email: info@nodal-link.com')).toBeInTheDocument()
    expect(screen.getByText('We typically respond within 24-48 hours.')).toBeInTheDocument()
  })

  it('renders social media section', () => {
    render(<Contact />)

    expect(screen.getByText('Follow Us')).toBeInTheDocument()
    expect(screen.getByText('Stay connected with the latest developments...')).toBeInTheDocument()
  })

  it('has proper form structure', () => {
    render(<Contact />)

    const form = document.querySelector('form')
    expect(form).toBeInTheDocument()

    const inputs = document.querySelectorAll('input')
    expect(inputs).toHaveLength(3) // name, email, subject

    const textarea = document.querySelector('textarea')
    expect(textarea).toBeInTheDocument()

    const submitButton = document.querySelector('button[type="submit"]')
    expect(submitButton).toBeInTheDocument()
  })

  it('has proper CSS classes applied', () => {
    render(<Contact />)

    expect(document.querySelector('.contact')).toBeInTheDocument()
    expect(document.querySelector('.container')).toBeInTheDocument()
    expect(document.querySelector('.contact-content')).toBeInTheDocument()
    expect(document.querySelector('.contact-form')).toBeInTheDocument()
    expect(document.querySelector('.contact-info')).toBeInTheDocument()
  })

  it('has accessible form labels', () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText('Name')
    expect(nameInput).toHaveAttribute('id', 'name')

    const emailInput = screen.getByLabelText('Email')
    expect(emailInput).toHaveAttribute('id', 'email')

    const subjectInput = screen.getByLabelText('Subject')
    expect(subjectInput).toHaveAttribute('id', 'subject')

    const messageTextarea = screen.getByLabelText('Message')
    expect(messageTextarea).toHaveAttribute('id', 'message')
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    const submitButton = screen.getByRole('button', { name: 'Send Message' })

    // Try to submit empty form
    await user.click(submitButton)

    // Check that form validation prevents submission
    // (Note: HTML5 validation behavior may vary by browser)
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageTextarea = screen.getByLabelText('Message')

    expect(nameInput).toBeRequired()
    expect(emailInput).toBeRequired()
    expect(subjectInput).toBeRequired()
    expect(messageTextarea).toBeRequired()
  })

  it('handles form submission correctly', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    // Fill out the form
    await user.type(screen.getByLabelText('Name'), 'John Doe')
    await user.type(screen.getByLabelText('Email'), 'john@example.com')
    await user.type(screen.getByLabelText('Subject'), 'Test Subject')
    await user.type(screen.getByLabelText('Message'), 'Test message content')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    await user.click(submitButton)

    // Check that alert was called (mock implementation)
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalledWith('Thank you for your message! We will get back to you soon.')
    })
  })

  it('clears form after successful submission', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    // Fill out the form
    const nameInput = screen.getByLabelText('Name')
    const emailInput = screen.getByLabelText('Email')
    const subjectInput = screen.getByLabelText('Subject')
    const messageTextarea = screen.getByLabelText('Message')

    await user.type(nameInput, 'John Doe')
    await user.type(emailInput, 'john@example.com')
    await user.type(subjectInput, 'Test Subject')
    await user.type(messageTextarea, 'Test message content')

    // Submit the form
    const submitButton = screen.getByRole('button', { name: 'Send Message' })
    await user.click(submitButton)

    // Check that form is cleared
    await waitFor(() => {
      expect(nameInput).toHaveValue('')
      expect(emailInput).toHaveValue('')
      expect(subjectInput).toHaveValue('')
      expect(messageTextarea).toHaveValue('')
    })
  })

  it('has proper semantic structure', () => {
    render(<Contact />)

    const headings = document.querySelectorAll('h1, h2, h3')
    expect(headings.length).toBeGreaterThan(3)

    const h1 = document.querySelector('h1')
    expect(h1).toHaveTextContent('Contact Us')

    const h2s = document.querySelectorAll('h2')
    expect(h2s.length).toBeGreaterThan(1)
  })

  it('has proper contact information cards', () => {
    render(<Contact />)

    const infoCards = document.querySelectorAll('.info-card')
    expect(infoCards.length).toBe(2) // Contact info and social media

    const contactInfoCard = infoCards[0]
    expect(contactInfoCard).toHaveTextContent('Contact Information')

    const socialCard = infoCards[1]
    expect(socialCard).toHaveTextContent('Follow Us')
  })

  it('maintains responsive layout classes', () => {
    render(<Contact />)

    expect(document.querySelector('.contact-content')).toBeInTheDocument()
    expect(document.querySelector('.contact-form')).toBeInTheDocument()
    expect(document.querySelector('.contact-info')).toBeInTheDocument()
  })

  it('has proper form styling classes', () => {
    render(<Contact />)

    const formGroups = document.querySelectorAll('.form-group')
    expect(formGroups.length).toBe(4) // name, email, subject, message

    const submitBtn = document.querySelector('.submit-btn')
    expect(submitBtn).toBeInTheDocument()
    expect(submitBtn).toHaveClass('submit-btn')
  })
})