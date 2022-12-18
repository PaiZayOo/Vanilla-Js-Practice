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
        addToLocalStorage(id, value);
    }
    else if(value && editFlag){
        editElement.innerHTML = value;
        showAlert('value changed','success');
        editLocalStorage(editId , value);
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
    localStorage.removeItem("list");
    
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
    removeFromLocalStorage(id);
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


// ****** LOCAL STORAGE **********
function addToLocalStorage(id ,value){
    const grocery = {id,value};
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list',JSON.stringify(items));
}

function getLocalStorage(){
    return localStorage.getItem('list')
        ? JSON.parse(localStorage.getItem('list'))
        : [];
}

function editLocalStorage(id ,value){
    let items = getLocalStorage();
    items.map(function(item){
        if(item.id === id){
            item.value = value;
        }
        return item;
    })
    localStorage.setItem('list',JSON.stringify(items));
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();
  
    items = items.filter(function (item) {
      if (item.id !== id) {
        return item;
      }
    });
  
    localStorage.setItem("list", JSON.stringify(items));
  }




// ****** SETUP ITEMS **********


function setupItems() {
    let items = getLocalStorage();
  
    if (items.length > 0) {
      items.forEach(function (item) {
        createListItem(item.id, item.value);
      });
      container.classList.add("show-container");
    }
  }
  
  function createListItem(id, value) {
    const element = document.createElement("article");
    let attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.classList.add("grocery-item");
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
              </div>
            `;
    // add event listeners to both buttons;
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);
    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);
  
    // append child
    list.appendChild(element);
  }