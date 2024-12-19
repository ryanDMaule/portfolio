const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
        // UNCCOMENT THE BELOW TO REPEAT THE ANIMATIONS
        else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

//WIDE VIEW
var thumbnails = document.getElementById("thumbnails")
var imgs = thumbnails.getElementsByTagName("img")
var main = document.getElementById("main")
var counter=0;

for(let i=0;i<imgs.length;i++){
    let img=imgs[i]
    
    img.addEventListener("click",function() {
        main.src=this.src 
    })
}

//NARROW VIEW
var thumbnails_n = document.getElementById("thumbnails_n")
var imgs = thumbnails_n.getElementsByTagName("img")
var main_n = document.getElementById("main_n")
var counter=0;

for(let i=0;i<imgs.length;i++){
    let img=imgs[i]
    
    img.addEventListener("click",function() {
        main_n.src=this.src 
    })
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};