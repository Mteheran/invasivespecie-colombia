import { describe, it } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import ImageContainer from './imageContainer';

describe('ImageContainer', () => {
  it('renders without crashing', () => {
    renderWithProviders(
      <ImageContainer imgURL="https://example.com/img.jpg" imgAlt="Especie" />
    );
  });
});
