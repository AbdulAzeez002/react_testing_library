import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import Login from "./Login";

jest.mock("axios", () => ({
  __esModule: true,

  default: {
    get: () => ({
      data: { id: 1, name: "John" },
    }),
  },
}));

test("username input should be rendered", () => {
  render(<Login />);
  const usernameEl = screen.getByPlaceholderText(/username/i);
  expect(usernameEl.value).toBe("");
});

test("password input should be rendered", () => {
  render(<Login />);
  const usernameEl = screen.getByPlaceholderText(/password/i);
  expect(usernameEl.value).toBe("");
});

test("loading should not be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("submit button should be rendered", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  expect(buttonEl).toBeDisabled();
});

test("error message should not be displayed", () => {
  render(<Login />);
  const errorEl = screen.getByTestId("error");
  expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
  render(<Login />);
  const usernameEl = screen.getByPlaceholderText(/username/i);
  const testValue = "abc";
  fireEvent.change(usernameEl, { target: { value: testValue } });
  expect(usernameEl.value).toBe("abc");
});

test("password input should change", () => {
  render(<Login />);
  const passwordEl = screen.getByPlaceholderText(/password/i);
  const testValue = "abc";
  fireEvent.change(passwordEl, { target: { value: testValue } });
  expect(passwordEl.value).toBe("abc");
});

test("button should not be disable if inputs are not empty", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const passwordEl = screen.getByPlaceholderText(/password/i);
  const usernameEl = screen.getByPlaceholderText(/username/i);
  const testValue = "abc";
  fireEvent.change(passwordEl, { target: { value: testValue } });
  fireEvent.change(usernameEl, { target: { value: testValue } });
  expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when click", () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const passwordEl = screen.getByPlaceholderText(/password/i);
  const usernameEl = screen.getByPlaceholderText(/username/i);
  const testValue = "abc";
  fireEvent.change(passwordEl, { target: { value: testValue } });
  fireEvent.change(usernameEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);

  expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const passwordEl = screen.getByPlaceholderText(/password/i);
  const usernameEl = screen.getByPlaceholderText(/username/i);
  const testValue = "abc";
  fireEvent.change(passwordEl, { target: { value: testValue } });
  fireEvent.change(usernameEl, { target: { value: testValue } });
  fireEvent.click(buttonEl);
  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

// test("user should be rendered after fetching", async () => {
//   render(<Login />);
//   const buttonEl = screen.getByRole("button");
//   const usernameInputEl = screen.getByPlaceholderText(/username/i);
//   const passwordInputEl = screen.getByPlaceholderText(/password/i);

//   const testValue = "test";

//   fireEvent.change(usernameInputEl, { target: { value: testValue } });
//   fireEvent.change(passwordInputEl, { target: { value: testValue } });

//   fireEvent.click(buttonEl);

//   const userItem = await screen.findByText("John");

//   expect(userItem).toBeInTheDocument();
// });

test("user should be rendered after fetching", async () => {
  render(<Login />);
  const buttonEl = screen.getByRole("button");
  const usernameInputEl = screen.getByPlaceholderText(/username/i);
  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  const testValue = "test";

  act(() => {
    fireEvent.change(usernameInputEl, { target: { value: testValue } });
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
  });

  act(() => {
    fireEvent.click(buttonEl);
  });

  const userItem = await screen.findByText("John");

  expect(userItem).toBeInTheDocument();
});
