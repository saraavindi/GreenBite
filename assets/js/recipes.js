// DOM references
let recipeGrid = document.getElementById("recipe-grid")
let searchInput = document.getElementById("search")
let categorySelect = document.getElementById("category")
let resetBtn = document.getElementById("reset-filters")

let modal = document.getElementById("recipeModal")
let modalTitle = document.getElementById("modalTitle")
let modalImage = document.getElementById("modalImage")
let modalDescription = document.getElementById("modalDescription")
let modalIngredients = document.getElementById("modalIngredients")
let modalSteps = document.getElementById("modalSteps")
let modalNutritionBody = document.querySelector("#modalNutrition tbody") || document.querySelector("#modalNutrition")

// recipes from the json file
let recipesList = []

fetch("recipes.json")
  .then(function(response){
    return response.json()
  })
  .then(function(data){
    recipesList = data
    renderRecipes()
  })
  .catch(function(error){
    console.log("Error loading recipes", error)
  })

// Create a recipe card
function createRecipeCard(recipe){
  let card = document.createElement("article")
  card.className = "recipe-card"
  card.setAttribute("data-id", recipe.id)

  let image = document.createElement("img")
  image.src = recipe.img
  image.alt = recipe.title
  card.appendChild(image)

  let infoDiv = document.createElement("div")
  infoDiv.className = "recipe-info"
  card.appendChild(infoDiv)

  let title = document.createElement("h3")
  title.textContent = recipe.title
  infoDiv.appendChild(title)

  let desc = document.createElement("p")
  desc.textContent = recipe.desc
  infoDiv.appendChild(desc)

  // to open modal
  card.onclick = function(){
    showRecipeModal(recipe.id)
  }

  return card
}

// using filters
function renderRecipes(){
  let nameFilter = ""
  let categoryFilter = "all"

  if (searchInput){
    nameFilter = searchInput.value.toLowerCase().trim()
  }
  if (categorySelect){
    categoryFilter = categorySelect.value
  }

  recipeGrid.innerHTML = ""

  let filtered = []

  recipesList.forEach(function(recipe){
    let matchesName = false
    if (recipe.title.toLowerCase().includes(nameFilter)){
      matchesName = true
    }

    let matchesCategory = false
    if (categoryFilter === "all"){
      matchesCategory = true
    } else {
      if (recipe.category === categoryFilter){
        matchesCategory = true
      }
    }

    if (matchesName && matchesCategory){
      filtered.push(recipe)
    }
  })

  if (filtered.length === 0){
    let noRecipes = document.createElement("div")
    noRecipes.textContent = "No recipes found."
    noRecipes.style.textAlign = "center"
    noRecipes.style.padding = "30px"
    recipeGrid.appendChild(noRecipes)
  } else {
    filtered.forEach(function(recipe){
      let card = createRecipeCard(recipe)
      recipeGrid.appendChild(card)
    })
  }
}

// Show recipe details in modal
function showRecipeModal(id){
  let selectedRecipe = null
  recipesList.forEach(function(recipe){
    if (recipe.id === id){
      selectedRecipe = recipe
    }
  })

  if (selectedRecipe === null){
    return
  }

  modalTitle.textContent = selectedRecipe.title
  modalImage.src = selectedRecipe.img
  modalImage.alt = selectedRecipe.title
  modalDescription.textContent = selectedRecipe.desc

  // Ingredients
  modalIngredients.innerHTML = ""
  selectedRecipe.ingredients.forEach(function(item){
    let li = document.createElement("li")
    li.textContent = item
    modalIngredients.appendChild(li)
  })

  // Steps
  modalSteps.innerHTML = ""
  selectedRecipe.steps.forEach(function(step){
    let li = document.createElement("li")
    li.textContent = step
    modalSteps.appendChild(li)
  })

  // Nutrition
  modalNutritionBody.innerHTML = ""
  let caloriesRow = document.createElement("tr")
  let caloriesName = document.createElement("td")
  caloriesName.textContent = "Calories"
  let caloriesValue = document.createElement("td")
  caloriesValue.textContent = selectedRecipe.nutrition.Calories
  caloriesRow.appendChild(caloriesName)
  caloriesRow.appendChild(caloriesValue)
  modalNutritionBody.appendChild(caloriesRow)

  let proteinRow = document.createElement("tr")
  let proteinName = document.createElement("td")
  proteinName.textContent = "Protein"
  let proteinValue = document.createElement("td")
  proteinValue.textContent = selectedRecipe.nutrition.Protein
  proteinRow.appendChild(proteinName)
  proteinRow.appendChild(proteinValue)
  modalNutritionBody.appendChild(proteinRow)

  let carbsRow = document.createElement("tr")
  let carbsName = document.createElement("td")
  carbsName.textContent = "Carbs"
  let carbsValue = document.createElement("td")
  carbsValue.textContent = selectedRecipe.nutrition.Carbs
  carbsRow.appendChild(carbsName)
  carbsRow.appendChild(carbsValue)
  modalNutritionBody.appendChild(carbsRow)

  let fatRow = document.createElement("tr")
  let fatName = document.createElement("td")
  fatName.textContent = "Fat"
  let fatValue = document.createElement("td")
  fatValue.textContent = selectedRecipe.nutrition.Fat
  fatRow.appendChild(fatName)
  fatRow.appendChild(fatValue)
  modalNutritionBody.appendChild(fatRow)

  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

// Close modal
function closeModal(){
  modal.style.display = "none"
  document.body.style.overflow = ""
}

// Event listeners
document.addEventListener("click", function(event){
  if (event.target.matches(".close-btn") || event.target.closest(".close-btn")){
    closeModal()
  }
  if (event.target === modal){
    closeModal()
  }
})

if (searchInput){
  searchInput.addEventListener("input", function(){
    renderRecipes()
  })
}

if (categorySelect){
  categorySelect.addEventListener("change", function(){
    renderRecipes()
  })
}

if (resetBtn){
  resetBtn.addEventListener("click", function(){
    if (searchInput) searchInput.value = ""
    if (categorySelect) categorySelect.value = "all"
    renderRecipes()
  })
}
// --- Hamburger Menu ---
let hamburgerButton = document.getElementById("hamburger");
let navigationMenu = document.getElementById("navMenu");

function toggleMenu() {
  navigationMenu.classList.toggle("open");
}

hamburgerButton.addEventListener("click", toggleMenu);