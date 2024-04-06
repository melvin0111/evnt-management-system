//I added this

//

require('dotenv').config();
const cors = require('cors');
const _ = require('lodash');
const express = require('express')
const app = express();
const knex = require('./db');
const routes = require('./routes');
const multer = require('multer');
const path = require('path')
// Define the path to your static files directory
const staticPath = path.join(__dirname, 'public'); // Replace with your actual path

// Mount the static middleware
app.use(express.static(staticPath));
//Basically translates host to host, backend to frontend
app.use(cors());

// Configure Multer storage destination and filename generation
const storage = multer.diskStorage({
    destination: 'public/', // Define upload directory
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});


const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    // Handle successful upload
    if (req.file) {
        console.log('File uploaded successfully:', req.file.filename);
        return res.json({ message: 'File uploaded successfully!' });
    } else {
        console.error('Upload failed!');
        return res.status(400).json({ message: 'Failed to upload file' });
    }
});
app.use(express.json());
app.use('/api', routes);
app.use(
    cors({ origin: '*', methods: '*', })
);



const port = process.env.PORT;

app.listen(port, () => {
    init();
    console.log(`Postgres ETL app listening on port ${port}`)
});

const init = async () => {
    await knex.migrate.latest();
    await initializeJobs();
}

const initializeJobs = async () => {

}