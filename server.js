const express = require('express');
const fileUpload = require('express-fileupload');

const app = express();

app.use(fileUpload());

// Upload Endpoint for fileupload
app.post('/upload', (req, res) => {
    // Check if the file is null
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }

    const file = req.files.file;
    file.mv(`https://fileuploadlio.now.sh/uploads/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });
});

app.get("/server", (req, res) => {
    res.send("Server is Running");
});


app.listen(5000, () => console.log(`Server Started at PORT 5000`));