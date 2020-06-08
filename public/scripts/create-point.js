function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( ( res ) => { return res.json()} )
  .then( (states) => {
    
    for(const state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }

  } )
} 

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value>Selecione a cidade</option>";
  citySelect.disabled = true;

  fetch(url)
  .then( ( res ) => { return res.json()} )
  .then( (cities) => {
    
    for(const city of cities) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    }

    citySelect.disabled = false;

  } )
  
}
 
document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

// Collect Items

const itemsToCollect = document.querySelectorAll(".items-grid li");

for(const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event){
  const itemLi = event.target;

  //toggle selected class
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  const alreadySelected = selectedItems.findIndex(item => item == itemId);
  
  //If the item is already selected, remove from the selection
  if(alreadySelected >= 0){
    // Remove from the selection
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId;
      return itemIsDifferent;
    });

    //update selection
    selectedItems = filteredItems;
  } else {
    //If the item is not selected
    //add to the selection
    selectedItems.push(itemId);
  }

  collectedItems.value = selectedItems;
  
}