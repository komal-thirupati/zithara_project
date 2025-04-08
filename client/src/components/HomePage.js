import React, { useContext, useEffect, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import "../styles/Homepage.css";

const HomePage = () => {
    const {
        products,
        products1,
        searchTerm,
        setSearchTerm,
        handleSearch,
        handleImageUpload,
    } = useContext(ProductContext);

    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(true);

    useEffect(() => {
        // Create floating background elements
        const container = document.querySelector('.floating-bg');
        for (let i = 0; i < 20; i++) {
            const element = document.createElement('div');
            element.className = 'floating-bg-element';
            element.style.width = `${Math.random() * 30 + 10}px`;
            element.style.height = element.style.width;
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(element);
        }

        // Hide tooltip after delay
        const timer = setTimeout(() => setShowTooltip(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    const handleProductClick = (product) => {
        navigate(`/productdetails`, { state: { product } });
    };

    return (
        <div className="home-page">
            <LogoutButton />
            <div className="floating-bg"></div>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for jewellery..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <label htmlFor="image-upload" className="camera-icon">
                        Upload
                    </label>
                    <input
                        type="file"
                        id="image-upload"
                        style={{ display: 'none' }}
                        onChange={handleImageUpload}
                    />
                    {showTooltip && (
                        <div className="tooltip">
                            Upload Image
                            <div className="diamond"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="categories">
                {(!products1 || products1.length === 0) ? (
                    ['Necklace', 'Earrings', 'Bracelets', 'Rings', 'Wristwatch'].map((category, index) => (
                        <div key={index} className="category-slider">
                            <h2>{category}</h2>
                            <div className="slider">
                                {products
                                    .filter((product) => product.product_sub1_type?.toLowerCase() === category.toLowerCase())
                                    .filter((product, index) => !(category.toLowerCase() === 'necklace' && index === 0))
                                    .map((product) => (
                                        <ProductCard
                                            key={product.product_id}
                                            product={product}
                                            onClick={() => handleProductClick(product)}
                                        />
                                    ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="category-slider">
                        <h2>Search Results</h2>
                        <div className="slider">
                            {products1.map((product) => (
                                <ProductCard
                                    key={product.product_id}
                                    product={product}
                                    onClick={() => handleProductClick(product)}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
