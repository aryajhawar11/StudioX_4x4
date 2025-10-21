import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages (we will create these next)
import HomePage from './pages/HomePage';
import VehicleProductsPage from './pages/VehicleProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';

// Import layout components (we will create these too)
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import global styles
import './index.css'; 
// Import carousel styles
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main className='pt-35'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/vehicles/:vehicleId" element={<VehicleProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          {/* You can add a /contact route later if you want a separate page */}
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;