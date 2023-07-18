import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('input on page', () => {
  render(<App />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
})

test('Buttons appear', () => {
  render(<App />);
  const button = screen.getAllByRole('button');
  expect(button.length).toBe(3);
})

test('Snippet appears', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {name: /Snippet/i});
  expect(headingElement).toBeInTheDocument();
});