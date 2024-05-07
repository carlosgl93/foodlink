import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';
import App from './App';
import { RecoilRoot } from 'recoil';

test('renders without crashing', () => {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
  );
  const linkElement = screen.getByText(/Foodlink/i);
  expect(linkElement).toBeTruthy();
});
