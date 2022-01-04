import { render } from '@testing-library/react';
import Board from './Board';


/**
 * Mock the Math.random function so that the same board is always generated
 */
beforeEach(function () {
  jest
    .spyOn(Math, "random")
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.9)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.9)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.9)
    .mockReturnValueOnce(0.1)
    .mockReturnValueOnce(0.9)
    .mockReturnValueOnce(0.1);
});

/**
 * Undo the mock after all tests
 */
afterEach(function () {
  Math.random.mockRestore();
});

it("renders without crashing", () => {
  render(<Board />);
});

it("matches the snapshot", () => {
  const { asFragment } = render(<Board />);
  console.log();
  expect(asFragment()).toMatchSnapshot();
});

// it("responds to a cell click", () => {

// })

