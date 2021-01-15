// Selectors
var forma = document.querySelector(".forma");
var inputBtn = document.querySelector(".inputBtn");
var inputText = document.querySelector(".input");
var lista = document.querySelector(".listContainer");
var filter = document.querySelector("select");
var search = document.querySelector(".search");
var reset = document.querySelector(".reset");
var info = document.querySelector(".info");
var closeBtn = document.querySelector(".close");
var overlay = document.querySelector(".overlay");
var modeBtn = document.querySelector(".mode");
//
//
//
//
// Event Listeners
forma.addEventListener("submit", addItem);
lista.addEventListener("click", complete);
lista.addEventListener("click", toTrash);
lista.addEventListener("click", favourite);
filter.addEventListener("change", filtriranje);
search.addEventListener("keyup", pretraga);
reset.addEventListener("click", resetList);
info.addEventListener("click", information);
closeBtn.addEventListener("click", closeInformation);
modeBtn.addEventListener("click", mode);
document.addEventListener("keyup", function (event) {
  if (event.key === "Escape") {
    closeInformation();
  }
});
document.addEventListener("scroll", () => {
  if (document.documentElement.scrollTop > 0) {
    document.querySelector(".content").classList.add("contentScroll");
  } else {
    document.querySelector(".content").classList.remove("contentScroll");
  }
});
//
//
//
//
//
// Functions
function addItem(submit) {
  submit.preventDefault();
  var itemContainer = document.createElement("div");
  itemContainer.classList.add("item");
  var star = document.createElement("i");
  star.innerText = "star_border";
  star.classList.add("material-icons");
  star.classList.add("zvezda");
  var number = document.createElement("li");
  number.innerText = "";
  number.classList.add("number");
  var itemName = document.createElement("p");
  itemName.innerText =
    inputText.value.charAt(0).toUpperCase() + inputText.value.slice(1);
  itemName.classList.add("itemText");
  var check = document.createElement("button");
  check.innerHTML = '<i class="material-icons">check</i>';
  check.classList.add("check");
  check.classList.add("itemBtn");
  var trash = document.createElement("button");
  trash.innerHTML = '<i class="material-icons">delete_sweep</i>';
  trash.classList.add("delete");
  trash.classList.add("itemBtn");

  itemContainer.appendChild(star);
  itemContainer.appendChild(number);
  itemContainer.appendChild(itemName);
  itemContainer.appendChild(check);
  itemContainer.appendChild(trash);
  itemContainer.classList.add("itemAnimation");
  lista.insertBefore(itemContainer, lista.firstElementChild);
  inputText.value = "";
  inputText.focus();
  filtriranje();
}

function complete(event) {
  var itemContainer = event.target.parentElement;
  if (event.target.classList.contains("check")) {
    itemContainer.classList.toggle("completed");
    if (itemContainer.classList.contains("completed")) {
      event.target.innerHTML = '<i class="material-icons">refresh</i>';
      itemContainer.parentElement.insertBefore(
        itemContainer,
        itemContainer.parentElement.lastChild.nextSibling
      );
    } else {
      event.target.innerHTML = '<i class="material-icons">check</i>';
      itemContainer.parentElement.insertBefore(
        itemContainer,
        itemContainer.parentElement.firstElementChild
      );
    }
  }
  filtriranje();
}
function toTrash(event) {
  var trashBtn = event.target;
  var itemContainer = trashBtn.parentElement;
  if (trashBtn.classList.contains("delete")) {
    if (confirm("Are you sure you want to remove selected task?")) {
      itemContainer.classList.add("itemRemove");
      itemContainer.addEventListener("animationend", function () {
        itemContainer.remove();
      });
    }
  }
}
function filtriranje() {
  var items = lista.children;
  var filterValue = filter.value;
  for (var i = 0; i < items.length; i++) {
    switch (filterValue) {
      case "All":
        items[i].style.display = "flex";
        break;

      case "Completed":
        if (items[i].classList.contains("completed")) {
          items[i].style.display = "flex";
        } else {
          items[i].style.display = "none";
        }
        break;
      case "Uncompleted":
        if (items[i].classList.contains("completed")) {
          items[i].style.display = "none";
        } else {
          items[i].style.display = "flex";
        }
        break;
      case "Favourites":
        if (items[i].classList.contains("favourite")) {
          items[i].style.display = "flex";
        } else {
          items[i].style.display = "none";
        }
        break;
    }
  }
}

function pretraga() {
  var items = lista.children;
  var searchVal = search.value.toLowerCase();
  for (var i = 0; i < items.length; i++) {
    if (
      items[i]
        .querySelector(".itemText")
        .textContent.toLowerCase()
        .indexOf(searchVal) != -1
    ) {
      items[i].style.display = "flex";
    } else {
      items[i].style.display = "none";
    }
  }
}

function favourite(event) {
  if (event.target.classList.contains("zvezda")) {
    var item = event.target.parentElement;
    var star = event.target;
    item.classList.toggle("favourite");
    if (item.classList.contains("favourite")) {
      star.innerHTML = "star";
      star.style.color = "yellow";
    } else {
      if (document.body.classList.contains("light")) {
        star.innerHTML = "star_border";
        star.style.color = "white";
      } else {
        star.innerHTML = "star_border";
        star.style.color = "#333333";
      }
    }
  }
  filtriranje();
}

function resetList() {
  if (confirm("Are you sure you want to reset the entire list?")) {
    lista.innerHTML = "";
  }
}

function information() {
  overlay.style.opacity = "1";
  overlay.style.pointerEvents = "all";
}
function closeInformation() {
  overlay.style.opacity = "0";
  overlay.style.pointerEvents = "none";
}

function mode() {
  document.body.classList.toggle("light");
  var zvezde = document.querySelectorAll(".zvezda");
  for (var i = 0; i < zvezde.length; i++) {
    if (zvezde[i].innerHTML == "star_border") {
      if (document.body.classList.contains("light")) {
        zvezde[i].style.color = "white";
      } else {
        zvezde[i].style.color = "#333333";
      }
    }
  }
}
