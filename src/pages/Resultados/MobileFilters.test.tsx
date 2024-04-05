import { render, screen } from '@testing-library/react';
import { test, expect, vi } from 'vitest';
import { RecoilRoot } from 'recoil';
import { MobileFilters } from './MobileFilters';

test('renders new title', () => {
  const toggleDrawer = vi.fn();

  render(
    <RecoilRoot>
      <MobileFilters closeFilters={toggleDrawer} />
    </RecoilRoot>,
  );
  const linkElement = screen.getByText(/Comuna donde recibirás apoyo/i);
  expect(linkElement).toBeTruthy();
});
