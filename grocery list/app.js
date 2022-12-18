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
        editElement.innerHTML = value;
        showAlert('value changed','success');
        backtoDefault();
    }
    else{
        showAlert('Please Enter the Value','danger');
    }
}

//clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        })
    }
    container.classList.remove('show-container');
    showAlert('empty list','danger');
    backtoDefault();
    
}

function editItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    editElement = e.currentTarget.parentElement.previousElementSibling;
    grocery.value  = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;

    submitBtn.textContent = 'edit';


}

function deleteItem(e){
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);

    if(list.children.length === 0){
        container.classList.remove('show-container');
    }

    showAlert('remove item' , 'danger');
    backtoDefault();
}

function showAlert(message,action){
    alert.textContent = message;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function(){
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    },1000)

}

function backtoDefault(){
    grocery.value = ' ';
    editFlag = false;
    editId = '';
    submitBtn.textContent = 'submit';
}