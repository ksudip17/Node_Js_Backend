import express from 'express';

const app = express();
const port = 8080;

app.use(express.json());

app.use("/admin", (req, res, next) => {
    if(req.body.password === "cheater") {
        next();
    } else {
        res.end("Wrong Password");
    }
});

app.get("/admin", (req, res) => {
    res.send(`Dear ${req.body.name} your password is Correct`);
});


app.listen(port, () => {
    console.log(`Server is listening on http://localhost:8080`);
})