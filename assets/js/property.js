// start of Search Function
function filterProperties() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const propertyCards = document.querySelectorAll(".property-card");

  // If search term is found, display the card; otherwise, hide it
  propertyCards.forEach((card) => {
    const title = card.querySelector(".title").textContent.toLowerCase();

    if (title.includes(searchValue)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });
}
// end of Search Function

// Ajax
let myJson = new XMLHttpRequest();
myJson.open("GET", "../assets/js/properties.json");
myJson.send();

let data = document.getElementById("data");

myJson.onreadystatechange = function () {
  if (myJson.readyState === 4 && myJson.status === 200) {
    let mainData = JSON.parse(myJson.responseText);

    for (let i = 0; i < mainData.length; i++) {
      let div = document.createElement("div");
      div.className = "property-card";
      div.innerHTML = `
          <img src="${mainData[i].image}">
          <span class="tag">Featured</span>
          <span class="tag sale">${mainData[i].sale}</span>
          <div class="propertiesDetails">
            <div class="propData">
              <p class="price">${mainData[i].price}</p>
              <p class="type">${mainData[i].type}</p>
              <p class="title">${mainData[i].title}</p>
              <p class="details">${mainData[i].details}</p>
            </div>
            <a href="../../pages/propDetails.html">
                <button class="moreDetails" data-id="${mainData[i].id}">More Details</button>
            </a>
          </div>
          <div class="agent">
            <div class="buyer-details">
              <img src="${mainData[i].buyerImage}" alt="Agent">
              <span>${mainData[i].buyerName}</span>
            </div>
            <span>${mainData[i].time}</span>
          </div>
        `;
      data.append(div);
    }

    // Add event listener moreDetails buttons
    let detailsBtns = document.querySelectorAll(".moreDetails");
    detailsBtns.forEach((btn) => {
      btn.onclick = function () {
        // Save the ID to local storage to use it in property details page
        let propertyId = btn.getAttribute("data-id");
        localStorage.setItem("propID", propertyId);
      };
    });
  }
};
