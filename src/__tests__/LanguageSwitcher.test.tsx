import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import LanguageSwitcher from '../components/LanguageSwitcher'

// Mock react-i18next
const mockChangeLanguage = vi.fn()
const mockI18n = {
  language: 'en',
  changeLanguage: mockChangeLanguage,
}

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
    t: (key: string) => key,
  }),
}))

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useSearchParams: () => [new URLSearchParams()],
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
  }
})

// Mock localStorage
const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
})

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockI18n.language = 'en'
  })

  it('renders language switcher with select element', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).toHaveValue('en')
  })

  it('renders all language options', () => {
    renderWithRouter(<LanguageSwitcher />)

    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)

    expect(options[0]).toHaveValue('en')
    expect(options[0]).toHaveTextContent('English')

    expect(options[1]).toHaveValue('zh')
    expect(options[1]).toHaveTextContent('中文')

    expect(options[2]).toHaveValue('fr')
    expect(options[2]).toHaveTextContent('Français')
  })

  it('has correct container class', () => {
    renderWithRouter(<LanguageSwitcher />)

    const container = document.querySelector('.language-switcher')
    expect(container).toBeInTheDocument()
  })

  it('has correct select class', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = document.querySelector('.language-select')
    expect(select).toBeInTheDocument()
  })

  it('calls changeLanguage when language is changed', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'zh' } })

    expect(mockChangeLanguage).toHaveBeenCalledWith('zh')
  })

  it('stores language preference in localStorage', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'zh' } })

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('i18nextLng', 'zh')
  })

  it('handles English language selection correctly', () => {
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'en' } })

    expect(mockChangeLanguage).toHaveBeenCalledWith('en')
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('i18nextLng', 'en')
  })

  it('reflects current language in select value', () => {
    mockI18n.language = 'fr'
    renderWithRouter(<LanguageSwitcher />)

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('fr')
  })
})