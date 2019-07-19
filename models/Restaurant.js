const getDb = require('../utils/mongoDb').getDb;

const mongoDb = require('mongodb');

class Restaurant {
    constructor(name, description, address, average_cost, imgUrl, id) {
        this.name = name;
        this.description = description;
        this.address = address;
        this.average_cost = average_cost;
        this.imgUrl = imgUrl;
        this._id = id ? new mongoDb.ObjectId(id) : null
    }

    save() {
        const db = getDb();
        return db.collection('restaurants').insertOne(this)
            .then(result => {

            })
            .catch(err => {
                throw err;
            })
    }

    static getAllRestaurants() {
        const db = getDb();
        return db.collection('restaurants').find().toArray()
            .then(result => {
                return result;
            })
            .catch(err => {
                throw err;
            })
    }

    static getRestaurantById(id) {
        const db = getDb();
        return db.collection('restaurants').find({ _id: new mongoDb.ObjectId(id) }).next()
            .then(restaurant => {
                return restaurant
            })
            .catch(err => { throw err });
    }
}

module.exports = Restaurant;