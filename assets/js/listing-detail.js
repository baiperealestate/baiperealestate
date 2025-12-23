const params = new URLSearchParams(window.location.search);
const listingId = params.get('id');

fetch('data/listings.json')
  .then(res => res.json())
  .then(listings => {
    const listing = listings.find(item => item.id === listingId);

    if (!listing) return;

    document.getElementById('title').textContent = listing.title;
    document.getElementById('price').textContent = listing.price;
    document.getElementById('location').textContent = listing.location;
    document.getElementById('description').textContent = listing.description;
    document.getElementById('bedrooms').textContent = listing.bedrooms;
    document.getElementById('bathrooms').textContent = listing.bathrooms;
    document.getElementById('size').textContent = listing.size;

    const gallery = document.getElementById('gallery');
    listing.images.forEach(img => {
      const image = document.createElement('img');
      image.src = img;
      gallery.appendChild(image);
    });
  });
