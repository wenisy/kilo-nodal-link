import { describe, it, expect, vi } from 'vitest'

// Mock i18next and its plugins
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockResolvedValue(undefined),
  },
}))

vi.mock('i18next-browser-languagedetector', () => ({
  default: vi.fn(),
}))

vi.mock('react-i18next', () => ({
  initReactI18next: vi.fn(),
}))

// Mock locale files
vi.mock('../i18n/locales/en.json', () => ({
  default: { key: 'value' },
}))

vi.mock('../i18n/locales/zh.json', () => ({
  default: { key: '值' },
}))

vi.mock('../i18n/locales/fr.json', () => ({
  default: { key: 'valeur' },
}))

describe('i18n configuration', () => {
  it('imports i18n configuration without errors', async () => {
    // Import the i18n configuration
    await import('../i18n/index')

    expect(true).toBe(true)
  })
})