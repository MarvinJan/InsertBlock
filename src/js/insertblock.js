(function() {
  "use strict";
  const insertBlock = function(
    parent_selector,
    options = {
      position: null,
      repeat: null,
      animate: {},
      block_params: {}
    }
  ) {
    const position = options.position || "beforeEnd";
    const parent = document.querySelector(parent_selector);
    const animate = options.animate;
    const block = formBlock(options.block_params);

    if (block.querySelector("img")) {
      images_are_loaded(block).then(() =>
        parent.insertAdjacentElement(position, block)
      );
    } else {
      parent.insertAdjacentElement(position, block);
    }
    animation(block, animate.animation, animate.time);
  };
  function formBlock(block_params) {
    const tag = block_params.tag || "div";
    const classes = block_params.classes || null;
    const innerHTML = block_params.innerHTML || null;
    const children = block_params.children || null;
    const block = document.createElement(tag);

    if (innerHTML && typeof innerHTML === "string") {
      if (innerHTML) block.innerHTML = innerHTML;
    }
    if (classes) {
      if (Array.isArray(classes)) {
        block.classList.add(...classes);
      } else {
        console.log(
          "%c Error: block_params.classes must be an array",
          "color: #a00"
        );
      }
    }
    if (children && Array.isArray(children)) {
      children.forEach(child => {
        block.insertAdjacentElement(
          child.position || "beforeEnd",
          formBlock(child)
        );
      });
    } else if (children && !Array.isArray(children)) {
      console.log(
        "%c Error: block_params.children must be an array",
        "color: #b00; font-weight: bold"
      );
    }
    return block;
  }
  function animation(element, animation_name, animation_time) {
    const animation = animation_name || "fade-in";
    const time = animation_time || 200;
    const steps = 60 * (time / 1000);
    let initial_state = [];
    let final_state = [];
    let style_stringified = "";

    switch (animation) {
      case "fade-in":
        initial_state = [{ key: "opacity:", value: 0, concatination: ";" }];
        final_state = [{ key: "opacity:", value: 1, concatination: ";" }];
        break;
      case "slide-right":
        initial_state = [
          { key: "opacity:", value: 0, concatination: ";" },
          { key: "transform: translateX(", value: -50, concatination: "%);" }
        ];
        final_state = [
          { key: "opacity:", value: 1, concatination: ";" },
          { key: "transform: translateX(", value: 0, concatination: "%);" }
        ];
        break;
      case "slide-left":
        initial_state = [
          { key: "opacity:", value: 0, concatination: ";" },
          { key: "transform: translateX(", value: 50, concatination: "%);" }
        ];
        final_state = [
          { key: "opacity:", value: 1, concatination: ";" },
          { key: "transform: translateX(", value: 0, concatination: "%);" }
        ];
      case "slide-up":
        initial_state = [
          { key: "opacity:", value: 0, concatination: ";" },
          { key: "transform: translateY(", value: 50, concatination: "%);" }
        ];
        final_state = [
          { key: "opacity:", value: 1, concatination: ";" },
          { key: "transform: translateY(", value: 0, concatination: "%);" }
        ];
        break;
      case "slide-down":
        initial_state = [
          { key: "opacity:", value: 0, concatination: ";" },
          { key: "transform: translateY(", value: -50, concatination: "%);" }
        ];
        final_state = [
          { key: "opacity:", value: 1, concatination: ";" },
          { key: "transform: translateY(", value: 0, concatination: "%);" }
        ];
        break;
    }

    let current_state = initial_state.map(object => Object.assign({}, object));

    const animationInit = function() {
      style_stringified = "";
      current_state.forEach((style, index) => {
        style_stringified += `${style.key}${style.value}${style.concatination}`;
        style.value +=
          (final_state[index].value - initial_state[index].value) / steps;
      });

      element.setAttribute("style", style_stringified);
      if (current_state[0].value <= final_state[0].value) {
        requestAnimationFrame(animationInit);
      } else {
        style_stringified = "";
        final_state.forEach(style => {
          style_stringified += `${style.key}${style.value}${
            style.concatination
          }`;
        });
        element.setAttribute("style", style_stringified);
      }
    };
    return animationInit();
  }
  function images_are_loaded(parent) {
    return new Promise((resolve, reject) => {
      const images = parent.querySelectorAll("img");
      const loaded = [];
      images.forEach(image => {
        image.onload = () => {
          loaded.push(true);
          if (loaded.length === images.length) {
            return resolve("done");
          } else {
            return reject("reject");
          }
        };
      });
    });
  }

  window.insertBlock = insertBlock;
})();
