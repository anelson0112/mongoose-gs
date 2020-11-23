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

    
//schema
    const recipeSchema = new mongoose.Schema({
        name : {type: String, required: true, maxlength: 35},
        description : {type: String, required: true, maxlength: 50},
        instructions : {type: String, required: true, maxlength: 500},
        ingredients: [{
            ingredientName: String,
            measurement: String,
            amount: Number,
        }],
        
    });

    //method
    recipeSchema.methods.test = function(){
    let name;

    if (this.name) {
        name = "Hi I am recipe " + this.name;
    } else {
        name = "I don't exist";
    }
    console.log(name);
    }
    //model
    const Recipe = mongoose.model('Recipe', recipeSchema);

    //documents
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

    //save 
    pbCookies.save(function(err, recipe){
        if (err) return console.error(err);
        recipe.test();
    });

    pbCerealBites.save(function(err, recipe){
        if (err) return console.error(err);
        recipe.test();
    });

    Recipe.find(function(err,recipe){
        if (err) return console.error(err);
        console.log(recipe);
    })

    console.log(pbCerealBites);
    console.log(pbCookies);

});

