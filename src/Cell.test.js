import { render } from '@testing-library/react';
import Cell from './Cell';

it("renders a cell without crashing", () => {
  render(<Cell
    flipCellsAroundMe={() => null}
    isLit={false} />);
});

it("matches the cell snapshot", () => {
  const { asFragment } = render(<Cell
    flipCellsAroundMe={() => null}
    isLit={false} />);
    expect(asFragment()).toMatchSnapshot();
});

