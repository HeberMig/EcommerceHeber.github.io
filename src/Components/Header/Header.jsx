import { NavLink } from "react-router-dom";
import { useAuthContext } from "@/Hook/useAuthContext";
import { useContext } from "react";
import { SearchContext } from "../../Context/SearchContext";
import Categories from "../Categories";
import "./header.scss";

const Header = () => {
  const { logout, isAuth, isAdmin } = useAuthContext();
  const { setSearchQuery } = useContext(SearchContext);
  // const { cart } = useCart();

  console.log("isAdmin:", isAdmin);

  const linkIsActive = (isActive) =>
    isActive
      ? "header__item-link header__item-link--is-active"
      : "header__item-link";

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    // BEM PARA NUESTRAS CLASES EN HTML
    // kebabcase para nombrar nuestras className en React con minúsculas
    <nav className="header">
      {" "}
      {/*  BLOQUE */}
      <NavLink className="header__logo" to="/">
        🏪
      </NavLink>

    {/*render cat */}
      <Categories/>

      <div className="header__center">
        <input
          type="text"
          placeholder="Buscas algo"
          onChange={handleSearch}
          className="header__search-bar"
        />
      </div>
      <ul className="header__nav-list">
        <li className="header__list-item">
          <NavLink className={({ isActive }) => linkIsActive(isActive)} to="/">
            Home
          </NavLink>
        </li>
        <li className="header__list-item">
          <NavLink
            className={({ isActive }) => linkIsActive(isActive)}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>

        {isAdmin && (
          <li className="header__list-item">
            <NavLink
              className={({ isActive }) => linkIsActive(isActive)}
              to="/create-product"
            >
              Create Product
            </NavLink>
          </li>
        )}

        {isAuth ? (
          <>
            <li className="header__list-item">
              <NavLink
                className={({ isActive }) => linkIsActive(isActive)}
                to="/secret"
              >
                Secret
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink className="header__item-link" onClick={logout}>
                Logout
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="header__list-item">
              <NavLink
                className={({ isActive }) => linkIsActive(isActive)}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li className="header__list-item">
              <NavLink
                className={({ isActive }) => linkIsActive(isActive)}
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
          </>
        )}
        
        <li className='header__carrito'>
                  <NavLink to="/" className="hader__list-item" 
                    onClick={() => console.log("Abrir carrito")}> 
                    <span className="carrito-icon">🛒</span>
                  </NavLink>
                </li> 
      </ul>
    </nav>
  );
};

export default Header;
