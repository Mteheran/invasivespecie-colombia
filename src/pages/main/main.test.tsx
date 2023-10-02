import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './main';

describe('Main Page Test', () => {
  test('renders learn react link', () => {
    render(<Main />);
  });
  test('Url with a search', () => {
    render(<Main />);
  });
  test('Url with an id', () => {
    render(<Main />);
  });
})


