const express = require("express");

const morgan = require("morgan");
const cors = require("cors");
const bodyParse = require("body-parser");

const {readdirSync} = require("fs");
const productRouters = require("./Routes/product");
const authgRouters = require("./Routes/auth");

const connetDB = require("./Config/db");

const app = express();

connetDB();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParse.json({limit: "10mb"}));

const port = 8000;

app.get("/", (req, res) =>
  res.send("Hello World!")
);
app.use("/api", productRouters);
app.use("/api", authgRouters);

//Loop Endpoint
readdirSync("./Routes").map((r) => {
  app.use("./api", require("./Routes/" + r));
});

app.listen(port, () =>
  console.log(
    `Example app listening on port ${port}!`
  )
);
