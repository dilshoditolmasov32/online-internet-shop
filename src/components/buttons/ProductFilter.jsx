import React from 'react';
import "../../styles/scss/theme/FilterButton.scss"

// Kichikroq filtrlash tugmasi komponenti
const FilterButton = ({ label, isActive, onClick }) => {
  return (
    <button
      className={`filter-button ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const ProductFilter = () => {
  const [activeFilter, setActiveFilter] = React.useState('Barchasi');

  return (
    <div className="product-filter-container">

      <div className="all-products-box">
        <div className="all-products-text">Barcha mahsulotlar</div>
        <div className="product-count">2 930 Mahsulot</div>
      </div>

      <div className="filter-buttons-group">
        <FilterButton
          label="Mahsus taklif"
          isActive={activeFilter === 'Mahsus taklif'}
          onClick={() => setActiveFilter('Mahsus taklif')}
        />
        <FilterButton
          label="Yangilik"
          isActive={activeFilter === 'Yangilik'}
          onClick={() => setActiveFilter('Yangilik')}
        />
        {/* 'Barchasi' tugmasi rasmda aktiv (to'q rangli) holatda */}
        <FilterButton
          label="Barchasi"
          isActive={activeFilter === 'Barchasi'}
          onClick={() => setActiveFilter('Barchasi')}
        />
      </div>
    </div>
  );
};

export default ProductFilter;