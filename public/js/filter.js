// var input, list;
// const seasonsFilter = document.getElementById("seasons");
// const casteFilter = document.getElementById("caste");
// const soilFilter = document.getElementById("soils")
// seasonsFilter.addEventListener("change", (e) => {
//     const value = e.target.value;
//     const filter = value.toUpperCase();
//     console.log(value)
//     list = document.getElementsByClassName('card');
//     var filteredList = [];
//     for (i = 0; i < list.length; i++) {
//         if (list[i].style.display != "none")
//             filteredList.push(list[i]);
//     }
//     if (value == "All") {
//         for (i = 0; i < list.length; i++)
//             list[i].style.display = "";
//     }
//     else
//         for (i = 0; i < filteredList.length; i++) {
//             var seasoniv = filteredList[i].childNodes[1].childNodes[5].innerHTML
//             if (seasoniv.toUpperCase().indexOf(filter) > -1) {
//                 filteredList[i].style.display = "";
//             } else {
//                 filteredList[i].style.display = "none";
//             }
//             // if(seasoniv == value)
//             //     list[i].style.display = "";
//             // else
//             //      list[i].style.display = "none";
//         }
// })
//
// casteFilter.addEventListener("change", (e) => {
//     const value = e.target.value;
//     const filter = value.toUpperCase();
//     console.log(value)
//     list = document.getElementsByClassName('card');
//     var filteredList = [];
//     for (i = 0; i < list.length; i++) {
//         if (list[i].style.display != "none")
//             filteredList.push(list[i]);
//     }
//     if (value == "All") {
//         for (i = 0; i < list.length; i++)
//             list[i].style.display = "";
//     }
//     else
//         for (i = 0; i < filteredList.length; i++) {
//             var casteiv = filteredList[i].childNodes[1].childNodes[7].innerHTML
//             console.log(casteiv)
//             if (casteiv.toUpperCase().indexOf(filter) > -1) {
//                 filteredList[i].style.display = "";
//             } else {
//                 filteredList[i].style.display = "none";
//             }
//         }
// })
//
//
// soilFilter.addEventListener("change", (e) => {
//     const value = e.target.value;
//     const filter = value.toUpperCase();
//     console.log(value)
//     list = document.getElementsByClassName('card');
//     var filteredList = [];
//     for (i = 0; i < list.length; i++) {
//         if (list[i].style.display != "none")
//             filteredList.push(list[i]);
//     }
//     if (value == "All") {
//         for (i = 0; i < list.length; i++)
//             list[i].style.display = "";
//     }
//     else
//         for (i = 0; i < filteredList.length; i++) {
//             var soiliv = filteredList[i].childNodes[1].childNodes[9].innerHTML
//             if (soiliv.toUpperCase().indexOf(filter) > -1) {
//                 filteredList[i].style.display = "";
//             } else {
//                 filteredList[i].style.display = "none";
//             }
//             // if(seasoniv == value)
//             //     list[i].style.display = "";
//             // else
//             //      list[i].style.display = "none";
//         }
// })
//

const checkboxes = document.querySelectorAll("input[type='checkbox']");
console.log(checkboxes)
const cardContainer = document.getElementById("myItemsEnglish");
var checkboxValues = [ ];

checkboxes.forEach((box) => {
      box.checked = false;
      box.addEventListener("change", () => filterCards());
});

function grabCheckboxValues() {
      var checkboxValues = [];
      checkboxes.forEach((checkbox) => {
            if (checkbox.checked) checkboxValues.push(checkbox.value);
      });
      return checkboxValues;
}

function filterCards() {
      wrapper.innerHTML = "";
      checkboxValues = grabCheckboxValues();
data.forEach((item) => {
            let classes = item.classes;
            let result = (arr, target) => target.every((v) => arr.includes(v));
let isMatch = result(classes, checkboxValues);
            if (isMatch) {
                  var card = `
            <div data-aos="flip-down" data-aos-duration=500 class="card" style="padding:10px; min-width:400px;  background-color:#CCC; margin:10px;">
            <h1 class="title">${item.title}</h1>
            </div>
        `;
                  wrapper.innerHTML += card;
            }
      });
}
