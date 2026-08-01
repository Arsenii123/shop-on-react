import { render, screen, within } from '@testing-library/react';
import Homepage from './assets/components/homepage.jsx';

describe('Компонент Homepage', () => {
    it('має кнопку меню', () => {
        render(<Homepage />);
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('має меню', () => {
        render(<Homepage />);
        expect(screen.getByRole('menu')).toBeInTheDocument(); // або getByRole('navigation')
    });

    it('у кожному продукті є зображення', () => {
        render(<Homepage />);
        const cards = screen.getAllByTestId('iLove');

        cards.forEach((card) => {
            expect(within(card).getByRole('img')).toBeInTheDocument();
        });
    });

    it('у кожному продукті є ціна', () => {
        render(<Homepage />);
        const cards = screen.getAllByTestId('info');

        cards.forEach((card) => {
            // найкраще перевіряти за текстом ціни, якщо він є
            expect(within(card).getByText(/₴|грн|\$|\d+/)).toBeInTheDocument();
            // або просто наявність <p>
            // expect(card.querySelector('p')).toBeInTheDocument();
        });
    });
});