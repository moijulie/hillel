
const createElement = (el, { props = {}, tagName, children = [] } = {}) => {

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

  if (tagName) {
    element.tagName = tagName;
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

const header = () => {

  return createElement("header", {
    children: ["<h1>User Archive</h1>"],
  });
};

const main = () => {

  return createElement("main", {
    children: [sectionOne(), sectionTwo(), sectionThree()],
  });
};

const sectionOne = () => {

  return createElement("section", {
    children: [
      createElement("ul", {
        children: [
          createElement("li", {
            children: [
              createElement("span", {
                children: [
                  createElement("a", {
                    props: {
                      href: "/",
                    },
                    children: [createElement(["Home"])],
                  }),
                ],
              }),
              createElement("span", {
                children: [
                  createElement("a", {
                    props: {
                      href: "/about",
                    },
                    children: [createElement([" About Page"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  })
};

const sectionTwo = () => {

  return createElement("section", {
    children: [
      createElement("div", {
        children: [
          createElement("span", {
            children: [createElement([USER_DATA.date()])],
          }),
        ],
      }),
    ],
  });
};

const sectionThree = () => {

  return createElement("section", {
    children: [
      createElement("div", {
        children: [
          createElement("ul", {
            children: [
              createElement("li", {
                children: [
                  createElement(["User: "]),
                  createElement("span", {
                    children: [
                      createElement([USER_DATA.firstName() + " "])
                    ]
                  }),
                  createElement("span", {
                    children: [
                      createElement([USER_DATA.lastName() + " - "])
                    ]
                  }),
                  createElement("span", {
                    children: [
                      createElement([USER_DATA.age() + " "])
                    ]
                  }),
                  createElement(["years old;"]),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
};

const root = document.getElementById("root");
root.append(header(), main());
