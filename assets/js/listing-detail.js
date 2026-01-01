const gallery = document.getElementById('imageGallery');

gallery.innerHTML = `
  <div class="slider">
    <button id="prev">‹</button>
    <img id="sliderImg" src="${property.images[0]}">
    <button id="next">›</button>
  </div>
`;

let index = 0;
const img = document.getElementById('sliderImg');

document.getElementById('next').onclick = () => {
  index = (index + 1) % property.images.length;
  img.src = property.images[index];
};

document.getElementById('prev').onclick = () => {
  index = (index - 1 + property.images.length) % property.images.length;
  img.src = property.images[index];
};
