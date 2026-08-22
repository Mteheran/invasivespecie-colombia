import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '../../test-utils';
import Card from './card';
import { enrichSpecie } from '../../services/invasiveSpecie';

const specie = enrichSpecie({
  id: 55,
  name: 'Caracol gigante africano',
  scientificName: 'Achatina fulica',
  commonNames: 'Caracol africano',
  impact: 'Alto impacto en cultivos y salud humana.',
  manage: 'Recolección manual',
  riskLevel: 2,
  urlImage: '',
});

describe('Card', () => {
  it('renders the specie name, scientific name and risk badge', () => {
    renderWithProviders(<Card card={specie} />);
    expect(screen.getByText('Caracol gigante africano')).toBeInTheDocument();
    expect(screen.getByText('Achatina fulica')).toBeInTheDocument();
    expect(screen.getByText('Riesgo alto')).toBeInTheDocument();
  });
});
