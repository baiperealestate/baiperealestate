.listing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
}

.listing-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden; 
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.listing-card:hover {
  transform: translateY(-5px);
}

.listing-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.listing-info {
  padding: 16px;
}

.listing-info h3 {
  font-size: 18px;
  margin-bottom: 8px;
}

.price {
  font-weight: bold;
  color: #b1975a; /* luxury gold */
}

.location {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
}

.view-btn {
  display: inline-block;
  padding: 10px 16px;
  background: #000;
  color: #fff;
  text-decoration: none;
  border-radius: 6px;
}

