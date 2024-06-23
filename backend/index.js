import express from "express";
import Jwt from "jsonwebtoken";
import cors from "cors";
import "./db/const.js";
import User from "./db/user.js";
const app = express();
import Product from "./db/product.js";
app.use(express.json());
app.use(cors());
const jwtkey = "pan123";

app.post("/singup", async (req, resp) => {
  const user = new User(req.body);
  let result = await user.save();

  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtkey, { expiresIn: "2h" }, (err, token) => {
    if (err) {
      resp.send("Something went wrong");
    }
    resp.send({ result, auth: token });
  });
});

app.post("/login", async (req, resp) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          resp.send("Something went wrong");
        }
        resp.send({ user, auth: token });
      });
    } else {
      resp.send({ result: "No User found" });
    }
  }
});

app.post("/add-product", async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send(result);
});

app.get("/products", async (req, resp) => {
  const products = await Product.find();
  if (products.length > 0) {
    resp.send(products);
  } else {
    resp.send({ result: "No Product found" });
  }
});

app.delete("/product/:id", async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get("/product/:id", async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  // console.log(result);
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "Result Not Found" });
    // console.log("Result Not Found");
  }
});

app.put("/product/:id", async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  resp.send(result);
  console.log(result);
});

app.get("/search/:key", async (req, resp) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key },
      },
      {
        company: { $regex: req.params.key },
      },
      {
        category: { $regex: req.params.key },
      },
    ],
  });
  resp.send(result);
});

function verefytoken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    Jwt.verify(token, jwtkey, (err, valid) => {
      if (err) {
        resp.send({ result: "Please provide valid token " });
      } else {
        next();
      }
    });
  } else {
    resp.send({ result: "Please add token with header" });
  }
}

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Backend Start on Port ", PORT);
});

{
  /*import { mongoose } from "mongoose";
const connectDB = async () => {
  const dataInstance = mongoose.connect("mongodb://localhost:27017/todo");
  const productschema = new mongoose.Schema({});
  const todos = mongoose.model("todos", productschema);
  const data = await todos.find();
  console.log("Mongodb data is ", data);
};
connectDB();*/
}
