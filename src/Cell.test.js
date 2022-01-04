import { render } from '@testing-library/react';
import Cell from './Cell';

it("renders without crashing", () => {
  render(<Cell
    flipCellsAroundMe={() => null}
    isLit={false} />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Cell
    flipCellsAroundMe={() => null}
    isLit={false} />);
    expect(asFragment()).toMatchSnapshot();
});

