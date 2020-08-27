const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    const newRecipe = {title: 'Lasagna', cuisine:'Italian', level:'Easy Peasy', ingredients:'sauce and vegetables'}
    Recipe.create(newRecipe)
    .then(recipe => {
      console.log(recipe.title)
    })
    .catch(error => {
      console.error('Checking for errors', error)
    })
    Recipe.insertMany(data)
    .then(recipes => {
      Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100})
    .then(()=> {
      console.log('Well done, update has been performed')
    })
    .catch(error => {
      console.error('Checking for errors', error)
    })
    Recipe.deleteOne({title: 'Carrot Cake'})
    .then((recipe) => {
      console.log(recipe)
    })
      console.log(recipes)
      recipes.forEach(recipe => {
        console.log(recipe.title)
      })
    })
    .catch(error => {
      console.error('Checking for errors', error)
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
