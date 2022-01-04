import { render, fireEvent } from '@testing-library/react';
import Board from './Board';


/**
 * Mock the Math.random function so that the same board is always generated
 */
beforeEach(function () {
  jest
    .spyOn(Math, "random")
    .mockReturnValue(0.1);
});

/**
 * Undo the mock after all tests
 */
afterEach(function () {
  Math.random.mockRestore();
});

it("renders the board without crashing", () => {
  render(<Board />);
});

it("matches the board snapshot", () => {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});

it("responds to a cell click", () => {
  const { queryByTestId } = render(<Board />);

  const testCell = queryByTestId("2-2");
  const aboveCell = queryByTestId("1-2")
  const leftCell = queryByTestId("2-1")
  const rightCell = queryByTestId("2-3")
  const belowCell = queryByTestId("3-2")

  // ensure all cells are extinguished
  expect(testCell).toHaveClass("Cell");
  expect(testCell).not.toHaveClass("Cell-lit");
  expect(aboveCell).not.toHaveClass("Cell-lit");
  expect(belowCell).not.toHaveClass("Cell-lit");
  expect(leftCell).not.toHaveClass("Cell-lit");
  expect(rightCell).not.toHaveClass("Cell-lit");

  fireEvent.click(testCell);

  // ensure all cells are illuminated
  expect(testCell).toHaveClass("Cell-lit");
  expect(aboveCell).toHaveClass("Cell-lit");
  expect(belowCell).toHaveClass("Cell-lit");
  expect(leftCell).toHaveClass("Cell-lit");
  expect(rightCell).toHaveClass("Cell-lit");
});

