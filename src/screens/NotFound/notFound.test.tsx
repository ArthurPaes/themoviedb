import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import NotFoundPage from '.';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';

test('renders NotFoundPage component', () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  expect(screen.getByText('Página não encontrada')).toBeInTheDocument();
  expect(
    screen.getByText(
      'Ops, não conseguimos encontrar a página que você está procurando. Tente voltar para a página anterior'
    )
  ).toBeInTheDocument();
  expect(screen.getByText('Voltar para a página inicial')).toBeInTheDocument();
});

test('clicking the link navigates to the home page', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  const { getByText } = render(
    <Router location={history.location} navigator={history}>
      <NotFoundPage />
    </Router>
  );

  act(() => {
    fireEvent.click(getByText('Voltar para a página inicial'));
  });

  expect(history.push).toHaveBeenCalledWith(
    {
      hash: '',
      pathname: '/',
      search: '',
    },
    undefined,
    {}
  );
});
