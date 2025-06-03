const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 6001;
const { errorMiddleware } = require("../../../packages/error-handler");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["Authorization", "Content-Type"],
}));

app.get("/", (req, res) => {
    res.send("Auth Service API");
});

app.use(errorMiddleware);


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/api`);
});

app.on("error", (err)=>{
    console.log("Server error:", err);
})