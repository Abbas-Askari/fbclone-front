const url =
  "https://board-em-api.onrender.com/api/messages/64e9c5b32e459c426e1ac3f9";

fetch(url, {
  method: "POST",
  body: { content: "abc", title: "from node" },
}).then(console.log);
