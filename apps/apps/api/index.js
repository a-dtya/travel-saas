// from frontend we'll be hitting this. instead of hitting the auth service directly
// we'll be hitting this and then this will forward the request to the auth service
// this is called reverse proxy

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const cors = require("cors");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui");
const axios = require("axios");

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ["Authorization", "Content-Type"],
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes {travelsaas}",
    standardHeaders: true,
    legacyHeaders: true,
    keyGenerator: (req)=> req.ip,
}));

app.use(morgan("dev"));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("trust proxy", true);


app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:6001",
    changeOrigin: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
