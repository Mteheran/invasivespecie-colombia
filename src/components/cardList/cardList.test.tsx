import { describe, it } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import CardList from './';

describe('CardList', () => {
  it('renders without crashing when the list is empty', () => {
    renderWithProviders(<CardList cards={[]} columns="1fr" />);
  });
});
