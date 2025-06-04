function changeImage() {
    var x = document.getElementsByClassName("image1Crop");
    var y = document.getElementsByClassName("image2Crop");
    for (i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            y[i].style.display = "none";
            x[i].style.display = "block";
        } else {
            y[i].style.display = "block";
            x[i].style.display = "none";
        }
    }
}

function changeImage() {
    var x = document.getElementsByClassName("image1Crop");
    var y = document.getElementsByClassName("image2Crop");
    for (i = 0; i < x.length; i++) {
        if (x[i].style.display === "none") {
            y[i].style.display = "none";
            x[i].style.display = "block";
        } else {
            y[i].style.display = "block";
            x[i].style.display = "none";
        }
    }
}