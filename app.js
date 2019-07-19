const express = require('express');
const app = express();
//const route = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoConnect = require('./utils/mongoDb').mongoConnect;
const getDb = require('./utils/mongoDb').getDb;
const router = express.Router();

const RestaurantRoutes = require('./routes/RestaurantRoutes');

app.use(cors());
app.options('*', cors());

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(RestaurantRoutes);

app.use(function(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
});

MongoConnect(() => {
    app.listen(5000, () => {
        console.log('server is running');
    })
}) 