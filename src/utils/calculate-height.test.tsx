import { calculateHeight } from "./calculate-height";

describe("calculateHeight", () => {
  it("should convert 4 dm to 1ft 4in", () => {
    expect(calculateHeight(4)).toBe("1ft 4in");
  });

  it("should convert 5 dm to 1ft 8in", () => {
    expect(calculateHeight(5)).toBe("1ft 8in");
  });

  it("should convert 10 dm to 3ft 3in", () => {
    expect(calculateHeight(10)).toBe("3ft 3in");
  });

  it("should convert 20 dm to 6ft 7in", () => {
    expect(calculateHeight(20)).toBe("6ft 7in");
  });

  it("should convert 50 dm to 16ft 5in", () => {
    expect(calculateHeight(50)).toBe("16ft 5in");
  });

  it("should convert 100 dm to 32ft 10in", () => {
    expect(calculateHeight(100)).toBe("32ft 10in");
  });

  it("should handle large numbers (1000 dm → 328ft 1in)", () => {
    expect(calculateHeight(1000)).toBe("328ft 1in");
  });

  it("should handle 0 dm correctly", () => {
    expect(calculateHeight(0)).toBe("0ft 0in");
  });

  it("should handle undefined input", () => {
    expect(calculateHeight(undefined)).toBe("0ft 0in");
  });

  it("should handle null input", () => {
    expect(calculateHeight(null)).toBe("0ft 0in");
  });
});
