const express = require('express');
const router = express.Router();
const RestaurantController = require("../controllers/RestaurantController");
const Middleware = require('../middleware/middleware');

router.post('/login', Middleware.login);
router.get('/get-restaurants', Middleware.checkToken, RestaurantController.getRestaurants);
router.post('/create-restaurant', Middleware.checkToken, RestaurantController.createRestaurant);
router.get('/get-restaurant/:id', Middleware.checkToken, RestaurantController.getRestaurantById);

module.exports = router;