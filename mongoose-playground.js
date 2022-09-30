const mongoose = require('mongoose');
const Pizza = require("./models/Pizza.model");


mongoose
    .connect('mongodb://localhost/ironic-pizzas-db')
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

        const detailsOne = {
            title: "margherita", 
            price: 8,
            isVeggie: true,
            dough: "thin"
        };


        return Pizza.create(detailsOne)
    })
    .then( pizzaFromDB => {
        console.log("one pizza was created")
        // console.log(pizzaFromDB);


        const arrayOfPizzas = [
            { title: "carbonara",  price: 10 },
            { title: "funghi",  price: 12 }
        ]

        return Pizza.insertMany(arrayOfPizzas);
    })
    .then( pizzasCreatedInDB => {
        console.log("dani, your two pizzas were created")
        // console.log(pizzasCreatedInDB)

        return Pizza.find();
    })
    .then( pizzasArr => {
        // console.log(pizzasArr)
        // pizzasArr.forEach( pizza => console.log(pizza.title))

        // Model.updateMany(filter, update [, options])
        return Pizza.findOneAndUpdate( {isVeggie: true}, {price: 9.5},  { returnDocument: 'after' });
    })
    .then ( responseFromDB => {
        console.log(responseFromDB)
    })
    .catch(err => console.error('Error interacting with our DB', err));


