import { app } from "./app";

app
  .listen({
    host: "0.0.0.0",
    port: 3000,
  })
  .then(() => {
    console.log("http server run in http://localhost:3000");
  });
