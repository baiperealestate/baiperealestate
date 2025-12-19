fetch('data/listings.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('listings');
    data.forEach(property => {
      container.innerHTML += `
        <div class="property-card">
          <h3>${property.title}</h3>
          <p>${property.location}</p>
          <strong>${property.price}</strong>
          <a href="listing.html?id=${property.id}">View Details</a>
        </div>
      `;
    });
  });

