const sendUrl = "https://jsonplaceholder.typicode.com/posts";
const getUrl = "./db.json";

const sendData = (url, data) => {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((resp) => resp.json());
};

const getData = (url) => {
  return fetch(url).then((resp) => resp.json());
};

getData(getUrl)
  .then((data) =>
    sendData(sendUrl, data)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
  )
  .catch((error) => console.log(error));
