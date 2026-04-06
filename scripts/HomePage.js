

const slider = document.getElementById("slider");

function slideLeft(){
    slider.scrollBy({
        left: -slider.clientWidth,
        behavior: "smooth"
    });
}

function slideRight(){
    slider.scrollBy({
        left: slider.clientWidth,
        behavior: "smooth"
    });
}

