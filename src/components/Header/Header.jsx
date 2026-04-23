 import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import img1 from "../../assets/logo.jpg";
import { FaSearch, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import "./header.css";

export default function HeaderPage({ products = [] }) {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef();

  // 🔍 Filter products
  const filterProducts = (q) => {
    const filtered = products.filter((p) =>
      p.title.toLowerCase().includes(q.toLowerCase())
    );

    setResults(q ? filtered.slice(0, 5) : []);
  };

  const handleSearch = (value) => {
    setQuery(value);
    filterProducts(value);
  };

  // ✅ Search button click
  const handleSubmitSearch = () => {
    if (!query.trim()) return;

    const matchedProduct = products.find((p) =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );

    if (matchedProduct) {
      navigate(`/product/${matchedProduct.id}`);
      setQuery("");
      setResults([]);
    }
  };

  // ❌ close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setResults([]);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className='top_header'>
      <div className='container'>

        {/* LOGO */}
        <Link to="/">
          <img className='logo' src={img1} alt="Logo" />
        </Link>

        {/* SEARCH */}
        <div className="search_box" ref={searchRef}>
          <input
            type='text'
            name='search'
            placeholder='Search for Product'
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitSearch();
              }
            }}
          />

          <button type="button" onClick={handleSubmitSearch}>
            <FaSearch />
          </button>

          {/* RESULTS */}
          {results.length > 0 && (
            <ul className="search_results">
              {results.map((item) => (
                <li
                  key={item.id}
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                    setQuery("");
                    setResults([]);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ICONS */}
        <div className='header_icons'>
          <div className='icon'>
            <FaRegHeart />
            <span className='count'>0</span>
          </div>

          <div className='icon'>
            <FaShoppingCart />
            <span className='count'>0</span>
          </div>
        </div>

      </div>
    </div>
  )
}