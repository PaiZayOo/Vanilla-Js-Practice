//select parent element 

const about = document.querySelector('.about');
const articles = document.querySelectorAll('.content');
const btns = document.querySelectorAll('.tab-btn');

about.addEventListener('click',function(e){
    const id = e.target.dataset.id;
    if(id){
        btns.forEach(function(btn){
            btn.classList.remove('active');
            e.currentTarget.classList.add('active');
        })
        const element = document.getElementById(id);
        articles.forEach(function(article){
            article.classList.remove('active');
            element.classList.add('active');
        })
    }
})