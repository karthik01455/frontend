import React from 'react';
import { screen, render } from '@testing-library/react';
import LoginImage from '..';
describe('LoginImage', () => {
  it('should render the LoginImage page', () => {
    render(<LoginImage />);
    expect(screen.getByText('LoginImage')).toBeInTheDocument();
  });
  it('should render the LoginImage page', () => {
    render(<LoginImage />);
    expect(screen.getByText('LoginImage')).toBeInTheDocument();
  });
  it('should rednder login image', () => {
    const { getAllByTestId } = render(<LoginImage />);
    expect(getAllByTestId('login-image')).toHaveLength(1);
  });
});
