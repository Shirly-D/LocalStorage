let saveBtn = document.querySelector('.save');
let itemText = document.querySelector('.item');
let quantityText = document.querySelector('.quantity');

saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
})
