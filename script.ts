interface Cocktail {
  name: string;
  ingredients: string;
  image: string;
}

let currentIndex: number = 0;
let cocktailsData: Cocktail[] = [];

//TODO: Arreglar Promise

async function fetchCocktails(): Promise<void> {

  try {
    
    const response = await fetch('cocktails.json');

    if (!response.ok) {
      throw new Error('Failed to fetch cocktails data');
    }

    cocktailsData = await response.json();
    displayCocktail();

  } catch (error) {
    console.error('Error fetching cocktails data:', error);
    
  }
  
}

function displayCocktail(): void {
  const currentCocktail: Cocktail | undefined = cocktailsData[currentIndex];
  if(!currentCocktail) {
    alert('No hay cocteles para estudiar')
    return;
  }

  const cocktailImage: HTMLImageElement | null = document.getElementById('cocktailImage') as HTMLImageElement;
  if (cocktailImage){
    cocktailImage.src = currentCocktail.image;
  }

  const nameInput: HTMLInputElement | null = document.getElementById('nameInput') as HTMLInputElement;
  if (nameInput){
    nameInput.value = '';
  }

  const ingredientsInput: HTMLInputElement | null = document.getElementById('ingredientsInput') as HTMLInputElement;
  if (ingredientsInput){
    ingredientsInput.value = '';
  }
}


function checkAnswer(): void {

  const currentCocktail: Cocktail | undefined = cocktailsData[currentIndex];

  if(!currentCocktail) {
    alert('No hay mas cocteles para estudiar.');
    return;
  }

  const userInputName: string = (document.getElementById('nameInput') as HTMLInputElement).value.trim().toLowerCase();
  const userInputIngredients: string = (document.getElementById('ingredientsInput') as HTMLInputElement).value.trim().toLowerCase();

  if (userInputName === currentCocktail.name.toLowerCase() &&
      userInputIngredients === currentCocktail.ingredients.toLowerCase()) {
      
    alert("Respuesta correcta");
    currentIndex++;
    displayCocktail();
      

  } else {
    alert(`Respuesta incorrecta -- > ${currentCocktail.ingredients}`);
  }
  
}

fetchCocktails();
