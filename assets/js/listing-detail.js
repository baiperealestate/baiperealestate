<main class="property-page">

  <section class="gallery">
    <button id="prevBtn">‹</button>
    <img id="mainImage">
    <button id="nextBtn">›</button>
  </section>

  <section class="property-content">
    <h1 id="propertyTitle"></h1>
    <p id="propertyDescription"></p>

    <h2>Property Features</h2>
    <ul id="featuresList"></ul>
  </section>

  <section class="contact-box">
    <h3>Request Information</h3>
    <form action="https://formspree.io/f/xzdpvjnk" method="POST">
      <input type="text" name="name" placeholder="Full Name" required>
      <input type="email" name="email" placeholder="Email Address" required>
      <input type="tel" name="phone" placeholder="Phone / WhatsApp" required>
      <textarea name="message">I'm interested in this property</textarea>
      <button type="submit">Contact Agent</button>
    </form>
  </section>

</main>

<script src="assets/js/listing-details.js"></script>
