const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// schema = pattern that all documents in a collection will follow.


const pizzaSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }, 
    price: {
        type: Number,
        required: true,
    },
    isVeggie: {
        type: Boolean,
        default: false
    },
    ingredients: [String],
    dough: {
        type: String,
        enum: ["thin", "thick", "with cheese", "with garlic"]
    }
});

const Pizza = mongoose.model('Pizza', pizzaSchema);


mongoose
    .connect('mongodb://localhost/ironic-pizzas-db')
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

        const detailsOne = {
            title: "pizza margaritta", 
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
            { title: "pizza carbonara",  price: 10 },
            { title: "pizza funghi",  price: 12 }
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


