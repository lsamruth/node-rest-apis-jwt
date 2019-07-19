const Restaurant = require("../models/Restaurant");

exports.getRestaurants = (req, res, next) => {
    return Restaurant.getAllRestaurants()
        .then(result => {
            return res.send(result)
        })
        .catch(err => { throw err })
}

exports.getRestaurantById = (req, res, next) => {
    const { id } = req.params;
    return Restaurant.getRestaurantById(id)
        .then(result => {
            let resp = {
                count: 1,
                profile: result
            }
            return res.send(resp);
        })
        .catch(err => { throw err })
}

exports.
    createRestaurant = (req, res, next) => {
        const { name, description, address, average_cost, imgUrl } = req.body;
        const restaurant = new Restaurant(name, description, address, average_cost, imgUrl);
        restaurant.save()
            .then(result => {
                return res.send({ success: true, message: 'Successfully created the Restaurant' })
            })
            .catch(err => { throw err })

    }