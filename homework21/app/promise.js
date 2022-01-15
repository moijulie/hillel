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

const err = randomizeError();

const getUsers = () => {
  const USERS = [
    { id: 1, name: "Bob" },
    { id: 2, name: "Andy" },
    { id: 3, name: "John" },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      }
      resolve(USERS);
    }, 2000);
  });
};

const getProducts = () => {
  const PRODUCTS = [
    { id: 1, name: "iPad" },
    { id: 2, name: "Google Pixel" },
    { id: 3, name: "War and Peace" },
    { id: 4, name: "iPad" },
    { id: 5, name: "Kaizen" },
    { id: 6, name: "Sherlock Holmes" },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      }
      resolve(PRODUCTS);
    }, 2000);
  });
};

const getOrders = () => {
  const ORDERS = [
    { id: 1, userId: 1, checkout: [1, 6] },
    { id: 2, userId: 1, checkout: [3] },
    { id: 3, userId: 2, checkout: [2, 4] },
  ];

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (err) {
        reject(err);
      }
      resolve(ORDERS);
    }, 2000);
  });
};

const getCheckoutsForUserAsPromise = (userId) => {
  getUsers()
    .then((users) => {
      const user = users.find((user) => user.id === userId);
      if (!user) {
        throw new Error("User is not found");
      }

      return user;
    })
    .then((user) =>
      getOrders()
        .then((orders) => {
          const finalOrder = orders.filter((order) => order.userId === user.id);
          if (finalOrder.length === 0) {
            throw new Error("User has not added any orders yet");
          }

          return finalOrder;
        })
        .then((finalOrder) => {
          return getProducts().then((items) => {
            const mappedOrder = finalOrder.map((order) => {
              order.checkout = order.checkout.map((productId) => {
                return getProduct.find((product) => product.id === productId);
              });
              return order;
            });

            return mappedOrder;
          });
        })
    )
    .then(console.log)
    .catch(console.error);
};
getCheckoutsForUserAsPromise(1);
