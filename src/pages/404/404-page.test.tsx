import { renderWithProviders } from "@/test/utils";
import { NotFoundPage } from "./404-page";
import { screen } from "@testing-library/react";
import { useLocation } from "react-router";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router", () => ({
  useParams: jest.fn(() => ({ id: "pikachu" })),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("NotFoundPage", () => {
  const Wrapper = () => {
    return <NotFoundPage />;
  };

  it("should render correctly", () => {
    (useLocation as jest.Mock).mockReturnValue({
      pathname: "/some",
      search: "",
      hash: "",
      state: null,
      key: "default",
    });

    renderWithProviders(<Wrapper />);
    expect(screen.getByText("NotFoundPage.message")).toBeInTheDocument();
  });

  it('should render "Get back" button', () => {
    renderWithProviders(<Wrapper />);
    expect(screen.getByText("NavLayout.getBack")).toBeInTheDocument();
  });

  it("should return to main page if back button is clicked", () => {
    renderWithProviders(<Wrapper />);
    const button = screen.getByText("NavLayout.getBack");
    button.click();
    expect(window.location.pathname).toBe("/");
  });
});
