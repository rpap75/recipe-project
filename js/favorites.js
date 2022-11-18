// // let recipeArray = [];

// // function Recipe(name, ingredients, img, prepTime, cookTime, description) {

// //   this.name = name;
// //   this.ingredients = ingredients;
// //   this.img = img;
// //   this.description = description;
// //   this.prepTime = prepTime;
// //   this.cookTime = cookTime;
// //   this.isClicked = false;

// //   recipeArray.push(this);


// // }


// // let stringifiedRecipe = JSON.stringify(recipeArray);

// // localStorage.setItem('favRecipies', stringifiedRecipe);

// let retrieveRecipe = localStorage.getItem('favRecipies');

// let parsedRecipe = JSON.parse(retrieveRecipe);



// // console.log(parsedRecipe);

// function renderList() {
//   console.log(parsedRecipe);
//   let copyElem = document.getElementById('copy1');

//   copyElem.textContent = parsedRecipe[0].description;

//   // for (let i = 0; i < parsedRecipe.length; i++) {
//   //   let liElem = document.createElement('li');
//   //   liElem.id = i;
//   //   liElem.textContent = parsedRecipe[i].name;
//   // }
// }

let favArray = [];


let retrieveRecipe = localStorage.getItem('favRecipies');
let parsedRecipe = JSON.parse(retrieveRecipe);
for (let i = 0; i < parsedRecipe.length; i++) {
  if (parsedRecipe[i].isClicked) {
    favArray.push(parsedRecipe[i]);
  }
}

if (recipeIng) {
  renderList(favArray);

  recipeIng.addEventListener('click', handleRecipeClick);
}
