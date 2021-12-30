function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createElement = (el, { props = {}, className, children = [] } = {}) => {
  let element;

  switch (typeof el) {
    case "object":
      element = el;
      break;
    case "function":
      element = el();
      break;
    default:
      element = document.createElement(el);
      break;
  }

  if (className) {
    element.className = className;
  }

  for (const propKey of Object.getOwnPropertyNames(props)) {
    element.setAttribute(propKey, props[propKey]);
  }

  for (const child of children) {
    switch (typeof child) {
      case "string":
        element.insertAdjacentHTML("afterbegin", child);
        break;

      default:
        element.append(child);
        break;
    }
  }

  return element;
};

const mainSection = () => {
  return createElement("div", {
    className: "field",
    children: [
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
      createElement("div", {
        className: "field__item",
        props: {
          "data-type": `${getRandom(0, 1)}`,
        },
      }),
    ],
  });
};

const root = document.getElementById("root");
root.append(mainSection());

const fieldItem = document.querySelectorAll(".field__item");
const inform = document.getElementById("informer");
const field = root.querySelector(".field");
const button = document.querySelector(".restart");
const messageBang = document.querySelector(".message");
const messageWin = document.querySelector(".message--success");

let countBombs = 0;
let countOpened = 0;

const bombsQuantity = inform.firstElementChild;
const openedQuantity = inform.lastElementChild;

bombsQuantity.innerHTML = `Bombs: ${countBombs}`;
openedQuantity.innerHTML = `Disarmed: ${countOpened}`;
for (const elem of fieldItem) {
  if (elem.dataset.type === "1") {
    bombsQuantity.innerHTML = `Bombs: ${++countBombs}`;
  }
}

const handleClick = (event) => {
  if (event.target.dataset.type === "1") {
    event.target.dataset.type = 3;
    root.style.pointerEvents = "none";

    button.hidden = false;
    messageBang.classList.add("message--failed");
    messageBang.hidden = false;
    return;
  }

  if (event.target.dataset.type === "0") {
    event.target.dataset.type = 2;
    openedQuantity.innerHTML = `Disarmed: ${++countOpened}`;

    if (countOpened === 25 - countBombs) {
      root.hidden = true;
      button.hidden = false;
      messageWin.hidden = false;
    }
  }
};

const handleRestart = (event) => {
  if (event.target === button) {
    root.replaceChildren(mainSection());
    root.style.pointerEvents = "auto";
    messageBang.hidden = true;
    messageWin.hidden = true;
    button.hidden = true;
    root.hidden = false;
    countOpened = 0;
    countBombs = 0;
    openedQuantity.innerHTML = `Disarmed: ${countOpened}`;
    for (const elem of fieldItem) {
      if (elem.dataset.type === "1") {
        bombsQuantity.innerHTML = `Bombs: ${++countBombs}`;
      }
    }
  }
};

root.addEventListener("click", handleClick);
button.addEventListener("click", handleRestart);
