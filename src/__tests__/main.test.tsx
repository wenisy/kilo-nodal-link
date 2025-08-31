import { describe, it, expect, vi } from 'vitest'

// Mock React
vi.mock('react', () => ({
  StrictMode: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock React DOM
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}))

// Mock App component
vi.mock('../App', () => ({
  default: () => <div>App Component</div>,
}))

// Mock i18n
vi.mock('../i18n', () => ({}))

describe('main.tsx', () => {
  it('imports main module without errors', async () => {
    // Import the main module
    await import('../main')

    expect(true).toBe(true)
  })
})