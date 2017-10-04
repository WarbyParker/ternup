const tu = require("./index.js");

describe("Ternup", () => {
  describe("`bool` is truthy", () => {
    it("should return `left` argument", () => {
      expect(tu(true)("foo", "bar")).toEqual("foo");
    });

    it("should return `left` argument", () => {
      expect(tu(true)("foo")).toEqual("foo");
    });

    it("should return empty string if no arguments", () => {
      expect(tu(true)()).toEqual("");
    });
  });

  describe("`bool` is falsy", () => {
    it("should return `right` argument", () => {
      expect(tu(false)("foo", "bar")).toEqual("bar");
    });

    it("should return empty string if no `right` argument", () => {
      expect(tu(false)("foo")).toEqual("");
    });

    it("should return empty string if no arguments", () => {
      expect(tu(false)()).toEqual("");
    });
  });

  describe("no `left`/`right` arguments", () => {
    it("should return callback if no arguments", () => {
      expect(typeof tu(true)).toBe("function");
    });
  });

  describe("two separate functions", () => {
    const getActive = tu(true);
    it("should return correctly when separated", () => {
      expect(getActive()).toBe("");
      expect(getActive("foo")).toBe("foo");
      expect(getActive("foo", "bar")).toBe("foo");
    });
  });

  describe("setting a different default ", () => {
    const getActive = tu(false, "baz");
    it("should return new default `baz` if expression undefined", () => {
      expect(getActive()).toBe("baz");
      expect(getActive("foo")).toBe("baz");
      expect(getActive("foo", "bar")).toBe("bar");
    });
  });
});
