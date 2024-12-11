// Ajax
let myJson = new XMLHttpRequest();
myJson.open("GET", "../assets/js/properties.json");
myJson.send();

let data = document.getElementById("data");

myJson.onreadystatechange = function () {
  if (myJson.readyState === 4 && myJson.status === 200) {
    let mainData = JSON.parse(myJson.responseText);
    for (let i = 0; i < mainData.length; i++) {
      if (mainData[i].id == localStorage.getItem("propID")) {
        let imageSection = document.getElementById("image-section");
        let price = document.getElementById("propPrice");
        price.innerHTML = `<p>${mainData[i].price}</p>`;
        document.getElementById("propTitle").innerHTML = `${mainData[i].title}`;
        imageSection.innerHTML = `<div class="main-image">
                <img src="${mainData[i].image}" alt="Main Property Image">
            </div>
            <div class="thumbnail-images">
                <img src="${mainData[i].image}" alt="Thumbnail 1">
                <img src="${mainData[i].image}" alt="Thumbnail 2">
                <img src="${mainData[i].image}" alt="Thumbnail 3">
                <img src="${mainData[i].image}" alt="Thumbnail 4">
                <img src="${mainData[i].image}" alt="Thumbnail 5">
                <img src="${mainData[i].image}" alt="Thumbnail 6">
            </div>`;
      }
    }
  }
};
