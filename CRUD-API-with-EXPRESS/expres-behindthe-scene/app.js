import express from "express";
const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.send("Namastey Sabai ma!!");
});

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})

app.get("/test", (req, res) => {
    res.send("Yo chai test Route ho hai");
});

console.log(app);

