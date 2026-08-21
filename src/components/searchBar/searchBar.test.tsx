import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import SearchBar from './searchBar';

describe('SearchBar', () => {
  it('renders the search input', () => {
    renderWithProviders(<SearchBar value="" />);
    expect(screen.getByPlaceholderText('Buscar')).toBeInTheDocument();
  });
});
