import express from 'express';

const app = express();
const port = 8080;

app.get("/", (req, res) => {
    res.status(201).json({
        message:"Hellllooo!!"
    })
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
    
})