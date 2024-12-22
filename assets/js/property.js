// Start of filter

// Price Range function
priceRange.addEventListener("input", function () {
  const priceValue = document.getElementById("priceValue");
  priceValue.textContent = `$${this.value}`;
  applyAllFilters();
});

document.getElementById("search").addEventListener("input", applyAllFilters);
document.getElementById("status").addEventListener("change", applyAllFilters);
document.getElementById("type").addEventListener("change", applyAllFilters);

function applyAllFilters() {
  const priceRange = document.getElementById("priceRange");
  const searchValue = document.getElementById("search").value.toLowerCase();
  const statusValue = document.getElementById("status").value;
  const typeValue = document.getElementById("type").value;
  const propertyCards = document.querySelectorAll(".property-card");

  const selectedPrice = parseInt(priceRange.value, 10);

  propertyCards.forEach((card) => {
    const priceText = card.querySelector(".price").getAttribute("data-price");
    const cardPrice = parseInt(priceText, 10);
    const title = card.querySelector(".title").textContent.toLowerCase();
    const sellTag = card.querySelector(".Sell");
    const rentTag = card.querySelector(".Rent");
    const appartment = card.querySelector(".Appartment");
    const villa = card.querySelector(".Villa");
    const office = card.querySelector(".Office");

    // Check Filters
    const matchesPrice = cardPrice <= selectedPrice;
    const matchesSearch = title.includes(searchValue);
    const matchesStatus =
      statusValue === "all" ||
      (statusValue === "sell" && sellTag) ||
      (statusValue === "rent" && rentTag);
    const matchesType =
      typeValue === "all" ||
      (typeValue === "appartment" && appartment) ||
      (typeValue === "villa" && villa) ||
      (typeValue === "office" && office);

    // Show/Hide Card Based on All Filters
    if (matchesPrice && matchesSearch && matchesStatus && matchesType) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Function to Clear Filters
document.querySelector(".clear-filters").addEventListener("click", function () {
  // return Inputs to Default Values
  document.getElementById("status").value = "all";
  document.getElementById("type").value = "all";
  document.getElementById("priceRange").value = 20000;
  document.getElementById("priceValue").textContent = "$20000";
  document.getElementById("search").value = "";

  // display all cards
  const propertyCards = document.querySelectorAll(".property-card");
  propertyCards.forEach((card) => {
    card.style.display = "block";
  });
});
// End of filter

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
          <span class="tag sale ${mainData[i].sale}">For ${mainData[i].sale}</span>
          <div class="propertiesDetails">
            <div class="propData">
              <p class="price" data-price="${mainData[i].price}">$${mainData[i].price}/mo</p>
              <p class="type ${mainData[i].type}">${mainData[i].type}</p>
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
