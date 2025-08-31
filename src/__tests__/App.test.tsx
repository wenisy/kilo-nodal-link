import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoadingSpinner } from '../App'

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