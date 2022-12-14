//select the element 
const video = document.querySelector('.video-container');
const btn = document.querySelector('.switch-btn');
const preLoader = document.querySelector('.preloader');

// play pause video
btn.addEventListener('click',function(){
    if(!btn.classList.contains('slide')){
        btn.classList.add('slide');
        video.pause();
    }else{
        btn.classList.remove('slide');
        video.play();
    }
});

//preloader
window.addEventListener('load',function(){
    preLoader.classList.add('hide-preloader');
})