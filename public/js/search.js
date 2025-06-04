var input = document.getElementById("searched");

var form = document.getElementById("myForm");

function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);

function highlight(param) {

    // Select the whole paragraph
    var obc = document.getElementsByClassName("titleSelector");
    for (i = 0; i < obc.length; i++) {
        var ob = new Mark(obc[i]);
        console.log("inside highlight-----------??")
        console.log(ob);
        // First unmark the highlighted word or letter
        ob.unmark();

        // Highlight letter or word
        ob.mark(
            document.getElementById("searched").value, { className: 'a' + param }
        );
        document.getElementById("searched").focus()
    }
}