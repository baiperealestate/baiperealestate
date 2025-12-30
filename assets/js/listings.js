const listingsContainer = document.getElementById("listings");

function displayListings(list) {
  listingsContainer.innerHTML = "";

  list.forEach(property => {
    listingsContainer.innerHTML += `
      <a href="listing.html?id=${property.id}" class="listing-card">
        <img src="${property.image}">
        <h3>${property.title}</h3>
        <p>${property.price}</p>
        <p>${property.location}</p>
      </a>
    `;
  });
}

displayListings(properties);
