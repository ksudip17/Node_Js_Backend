import express from 'express';

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.end("Welcome to Our Server");
});

app.get("/login", (req, res) => {
    res.end("hello this is login page");
});

app.post("/", (req, res) => {
    res.end("Welcome to POST Home Route");
});

app.patch("/", (req, res) => {
    res.end("Welcome to Patch Route");
});

app.put("/", (req, res) => {
    res.end("Welcome to Put Route");
});

app.delete("/", (req, res) => {
    res.end("Welcome to Delete Route");
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:8080`);
})