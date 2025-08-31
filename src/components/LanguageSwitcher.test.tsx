import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import LanguageSwitcher from './LanguageSwitcher'

// Mock react-i18next
const mockChangeLanguage = vi.fn()
const mockI18n = {
  language: 'en',
  changeLanguage: mockChangeLanguage
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
    t: vi.fn()
  })
}))

// Mock react-router-dom
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/' })
  }
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockI18n.language = 'en'
  })

  it('renders language selector with correct options', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('en')

    // Check all language options are present
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: '中文' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Français' })).toBeInTheDocument()
  })

  it('displays current language correctly', () => {
    mockI18n.language = 'zh'
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('zh')
  })

  it('calls changeLanguage and navigate when language is changed', async () => {
    const user = userEvent.setup()
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'zh')

    expect(mockChangeLanguage).toHaveBeenCalledWith('zh')
    expect(mockNavigate).toHaveBeenCalledWith('/zh/')
  })

  it('preserves current path when changing language', async () => {
    const user = userEvent.setup()

    // Mock current location as /about
    vi.mocked(await import('react-router-dom')).useLocation = () => ({ pathname: '/about' })

    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'fr')

    expect(mockNavigate).toHaveBeenCalledWith('/fr/about')
  })

  it('removes language prefix when switching to English', async () => {
    const user = userEvent.setup()

    // Mock current location with language prefix
    vi.mocked(await import('react-router-dom')).useLocation = () => ({ pathname: '/zh/about' })

    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'en')

    expect(mockNavigate).toHaveBeenCalledWith('/about')
  })

  it('handles root path correctly when switching to English', async () => {
    const user = userEvent.setup()

    // Mock current location with language prefix on root
    vi.mocked(await import('react-router-dom')).useLocation = () => ({ pathname: '/zh/' })

    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    await user.selectOptions(select, 'en')

    expect(mockNavigate).toHaveBeenCalledWith('/')
  })

  it('has proper styling classes', () => {
    renderWithRouter(<LanguageSwitcher />)

    const container = screen.getByRole('combobox').parentElement
    expect(container).toHaveClass('language-switcher')

    const select = screen.getByRole('combobox')
    expect(select).toHaveClass('language-select')
  })

  it('supports all three languages', () => {
    renderWithRouter(<LanguageSwitcher />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)

    const languages = ['en', 'zh', 'fr']
    languages.forEach(lang => {
      expect(screen.getByDisplayValue(lang)).toBeInTheDocument()
    })
  })
})