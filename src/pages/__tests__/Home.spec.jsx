import { describe, it, expect, afterEach, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'

import Home from '../Home.jsx'

describe('Home', () => {
  vi.mock('@okta/okta-react', () => ({
    useOktaAuth: () => ({authState: {isAuthenticated: false}, oktaAuth: {}})
  }))

  afterEach(() => {
    cleanup();
  })

  it('renders default text', () => {
    const msg = 'PKCE Flow w/ Okta Hosted Login Page'
    render(<Home />);
    const el = screen.getAllByText(msg);
    expect(el).toBeTruthy()
  })
})
