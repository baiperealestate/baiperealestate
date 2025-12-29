fetch("data/listings.json")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("listings");

    data.forEach(item => {
      container.innerHTML += `
        <div class="listing-card">
          <img src="${item.images[0]}" alt="${item.title}">
          <div class="listing-info">
            <h3>${item.title}</h3>
            <p class="price">${item.price}</p>
            <p>${item.location}</p>
            <a href="listing.html?id=${item.id}" class="btn">View Details</a>
          </div>
        </div>
      `;
    });
  });
