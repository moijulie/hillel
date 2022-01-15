const url = new URL("https://jsonplaceholder.typicode.com/users/1/todos");
const btn = document.getElementById("btn");
const ul = document.getElementById("ul");
const input = document.getElementById("input");

const sendRequest = (method, url, body) => {
  const headers = new Headers({
    "Content-type": "application/json; charset=UTF-8",
  });
  return fetch(url, {
    method,
    body: body ? JSON.stringify(body) : body,
    headers,
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    let data;
    if (response.headers.get("content-type").includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    return data;
  });
};

const getData = async () => {
  try {
    const data = await sendRequest("GET", url);
    for (const item of data) {
      if (item.id < 10) {
        changeToDo(item);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const changeToDo = (data) => {
  const li = document.createElement("li");
  li.innerHTML = data.title;
  ul.append(li);
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = "❌";
  deleteBtn.addEventListener("click", deleteItem);
  li.append(deleteBtn);
};

const deleteItem = async (event) => {
  try {
    const id = "some";
    const url = new URL(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await sendRequest("DELETE", url);
    const removeItem = event.target;
    removeItem.parentElement.remove();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

const post = async () => {
  try {
    const data = await sendRequest("POST", url, {
      fakeId: new Date().valueOf(),
      title: input.value,
      completed: false,
    });
    changeToDo(data);

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
getData();

btn.addEventListener("click", post);
