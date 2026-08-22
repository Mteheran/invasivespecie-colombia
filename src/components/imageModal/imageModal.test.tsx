import { describe, it } from 'vitest';
import { renderWithProviders } from '../../test-utils';
import ImageModal from './imageModal';

describe('ImageModal', () => {
  it('renders without crashing when closed', () => {
    renderWithProviders(
      <ImageModal isOpen={false} url="" setIsModalOpen={() => {}} />
    );
  });
});
