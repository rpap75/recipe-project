'user strict';

// GLOBAL VARIABLE

let veganArray = [];


for (let i = 0; i < recipeArray.length; i++) {
  if (recipeArray[i].isVegan) {
    veganArray.push(recipeArray[i]);
    console.log('this is vegan' + veganArray);
  }
}
if (recipeIng) {
  renderList(veganArray);

  recipeIng.addEventListener('click', handleRecipeClick);
}

console.log(veganArray);

// function renderList() {
//   for (let i = 0; i < recipeArray.length; i++) {
//     let liElem = document.createElement('li');
//     liElem.id = i;
//     liElem.textContent = recipeArray[i].name;
//     recipeIng.appendChild(liElem);
//     if (parsedRecipe) {
//       for (let j = 0; j < parsedRecipe.length; j++) {
//         if (parsedRecipe[j].name === recipeArray[i].name && parsedRecipe[j].isClicked) {
//           recipeArray[i].isVegan = true;
//         }
//       }
//     }
//   }
// }
// renderList();
