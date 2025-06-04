function readMore() {
    var dots = document.getElementsByClassName("dots");
    var moreText = document.getElementsByClassName("more");
    var btnText = document.getElementsByClassName("myBtn");
    console.log(dots);
    console.log(moreText);
    console.log(btnText);
    for (i = 0; i < dots.length; i++) {
        if (dots[i].style.display === "none") {
            dots[i].style.display = "inline";
            btnText[i].innerHTML = "Read more";
            moreText[i].style.display = "none";
            $('html,body').scrollTop(0);
        } else {
            dots[i].style.display = "none";
            btnText[i].innerHTML = "Read less";
            moreText[i].style.display = "inline";
            $('html,body').scrollTop(0);
        }
    }
}