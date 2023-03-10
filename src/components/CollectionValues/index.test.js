import React from 'react';
import { screen, render } from '@testing-library/react';
import CollectionValues from '..';
describe('CollectionValues', () => {
  it('should render the CollectionValues page', () => {
    render(<CollectionValues />);
    expect(screen.getByText('CollectionValues')).toBeInTheDocument();
  });
  it('should render the CollectionValues page', () => {
    render(<CollectionValues />);
    expect(screen.getByText('CollectionValues')).toBeInTheDocument();
  });
});
