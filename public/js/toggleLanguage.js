function languageSwitchCards() {
    var x = document.getElementsByClassName("contentEnglishToggle");
    var y = document.getElementsByClassName("contentHindiToggle");
    var z = document.getElementById("languageToggle");
    for (i = 0; i < x.length; i++) {
        if (z.checked) {
            x[i].style.display = "none";
        } else {
            x[i].style.display = "block";
        }
    }
    for (j = 0; j < y.length; j++) {
        console.log(y[j].style.display)
        if (!z.checked) {
            y[j].style.display = "none";

        } else {
            y[j].style.display = "block";
        }
    }
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const languagecheckBox = document.getElementById('languageToggle')
languagecheckBox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        setCookie('languageCookie','hi',7);
    } else {
        setCookie('languageCookie','en',7);
    }
  })
document.onload = setLanguageOnLoad();
document.onload = languageSwitchCards();
function setLanguageOnLoad(){
    var languageCookie = getCookie('languageCookie')
    console.log("COOKIE VALUE IS:\t")
    console.log(languageCookie);
    if(languageCookie == "hi")
    {
        document.getElementById('languageToggle').checked = true;
    }
    else{
        document.getElementById('languageToggle').checked = false;
    }
}