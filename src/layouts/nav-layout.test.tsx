import { NavLayout } from "./nav-layout";
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router", () => ({
  useParams: jest.fn(() => ({ id: "pikachu" })),
  useNavigate: jest.fn(),
}));

describe("NavLayout", () => {
  const Wrapper = () => {
    return (
      <NavLayout>
        <div>Test</div>
      </NavLayout>
    );
  };
  it("should render children correctly", () => {
    render(<Wrapper />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should render header", () => {
    render(<Wrapper />);

    expect(screen.getByText("NavLayout.pokemon")).toBeInTheDocument();
  });

  it("should render back button", () => {
    render(<Wrapper />);
    expect(screen.getByText("NavLayout.getBack")).toBeInTheDocument();
  });

  it("should return to main page if back button is clicked", () => {
    (useParams as jest.Mock).mockReturnValue({ id: "pikachu" });
    render(<Wrapper />);
    const button = screen.getByText("NavLayout.getBack");
    button.click();
    expect(window.location.pathname).toBe("/");
  });
});
