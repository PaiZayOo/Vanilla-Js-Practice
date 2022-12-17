// ****** SELECT ITEMS **********

const form = document.querySelector('.grocery-form');
let alert = document.querySelector('.alert');
let grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn'); 

// edit option
let editElement;
let editFlag = false;
let editId = '';
// ****** EVENT LISTENERS **********

form.addEventListener('submit',addItem);
clearBtn.addEventListener('click', clearItems);

// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();


    if(value && !editFlag){
        const element = document.createElement('article');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.classList.add('grocery-item');
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`

        //addEvent listener to both buttons
        
        const editBtn = element.querySelector('.edit-btn');
        editBtn.addEventListener('click', editItem);
        const deleteBtn = element.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', deleteItem);
        //append child
        list.appendChild(element);
        //display alert
        showAlert('item addeded successfully','success');
        //show container
        container.classList.add('show-container');
        //back to default
        backtoDefault();

        //set local storage
        // addToLocalStorage();
    }
    else if(value && editFlag){
        console.log('this is editing');
    }
    else{
        showAlert('Please Enter the Value','danger');
    }
}

function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    console.log(items);
}

function editItem(){

}

function deleteItem(){

}

function showAlert(message,action){
    alert.textContent = message;
    alert.classList.add(`alert-${action}`);

}

function backtoDefault(){
    grocery.value = ' ';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}

function addToLocalStorage(){

}
// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********