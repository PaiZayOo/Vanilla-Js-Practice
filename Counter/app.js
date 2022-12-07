//initialize  the count value
let count = 0;

//define the value

let value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');

btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        let list = e.currentTarget.classList;
        console.log(list);
        if(list.contains('increase')){
            count++;
        }else if(list.contains('decrease')){
            count--;
        }else{
            count = 0;
        }
        if(count > 0){
            value.style.color = 'green';
        }
        if(count < 0){
            value.style.color = 'red';
        }
    value.textContent = count;
    })
  
})