import React from 'react';
import { render, screen } from '@testing-library/react';
import CardList from './';

test('renders learn react link', () => {
  render(<CardList cards={[]} columns='' />);
});
