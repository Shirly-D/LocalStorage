let form = document.querySelector('.form');
let saveBtn = document.querySelector('.save');
let itemText = document.querySelector('.item');
let quantityText = document.querySelector('.quantity');
let textLength = /^[A-Za-z. ]{3,30}$/;
let numLength = /^[0-9]*$/;

let errorMsg = (input, message) => {
    var formControl = input.parentElement;
    var small = formControl.querySelector('span');
    small.innerText = message;
    formControl.className += ' error';
}

let successMsg = (input) => {
    var formControl = input.parentElement;
    formControl.className = ' success';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    inputValue();
})

let inputValue = () => {
    if(itemText.value === "") {
        errorMsg(itemText, '*This field is required');
    } else if(!textLength.test(itemText.value)  || itemText.value.length < 1) {
        errorMsg(itemText, 'Enter valid item');
    } else {
        successMsg(itemText);
    }

    if(quantityText.value == "") {
        errorMsg(quantityText, '*This field is required');
    } else if(!numLength.test(quantityText.value)  || quantityText.value.length < 1) {
        errorMsg(quantityText, 'Enter valid quantity');
    } else {
        successMsg(quantityText);
    }
}

saveBtn.addEventListener('click', (e) => {
    
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
    <button class="${index}" onclick="modify(this.class)">modify</button>
    <button class="${index}" onclick="remove(this.class)">remove</button>
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




