import Login from "../pages/Login";
import { AuthProvider } from "../Context";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe("Login page test", () => {
  it("it displays the welcome back heading", () => {
    renderLogin();

    const welcome = screen.getByRole("heading", {
      name: /welcome back! login/i,
    });

    expect(welcome).toBeInTheDocument();
  });

  it("should have 2 inputs and a button", () => {
    renderLogin();

    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const passwordInput = screen.getByLabelText(/password/i);
    const btn = screen.getByRole("button", { name: /login/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
  });
});
