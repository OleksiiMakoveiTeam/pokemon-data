import { calculateWeight } from "./calculate-weight";

describe("calculateWeight", () => {
  it("should convert weight in hectograms to pounds correctly", () => {
    expect(calculateWeight(100)).toBe(22.0); // 100 hg = 22.0 lbs
    expect(calculateWeight(50)).toBe(11.0); // 50 hg = 11.0 lbs
    expect(calculateWeight(0)).toBe(0.0); // 0 hg = 0.0 lbs
    expect(calculateWeight(1234)).toBe(272.1); // 1234 hg = 272.1 lbs
    expect(calculateWeight(1)).toBe(0.2); // 1 hg = 0.2 lbs
  });

  it("should handle negative weight values", () => {
    expect(calculateWeight(-100)).toBe(-22.0); // -100 hg = -22.0 lbs
    expect(calculateWeight(-50)).toBe(-11.0); // -50 hg = -11.0 lbs
  });

  it("should handle decimal weight values", () => {
    expect(calculateWeight(123.45)).toBe(27.2); // 123.45 hg = 27.2 lbs
    expect(calculateWeight(0.1)).toBe(0.0); // 0.1 hg = 0.0 lbs (rounded)
  });

  it("should handle undefined input", () => {
    expect(calculateWeight(undefined)).toBe(0.0); // undefined = 0.0 lbs
  });

  it("should handle null input", () => {
    expect(calculateWeight(null)).toBe(0.0); // null = 0.0 lbs
  });

  it("should handle very small weight values", () => {
    expect(calculateWeight(0.001)).toBe(0.0); // 0.001 hg = 0.0 lbs (rounded)
    expect(calculateWeight(0.009)).toBe(0.0); // 0.009 hg = 0.0 lbs (rounded)
  });

  it("should handle very large weight values", () => {
    expect(calculateWeight(100000)).toBe(22046.2); // 100000 hg = 22046.2 lbs
  });
});
