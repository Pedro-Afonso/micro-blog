import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom";
import { Navbar } from ".";

describe("Navbar test", () => {
  it("should show logo", () => {
    const { getByRole } = render(<Navbar />);
    const logo = getByRole("heading", { level: 1 });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent("MicroBlog");
  });
});
