//declare a constant variable called mongoose
//set it equal to require the value of mongoose
//require is built in function for node.js that can translate it from other files
const mongoose = require('mongoose'); 

//access the conect methor if the mongoose object
//pass it the local host database
//and some options inside of another object
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});



//const var db
//set it equal to connection prop of the mongoose object
const db = mongoose.connection;

//but then we access the on and once methods of our connection property form our mongoose object 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){

    
//schemas one for ingredients and one for the recipe form

const ingredientSchema = new mongoose.Schema({
    //ingredient object array
    ingredients: [{
          ingredientName: String,
          measurement: String,
          amount: Number,
    }]
  });
  //recipe then add ingredient schema
    const recipeSchema = new mongoose.Schema({
        name : {type: String, required: true, maxlength: 35},
        description : {type: String, required: true, maxlength: 50},
        instructions : {type: String, required: true, maxlength: 500},
        ingredients : [ingredientSchema],
        /*ingredients: [{
            ingredientName: String,
            measurement: String,
            amount: Number,
        }],*/
        
        
    });

    //method, just to do some checking. Will print comment to see if it's working
    recipeSchema.methods.test = function(){
    let name;

    if (this.name) {
        name = "Hi I am recipe " + this.name;
    } else {
        name = "I don't exist";
    }
    console.log(name);
    }
    //model creation
    const Recipe = mongoose.model('Recipe', recipeSchema);

    //documents- the actual recipes
    const pbCookies = new Recipe ({
        name: "Peanut Butter Cookies",
        description: "Easy peasey, gooey cookies",
        instructions: "Mix all ingredients in a bowl, scoop out equal sized scoops of dough, roll into balls and place on baking sheet, bake for 10 mins at 350 degrees",
        ingredients: [{
            ingredientName: "peanut butter",
            measurement: "cups",
            amount: 1.5,
        },
        
        {
            ingredientName: "sugar",
            measurement: "cup",
            amount: .5,
        },
        
        {
            ingredientName: "egg",
            measurement: "whole",
            amount: 1,
        }],

    });
        //console.log(pbCookies);
    const pbCerealBites = new Recipe ({
        name: "Peanut Butter Cereal Bites",
        description: "Quick and easy treat when you need a sweet fix",
        instructions: "Put peanut butter and honey into a microwave safe bowl, heat for 1 minute on high and stir until combined, add cereal and stir, scoop into bite sized balls and place on wax paper to cool. Enjoy!",
        ingredients: [{
            ingredientName: "peanut butter",
            measurement: "cup",
            amount: 1,
        },
        {
            ingredientName: "honey",
            measurement: "cup",
            amount: 1,
        },
        {
            ingredientName: "Cereal",
            measurement: "cups",
            amount: 4,
        }],

    });

    //save the recipes into the DB
    pbCookies.save(function(err, recipe){
        //return error code if not saved
        if (err) return console.error(err);
        recipe.test();
    });

    pbCerealBites.save(function(err, recipe){
        if (err) return console.error(err);
        recipe.test();
    });
    //find all the recipes and print, error if not found
    
    /*pbCerealBites.test();
    pbCookies.test();
    console.log(pbCerealBites);
    console.log(pbCookies);*/
//using the create method to make a new recipe
    Recipe.create(
        {name:"Peanut Butter Balls",
        description: "Quick energy bites for those on the move",
        instructions: "mix all ingredients in a bowl, scoop into 1 inch balls, refrigerate until set",
        ingredients: [{
            ingredientName : "peanut butter",
            measurement: "cups",
            amount: 2,
        },
        {
            ingredientName: "oats",
            measurement : "cups",
            amount: 2,
        },
        {
            ingredientName: "flax",
            measurement: "TBSP",
            amount: 2,
        }],
    
    
    }, 
    
    function(err,) {
        if (err) return console.error(err);
        console.log();
    });
//finding the recipes with ingredients
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe[0].ingredients[0]);
    });
//calling the test method to print
    pbCookies.test();
//update name in pcCookie recipe    
    pbCookies.name = "3 Ingredient Peanut Butter Cookies";
    
    
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe);
    });
//delete balls recipe
    Recipe.deleteOne({ name: "Peanut Butter Balls"}, function(err){
        if (err) console.error(err);
        console.log("Deleted");
    });
    
    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe);
    });
    //update function 
     /*Recipe.updateOne({pbCerealBites}, { amount: -.5},function(err){
         if (err) return console.error(err);
         console.log(Recipe[1]);
         //pbCerealBites.ingredients;


     });*/

});



