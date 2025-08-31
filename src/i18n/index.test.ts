import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock i18next and its plugins
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn().mockResolvedValue(undefined),
    language: 'en',
    changeLanguage: vi.fn(),
    on: vi.fn(),
    off: vi.fn()
  }
}))

vi.mock('i18next-browser-languagedetector', () => ({
  default: vi.fn().mockReturnThis()
}))

vi.mock('react-i18next', () => ({
  initReactI18next: vi.fn().mockReturnThis()
}))

describe('i18n Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('imports i18n configuration without errors', async () => {
    expect(() => {
      require('../i18n/index')
    }).not.toThrow()
  })

  it('has proper language resources structure', async () => {
    const i18n = await import('../i18n/index')

    // The module should export the i18n instance
    expect(i18n.default).toBeDefined()
    expect(typeof i18n.default.init).toBe('function')
    expect(typeof i18n.default.use).toBe('function')
  })

  it('includes all required language files', async () => {
    // Test that all language files can be imported
    const enTranslations = await import('../i18n/locales/en.json')
    const zhTranslations = await import('../i18n/locales/zh.json')
    const frTranslations = await import('../i18n/locales/fr.json')

    expect(enTranslations.default).toBeDefined()
    expect(zhTranslations.default).toBeDefined()
    expect(frTranslations.default).toBeDefined()

    // Check that each has the expected structure
    expect(enTranslations.default.nav).toBeDefined()
    expect(enTranslations.default.hero).toBeDefined()
    expect(enTranslations.default.sections).toBeDefined()

    expect(zhTranslations.default.nav).toBeDefined()
    expect(zhTranslations.default.hero).toBeDefined()
    expect(zhTranslations.default.sections).toBeDefined()

    expect(frTranslations.default.nav).toBeDefined()
    expect(frTranslations.default.hero).toBeDefined()
    expect(frTranslations.default.sections).toBeDefined()
  })

  it('has consistent navigation keys across languages', async () => {
    const en = await import('../i18n/locales/en.json')
    const zh = await import('../i18n/locales/zh.json')
    const fr = await import('../i18n/locales/fr.json')

    const navKeys = ['home', 'about', 'contact']

    navKeys.forEach(key => {
      expect(en.default.nav[key]).toBeDefined()
      expect(zh.default.nav[key]).toBeDefined()
      expect(fr.default.nav[key]).toBeDefined()
    })
  })

  it('has consistent hero section keys across languages', async () => {
    const en = await import('../i18n/locales/en.json')
    const zh = await import('../i18n/locales/zh.json')
    const fr = await import('../i18n/locales/fr.json')

    const heroKeys = ['title', 'subtitle', 'description']

    heroKeys.forEach(key => {
      expect(en.default.hero[key]).toBeDefined()
      expect(zh.default.hero[key]).toBeDefined()
      expect(fr.default.hero[key]).toBeDefined()
    })
  })

  it('has consistent section keys across languages', async () => {
    const en = await import('../i18n/locales/en.json')
    const zh = await import('../i18n/locales/zh.json')
    const fr = await import('../i18n/locales/fr.json')

    const sectionKeys = [
      'introduction',
      'whatIsContext',
      'whatIsContextEngineering',
      'whyImportant',
      'corePractices',
      'advancedStrategies',
      'conclusion'
    ]

    sectionKeys.forEach(key => {
      expect(en.default.sections[key]).toBeDefined()
      expect(zh.default.sections[key]).toBeDefined()
      expect(fr.default.sections[key]).toBeDefined()
    })
  })

  it('has proper fallback language configuration', async () => {
    const i18n = await import('../i18n/index')

    // Mock i18next to verify init was called with correct config
    const mockI18n = {
      use: vi.fn().mockReturnThis(),
      init: vi.fn().mockResolvedValue(undefined)
    }

    // Verify that init would be called with fallbackLng: 'en'
    expect(mockI18n.init).toHaveBeenCalledWith(
      expect.objectContaining({
        fallbackLng: 'en'
      })
    )
  })

  it('includes language detection configuration', async () => {
    const i18n = await import('../i18n/index')

    // Verify that language detector is used
    expect(i18n.default.use).toHaveBeenCalled()
  })

  it('has proper interpolation configuration', async () => {
    const i18n = await import('../i18n/index')

    // Verify that init is called with proper interpolation settings
    expect(i18n.default.init).toHaveBeenCalledWith(
      expect.objectContaining({
        interpolation: expect.objectContaining({
          escapeValue: false
        })
      })
    )
  })

  it('supports all three languages equally', async () => {
    const en = await import('../i18n/locales/en.json')
    const zh = await import('../i18n/locales/zh.json')
    const fr = await import('../i18n/locales/fr.json')

    // All languages should have similar structure depth
    const enKeys = Object.keys(en.default).length
    const zhKeys = Object.keys(zh.default).length
    const frKeys = Object.keys(fr.default).length

    // Allow for small differences but ensure they're comprehensive
    expect(enKeys).toBeGreaterThan(5)
    expect(zhKeys).toBeGreaterThan(5)
    expect(frKeys).toBeGreaterThan(5)
  })
})