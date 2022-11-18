'use strict';
// Global Varible
let recipeArray = [];

let selectedRecipe;

let notesArray = [];

//used for local storge notes
let notesObject = {};

//used for localStorage and for creating recipe title.
let heading = document.createElement('h2');

// DOM REFERENCES

let commentBox = document.createElement('input');

let notesContainer = document.getElementById('formContainer');

let recipeContainer = document.getElementById('recipeContainer');

let selectorRecipe = document.getElementById('selectorRecipe');

// let recipeName = document.getElementById('recipeName');

let recipeIng = document.getElementById('recipeIng');

let submit = document.createElement('button');

const likeButton = document.getElementById('like-button');

function Recipe(name, ingredients, img, prepTime, cookTime, description, isAmerican, isMexican, isThai, isVegan = false) {
  this.name = name;
  this.ingredients = ingredients;
  this.notes = [];
  this.img = img;
  this.description = description;
  this.prepTime = prepTime;
  this.cookTime = cookTime;
  this.isClicked = false;
  this.isAmerican = isAmerican;
  this.isMexican = isMexican;
  this.isThai = isThai;
  this.isVegan = isVegan;
  recipeArray.push(this);
}

if (likeButton) {
  likeButton.addEventListener('click', () => {

    likeButton.classList.toggle('liked');

    selectedRecipe.isClicked = !selectedRecipe.isClicked;

    let stringifiedRecipe = JSON.stringify(recipeArray);

    localStorage.setItem('favRecipies', stringifiedRecipe);
  });
}

// let clickRecipe;
// EVENT HANDLER
function handleRecipeClick(event) {

  let index = event.target.id;
  console.log(index);

  selectedRecipe = recipeArray[index];

  if (recipeArray[index].isClicked) {
    likeButton.classList.toggle('liked');
  }
  else {
    likeButton.classList.remove('liked');
  }

  while (selectorRecipe.firstChild) {
    selectorRecipe.removeChild(selectorRecipe.firstChild);
  }

  //todo keep this
  notesContainer.innerHTML = '';
  document.getElementById('commentList').innerHTML = '';
  //making heading a global variable. so we can access localStorage.

  heading.textContent = selectedRecipe.name;
  selectorRecipe.appendChild(heading);
  //todo keep this

  // let heading = document.createElement('h2');
  // heading.textContent = selectedRecipe.name;
  // selectorRecipe.appendChild(heading);

  let ingredientHeading = document.createElement('ingredientHeading');
  ingredientHeading.innerHTML = 'Ingredients';
  heading.appendChild(ingredientHeading);

  // let ingredientHeading = document.createElement('ingredientHeading');
  // ingredientHeading.innerHTML = '<br />' + 'Ingredients';
  // heading.appendChild(ingredientHeading);

  let imgElem = document.createElement('img');
  imgElem.src = selectedRecipe.img;
  selectorRecipe.appendChild(imgElem);

  // let imgElem = document.createElement('img');
  // imgElem.src = clickRecipe.img;
  // selectorRecipe.appendChild(imgElem);

  let prepTime = document.createElement('h4');
  prepTime.innerHTML = 'Prep Time: ' + selectedRecipe.prepTime;
  selectorRecipe.appendChild(prepTime);

  // let prepTime = document.createElement('h4');
  // prepTime.innerHTML = 'Prep Time: ' + clickRecipe.prepTime;
  // selectorRecipe.appendChild(prepTime);

  let cookTime = document.createElement('h4');
  cookTime.innerHTML = 'Cook Time: ' + selectedRecipe.cookTime;
  selectorRecipe.appendChild(cookTime);

  // let cookTime = document.createElement('h4');
  // cookTime.innerHTML = 'Cook Time: ' + clickRecipe.cookTime;
  // selectorRecipe.appendChild(cookTime);

  selectorRecipe.appendChild(ingredientHeading);

  let ulElem = document.createElement('ul');
  selectorRecipe.appendChild(ulElem);

  for (let i = 0; i < selectedRecipe.ingredients.length; i++) {
    let liElem = document.createElement('li');
    liElem.textContent = selectedRecipe.ingredients[i];
    ulElem.appendChild(liElem);
  }

  // for (let i = 0; i < clickRecipe.ingredients.length; i++) {
  //   let liElem = document.createElement('li');
  //   liElem.textContent = clickRecipe.ingredients[i];
  //   ulElem.appendChild(liElem);
  // }

  let displayButton = document.createElement('button');
  displayButton.textContent = likeButton.isClicked;

  //todo keep
  let retrievedNotes = localStorage.getItem('myNotes');
  notesObject = JSON.parse(retrievedNotes) || {};

  if (notesObject && notesObject[heading.textContent]) {
    for (let i = 0; i < notesObject[heading.textContent].length; i++) {
      let newNotes = notesObject[heading.textContent][i];
      // console.log('test', parsedNotes[i]);
      let li = document.createElement('li');
      let text = document.createTextNode(newNotes);
      li.appendChild(text);
      document.getElementById('commentList').appendChild(li);
      notesArray.push(newNotes);
    }
  }

  createForm();
  function createForm() {

    let form = document.createElement('FORM');
    let commentBox = document.createElement('input');
    let submit = document.createElement('button');
    submit.disabled = true;

    commentBox.onkeyup = function () {
      if (commentBox.value.length > 0) {
        submit.disabled = false;
      }
      else {
        submit.disabled = true;
      }
    };

    commentBox.setAttribute('type', 'text');
    commentBox.setAttribute('id', 'commentBox');
    commentBox.setAttribute('placeholder', 'Enter Notes');
    form.appendChild(commentBox);

    submit.setAttribute('type', 'submit');
    submit.setAttribute('name', 'cmtBtn');
    form.appendChild(submit);
    notesContainer.appendChild(form);

    submit.addEventListener('click', function (event) {
      event.preventDefault();
      let li = document.createElement('li');
      let text = document.createTextNode(commentBox.value);
      li.appendChild(text);
      document.getElementById('commentList').appendChild(li);
      notesArray.push(commentBox.value);

      console.log(notesObject);

      notesObject[heading.textContent] = notesArray;
      let stringifiedNotes = JSON.stringify(notesObject);
      localStorage.setItem('myNotes', stringifiedNotes);
      commentBox.value = '';
      submit.disabled = true;
      return false;
    });
  }
  //todo keep


  let recipeDescription = document.createElement('h3');
  recipeDescription.innerHTML = 'Procedure';
  selectorRecipe.appendChild(recipeDescription);

  let pElem = document.createElement('p-description');
  pElem.textContent = selectedRecipe.description;
  selectorRecipe.appendChild(pElem);

  //Favorite recipe function
  // TODO: Set the class on likeButton based on isLiked of recipe in recipeArray

  // let pElem = document.createElement('p-description');
  // pElem.textContent = clickRecipe.description;
  // selectorRecipe.appendChild(pElem);

  // likeIncrement(clickRecipe);

}




