let saveBtn = document.querySelector('.save');
let itemText = document.querySelector('.item');
let quantityText = document.querySelector('.quantity');

saveBtn.addEventListener('click', (e) => {
    if(itemText.value == "" || quantityText.value == "") {
        return alert('Please fill all fields');
    }

    let item = localStorage.getItem("item");
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
    }
    let myObj = {
        itemTitle: itemText.value,
        itemQuantity: quantityText.value
    }
    itemObject.push(myObj);
    localStorage.setItem("item", JSON.stringify(itemObject));
    itemText.value = "";
    quantityText.value = "";

    displayContent();
})

let displayContent = () => {
    let item = localStorage.getItem("item");
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
    } 

let display = " ";
itemObject.forEach((element, index) => {
    display += `
    <div class="item-display">
    <h4 class="item-text"> Item: ${element.itemTitle}</h4>
    <p class="quan-text">Ouantity: ${element.itemQuantity}</p>
    <button class="modify" id="${index}" onclick="modify(this.id)">modify</button>
    <button class="remove" id="${index}" onclick="remove(this.id)">remove</button>
    </div>
    `;
}); 

let displaySection = document.querySelector('.display');
if(itemObject.length != 0) {
    displaySection.innerHTML = display;
} else {
    displaySection.innerHTML = "No item added";
}

}

//remove function
let remove = (index) => {
    let confirmRemove = confirm("Do you want to remove the item!");

    if(confirmRemove == true) {
        let item = localStorage.getItem("item");
        if(item == null) {
            itemObject = [];
        } else {
            itemObject = JSON.parse(item);
        }

        itemObject.splice(index, 1);
        localStorage.setItem("item", JSON.stringify(itemObject));
        displayContent();
    }
}


//modify function
let modify = (index) => {
    let item = localStorage.getItem("item");
    if(itemText.value !== "" || quantityText.value !== "") {
        return alert('Clear fields before editting');
    }
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
    }
    
    itemObject.findIndex((element, index) => {
        itemText.value = element.itemTitle;
        quantityText.value = element.itemQuantity;   
    })
    itemObject.splice(index, 1);
    localStorage.setItem("item", JSON.stringify(itemObject));
    displayContent();
}

//clear displayed items
let clearDisplay = document.querySelector('.clear');
clearDisplay.addEventListener('click', () => {
    let item = localStorage.getItem("item");
    if(item == null) {
        itemObject = [];
    } else {
        itemObject = JSON.parse(item);
        itemObject = [];
    } 
    localStorage.setItem("item", JSON.stringify(itemObject));
    displayContent();

})

displayContent();




