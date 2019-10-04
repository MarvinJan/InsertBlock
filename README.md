# Insert Block

## Dynamic DOM generation

Usage

```javascript
const options = {
  block_parameters: {
    tag: "div", // tagname
    classes: ["example"], // array of classnames for generated element
    children: [] // array of children, that are formed the same way with objects that have tag, classes and children properties
  }
};
new InsertBlock(_SelectorForParent_, options);
```
A simple demo page, which has a dynamically generated comment blocks can be seen [here](https://marvinjan.github.io/insertBlock/).