let ThaiGreenCurry = new Recipe('Thai Green Curry', ['Thai curry paste', 'rice', 'ginger', 'lemon grass paste', 'oil', 'fish sauce', 'basil leaves', 'vegetables', 'meat-optional'], 'img/Thai-Green-Curry.jpeg', '15 min', '40 min', 'Heat oil in a heavy based skillet or pot over medium high heat.Add curry paste (and garlic, ginger and lemongrass Extras, if using) and cook for 2 to 3 minutes until it mostly "dries out".Add chicken broth and coconut milk, mix to dissolve paste.Add 1 tsp fish sauce, 1 tsp sugar, no salt.Add 3 tsp fish sauce, 3 tsp sugar, 1/8 tsp salt.Add chicken, stir then lower heat to medium so it iss bubbling gently. Cook for 7 minutes.Add snow peas, cook 2 minutes until a bit softened, then stir through basil and lime juice. Sauce should have reduced but will still be a be on the thin side, not thick - that is how it should be. DO NOT keep simmering - sauce will darken.Serve curry over jasmine rice with garnishes of choice.', false);


let padThai = new Recipe('Pad Thai', ['dry pad thai noodels', '4 garlic cloves', '1 tbsp ginger', '2 eggs', 'chicken/tofu', 'peanut oil', 'fish sauce', 'rice vineger', 'soy suace'], 'img/pad-thai.jpeg','20 mins', '35 mins', 'COOK NOODLES: Cook noodles according to package instructions (or place rice noodles in a shallow bowl or baking dish and boil enough water to cover them. COver with boiling water for 7-8 minutes, until tender, then drain.They do not have to be fully soft, just bendy and pliable).Whisk the two eggs in a bowl with a fork and add a generous, 3-finger pinch of salt. Set aside. Make the Pad Thai sauce: whisk fish sauce, rice vinegar, brown sugar and soy sauce.(see notes) in a small bowl.Set aside.Slice chicken into very thin strips and season with salt and pepper.Make a well in the center of the wok, scooting the shallot mixture to the side of the pan, add the whisked eggs. Garnish with more bean sprouts, fresh scallions, cilantro or basil, chili flakes, lime', false);


let ThaiPineaapleRice = new Recipe('Pineapple Rice', ['1 Cilantro leaves', '2 tbsp Garlic', '2 tsp Ginger', '1/4 cup Green onions', '1/2 cup Green peas, fresh or frozen', '1 Pineapple', '1/2 cup Red bell pepper', '1/4 cup Red onion'], 'img/pinappleRice.jpeg', '15 min', '40 min', 'In a 3-quart sized saucepan, add rice and water.Bring to a boil and then turn down heat to a simmer and cover with a lid.Simmer rice for 10-12 minutes, or until all of the water is absorbed and rice is tender.Cut the pineapple in half lengthwise and carve out wedges from both sides of the core.Carefully cut out the core, to create a hollow bowl.Scrape the inside flesh with a spoon if needed after removing the core.Cut the removed pineapple flesh into ½-inch pieces, reserving 1 cup (7 ounces, 200g).In a small bowl mix together fish sauce, soy sauce, sugar, and curry powder. Heat a wok or large saute pan over high heat.Add the vegetable oil, once hot add the onions, ginger, garlic, stir-fry 30 seconds', false);


// Load favorites
let retrieveRecipe = localStorage.getItem('favRecipies');
let parsedRecipe = JSON.parse(retrieveRecipe);

// TODO: Mark recipies in recipeArray as liked based on
// parsedRecipe

//adding changes
function renderList() {
  for (let i = 0; i < recipeArray.length; i++) {
    let liElem = document.createElement('li');
    liElem.id = i;
    liElem.textContent = recipeArray[i].name;
    recipeIng.appendChild(liElem);
    if (parsedRecipe) {
      for (let j = 0; j < parsedRecipe.length; j++) {
        if (parsedRecipe[j].name === recipeArray[i].name && parsedRecipe[j].isClicked) {
          recipeArray[i].isClicked = true;
        }
      }
    }
  }
}

if (recipeIng) {
  renderList();

  recipeIng.addEventListener('click', handleRecipeClick);
}
