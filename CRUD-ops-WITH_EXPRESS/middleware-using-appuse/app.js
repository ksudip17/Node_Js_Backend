import express from 'express';

const app = express();
const port = 8080;

// app.use((req, res, next) => {
//     req.on("data", (chunk) => {
//         const reqBody = JSON.parse((chunk.toString()));
//         console.log(reqBody);
//     })
//     next();
// })

app.use(express.json());

app.get("/", (req, res) => {
    res.end("Welcome to Our Server");
});

app.get("/login", (req, res) => {
    res.end("hello this is login page");
});

app.post("/login", (req, res) => {
    console.log(req.body);
    res.end("POST Login Page");
});


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:8080`);
})