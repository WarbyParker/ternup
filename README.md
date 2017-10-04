# 🔴 Ternup
## Functional ternaries

Ternaries can get pretty messy, especially when trying to combine them with template literals in CSS-in-JS. `Ternup` allows you to skip the false case in favor of automatically returning an empty string.

This is extreme bike-shedding and may create more noise than it removes. Ternup's main objective is to remove the floating `?` and `:` that may get lost in the template literal noise.

## API

`tu(condition, fallback)(expr1, expr2) -> expr1 || expr2 || fallback`

---
### First function

**condition** ( *required* )

An expression that evaluates to true or false.

**fallback** ( *optional* )

Optional expression for `expr1` / `expr2` to fallback to.

Defaults to an empty string (`""`).

### Second function

**expr1** ( *optional* )

An expression that returns when `condition` is truthy.

**expr2** ( *optional* )

An expression that returns when `condition` is falsy.


## Examples

### Styled Components
```js
const styled = require("styled-components");
const tu = require("ternup");

// Simple example with no false argument.
const oneLine = styled.div`
  font-size: 30px;
  ${({size}) => size > 2 ? `width: ${24}px;` : ""}
`
const oneLineWithTernup = styled.div`
  font-size: 30px;
  ${({size}) => tu(size > 2)(`width: ${24}px;`)}
`
```

## Complex Styled Components example
```js
const styled = require("styled-components");
const tu = require("ternup");

const multiLine = styled.div`
  ${({ isActive, color, size }) =>
    isActive
      ? `
          color: ${color ? `${color}` : "blue"};
          ${size ? `font-size: ${size}px` : ""};
        `
      : `
          display: none;
        `};
`;

const multiLineWithTernup = styled.div`
  ${({ isActive, color, size }) =>
    tu(isActive)(
      `
        width: ${tu(isActive)(`${color}`, "blue")};
        ${tu(size)(`font-size: ${size}px`)};
      `,
      `
        display: none;
      `
    )};
`;
```

## Reusable function
```js
const tu = require("ternup");

const sayHello = (name) => {
  const isGil = tu(name === "Gil Faison");
  return `
    ${isGil("Oh, hello", "Hi")} ${name},
    ${isGil("Charmed I'm sure.", "Welcome to FooBarBaz!")}
  `
}

sayHello("Gil Faison") //->  "\n   Oh, hello Gil Faison\n,    Charmed I'm sure\n"
sayHello("Dave Garwacke") //->  "\n   Hi Dave Garwacke\n,    Welcome to FooBarBaz!\n"
```
