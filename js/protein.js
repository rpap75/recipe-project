'user strict';

// GLOBAL VARIABLE

let meatArray = [];


for (let i = 0; i < recipeArray.length; i++) {
  if (recipeArray[i].isMeat) {
    meatArray.push(recipeArray[i]);
    console.log('this is vegan' + meatArray);
  }
}
if (recipeIng) {
  renderList(meatArray);

  recipeIng.addEventListener('click', handleRecipeClick);
}

console.log(meatArray);
