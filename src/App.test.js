import { fireEvent, render } from '@testing-library/react';
import App from './App';
import { timesTwo } from './function'
import { Checkbox } from './Checkbox';


test('renders h1', () => {
  const { getByText } = render(<App />);
  const h1 = getByText(/Welcome/)
  // const linkElement = screen.getByText(/learn react/i);
  expect(h1).toHaveTextContent("Welcome");
});

test("Multiplies by 2", () => {
  expect(timesTwo(4)).toBe(8);
})

test("Selecting Chechbox", () => {
  const { getByLabelText } = render(<Checkbox />)
  const checkbox = getByLabelText(/Not Checked/)
  fireEvent.click(checkbox)
  expect(checkbox.checked).toEqual(true)
})