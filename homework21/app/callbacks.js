function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomizeError = () => {
  const random = getRandomIntInclusive(1, 100);
  if (random > 90) {
    return new Error("Bad Request");
  }

  return null;
};

const getUsers = (callback) => {
  const USERS = [
    { id: 1, name: "Bob" },
    { id: 2, name: "Andy" },
    { id: 3, name: "John" },
  ];

  setTimeout(() => {
    callback(randomizeError(), USERS);
  }, 2000);
};

const getProducts = (callback) => {
  const PRODUCTS = [
    { id: 1, name: "iPad" },
    { id: 2, name: "Google Pixel" },
    { id: 3, name: "War and Peace" },
    { id: 4, name: "iPad" },
    { id: 5, name: "Kaizen" },
    { id: 6, name: "Sherlock Holmes" },
  ];

  setTimeout(() => {
    callback(randomizeError(), PRODUCTS);
  }, 2000);
};

const getOrders = (callback) => {
  const ORDERS = [
    { id: 1, userId: 1, checkout: [1, 6] },
    { id: 2, userId: 1, checkout: [3] },
    { id: 3, userId: 2, checkout: [2, 4] },
  ];

  setTimeout(() => {
    callback(randomizeError(), ORDERS);
  }, 2000);
};

const getCheckoutsForUser = (userId, callback) => {
  getUsers((err, users) => {
    if (err) {
      callback(err);

      return;
    }
    const user = users.find((user) => user.id === userId);
    console.log(user);
    if (!user) {
      callback(new Error("User is not found"));

      return;
    }
    getOrders((err, orders) => {
      if (err) {
        callback(err);

        return;
      }
      const finalOrder = orders.filter((order) => order.userId === user.id);
      if (finalOrder.length === 0) {
        callback(new Error("User has not added any orders yet"));

        return;
      }

      getProducts((err, products) => {
        if (err) {
          callback(err);

          return;
        }

        const mappedOrder = finalOrder.map((order) => {
          order.checkout = order.checkout.map((productId) => {
            return products.find((product) => product.id === productId);
          });
          return order;
        });
        console.log(mappedOrder);

        callback(null, mappedOrder);
      });
    });
  });
};

getCheckoutsForUser(1, (err, value) => {
  err ? console.error(err) : console.log(value);
});
