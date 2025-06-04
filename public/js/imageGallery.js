var document, console;
var currentslide = 0;
var imagesslides = Array.from(document.querySelectorAll(".sliderc img"));
var imagescount = imagesslides.length;
var next = document.getElementById("next");
var prev = document.getElementById("prev");
var i;
var indect = document.getElementById("indect");
var ull = document.createElement('ul');
ull.setAttribute('id', 'pagination-ul');
for (i = 1; i <= imagescount; i += 1) {
    var lii = document.createElement('li');
    lii.setAttribute('data-index', i);
    lii.appendChild(document.createTextNode(i));
    ull.appendChild(lii);  
}
indect.appendChild(ull);

var imagesbullet = Array.from(document.querySelectorAll("#pagination-ul li"));

imagesslides[currentslide].classList.add('active');
imagesbullet[currentslide].classList.add('active');
next.onclick = nextslide;
prev.onclick = prevslide;









function nextslide() {

    "use strict";
    if (currentslide == imagescount - 1)
    {
        next.classList.add("dis");
        return false;
        
    }
    else{
             imagesslides[currentslide].classList.remove('active');
             imagesbullet[currentslide].classList.remove('active');
             currentslide++;
             imagesslides[currentslide].classList.add('active');
             imagesbullet[currentslide].classList.add('active');
    }

    console.log(currentslide); 
}


function prevslide(){
if (currentslide == 0) {
            prev.classList.add("dis");
            return false;
        
        } else {
            imagesslides[currentslide].classList.remove('active');
            imagesbullet[currentslide].classList.remove('active');
            currentslide -= 1;
            imagesslides[currentslide].classList.add('active');
            imagesbullet[currentslide].classList.add('active');
        }
}


imagesbullet.forEach(function (bullet){
    "use strict";
    bullet.onclick = function ( ){
            imagesslides[currentslide].classList.remove('active');
                    imagesbullet[currentslide].classList.remove('active');
currentslide = bullet.getAttribute("data-index") - 1;


imagesslides[currentslide].classList.add('active');
imagesbullet[currentslide].classList.add('active');
console.log(currentslide);
    };
});

