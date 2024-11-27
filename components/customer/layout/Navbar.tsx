import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useCart, CartItem } from '../../../context/CartContext';
import './Navbar.css';

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { cart } = useCart();
  const itemsCount = cart.reduce((total: number, item: CartItem) => total + item.quantity, 0);
  const [searchValue, setSearchValue] = useState('');
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <Link to="/" className="logo">
            <span className="logo-text">Shopcart</span>
          </Link>

          <div className="nav-links">
           
         
          </div>

          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button className="search-button">
              <span className="material-icons">search</span>
            </button>
          </div>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-button">
            <span className="material-icons">shopping_cart</span>
            Cart
            {itemsCount > 0 && <span className="cart-count">{itemsCount}</span>}
          </Link>
          <div className="account-dropdown">
            <button className="account-button" onClick={toggleAccountDropdown}>
              <span className="material-icons">person</span>
              Account
            </button>
            {isAccountDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/orders" className="dropdown-item">
                  <span className="material-icons">receipt_long</span>
                  My Orders
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <span className="material-icons">settings</span>
                  Settings
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;