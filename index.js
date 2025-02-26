const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made

return Recipe.create({
  title: "Albondigas",
  level: "Easy Peasy",
  ingredients: ["Pan", "Carne Picada", "Cebolla", "Ajo"],
  cuisine: "Española",
  dishType: ["main_course"],
  image: "https://www.google.com/search?q=albondigas&rlz=1C1CHZN_esES933ES933&sxsrf=ALiCzsZ1ICXZ08tYBPDXPDpz2TmTDVah-g:1665676751259&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjo18a4yd36AhV0S_EDHWq_DnQQ_AUoAXoECAIQAw&biw=1536&bih=714&dpr=1.25#imgrc=uLKRTSNo2h7RiM",
  duration: 40,
  creator: "Mi Abuela",
})
})

.then((response) => {
  console.log("se han añadido las", response.title)
  return Recipe.insertMany(data)
})
.then ((response) => {
  /*console.log("los titulos son: ", response)*/
  response.forEach((recipe) => {
    console.log("los titulos son: ", recipe.title)
  })
  return Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100})
})
.then ((response) => {
  console.log("Toma que toma!")
  return Recipe.deleteOne({title: "Carrot Cake"})
 
})

.then ((response) => {
  console.log("Oh..qué pena!")
  mongoose.disconnect()
  console.log("Me he apagado!")
})

.catch(error => {
  console.error('Error connecting to the database', error);
 })