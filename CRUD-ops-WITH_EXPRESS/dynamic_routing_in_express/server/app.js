import express from 'express';
import { createWriteStream } from 'fs';
import { readdir, rm, rename } from "fs/promises"

const app = express();
const port = 8080;

app.use(express.json());

app.use((req, res, next) => {
    res.set({
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods" : "*",
        "Access-Control-Allow-Headers" : "*",
    })
    next();
})

app.post("/:filename", (req, res) => {
    const writeStream = createWriteStream(`./storage/${req.params.filename}`);
    req.pipe(writeStream);
    req.on('end', () => {
        res.json({
            message:"File uploaded Sucessfully"
        })
    })
})

app.get("/:filename" , (req, res) => {
    const { filename } = req.params;

    if(req.query.action === "download") {
        res.set("Content-Disposition", "attachment")
    }

    res.sendFile(`${import.meta.dirname}/storage/${filename}`);
})

app.delete("/:filename", async(req, res) => {
    const { filename } = req.params;
    const filePath = (`./storage/${filename}`);
    try {
        await rm(filePath);
    res.json({
        message:"File deleted Sucessfully"
    })
    } catch(err) {
        res.status(404).json({
            message:"File not Found"
        })
    }
})

app.patch("/:filename", async(req, res) => {
    const { filename } = req.params;
    try {
        await rename (
           `./storage/${filename}`,
            `./storage/${req.body.newFilename}`
        );
        res.json({
            message: "File Renamed Sucessfullly"
        })
    } catch(err) {
        res.status(404).json({
            message: "File not Found"
        })
    }
})

app.get("/", async(req, res) => {
    const filesList = await readdir('./storage');
    res.json(filesList);
})

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})