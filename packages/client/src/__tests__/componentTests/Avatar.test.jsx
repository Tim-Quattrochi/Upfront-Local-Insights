import { Avatar } from "../../components/Avatar";
import { mockUser } from "../__mocks__/authMocks";
import { describe, it, expect } from "vitest";
import { useAuthState } from "../../Context";
import { render } from "@testing-library/react";
import { useAuthDispatch } from "../../Context";

vi.mock("useAuthState", () => ({
  useAuthState: () => mockUser({ name: "" }),
}));

vi.mock("useAuthState", () => ({
  useAuthState: () => mockUser({ name: false }),
}));

describe("Avatar component test suite", () => {
  it("should display the first letter of the name.", () => {
    const { getByText } = render(<Avatar name={mockUser.name[0]} />);
    expect(getByText("M")).toBeInTheDocument();
  });

  it("should display 'Guest if there is no user name", () => {
    const { getByText } = render(<Avatar name={"Guest"} />);
    expect(getByText("GUEST")).toBeInTheDocument();
  });
});
