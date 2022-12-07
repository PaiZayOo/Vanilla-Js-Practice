const colors = ['red','green','yellow','blue'];

const color = document.querySelector('.color');
const btn = document.getElementById('btn');

btn.addEventListener('click',function(){
    let randomNumber = getRandomNumber();
    // console.log(getRandomNumber());
    document.body.style.background = colors[randomNumber];
    color.textContent = colors[randomNumber];
});

function getRandomNumber(){
    return Math.floor(Math.random() * colors.length);
}