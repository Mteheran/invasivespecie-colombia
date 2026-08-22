import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import Main from './main';

describe('Main layout', () => {
  it('renders the nav wordmark and footer without crashing', () => {
    renderWithProviders(<Main />);
    expect(screen.getAllByText(/Especies Invasoras/i).length).toBeGreaterThan(0);
  });
});
