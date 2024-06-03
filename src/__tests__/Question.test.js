import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Question from "../components/Question";

const testQuestion = {
  id: 1,
  prompt: "lorem testum",
  answers: ["choice 1", "choice 2", "choice 3", "choice 4"],
  correctIndex: 0,
};

const noop = () => {};

beforeEach(() => {
  jest.useFakeTimers(); // Use fake timers to control time-related functions
});

afterEach(() => {
  jest.runOnlyPendingTimers(); // Run only pending timers
  jest.useRealTimers(); // Restore real timers
});

test("decrements the timer by 1 every second", () => {
  render(<Question question={testQuestion} onAnswered={noop} />); // Render Question component
  expect(screen.queryByText(/10 seconds remaining/)).toBeInTheDocument(); // Ensure the initial timer text is displayed
  act(() => {
    jest.advanceTimersByTime(1000); // Advance timers by 1 second
  });
  expect(screen.queryByText(/9 seconds remaining/)).toBeInTheDocument(); // Ensure the timer decrements correctly
  // Repeat the above steps for decrementing the timer
});

test("calls onAnswered after 10 seconds", () => {
  const onAnswered = jest.fn(); // Mock the onAnswered function
  render(<Question question={testQuestion} onAnswered={onAnswered} />); // Render the Question component with the mocked function
  act(() => {
    jest.advanceTimersByTime(10000); // Advance timers by 10 seconds
  });
  expect(onAnswered).toHaveBeenCalledWith(false); // Verify that onAnswered was called with the expected arguments
});






