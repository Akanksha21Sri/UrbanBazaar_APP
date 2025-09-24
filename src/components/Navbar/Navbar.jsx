import { useState, useEffect } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const NavBar = ({ user, setUser }) => {
  const { cartList } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUser(null); // immediately update NavBar
    toast.info("Logged out successfully!");
  };


  // fixed Header
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) {
        setIsFixed(true);
      } else if (window.scrollY <= 50) {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);

    // cleanup when component unmounts
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);
  
  return (
    <Navbar
      fixed="top"
      expand="md"
      className={isFixed ? "navbar fixed" : "navbar"}
    >
      <Container className="navbar-container">
        <Navbar.Brand to="/">
          <ion-icon name="bag"></ion-icon>
          <h1 className="logo">UrbanBazaar</h1>
        </Navbar.Brand>
        {/* Media cart and toggle */}
        <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            onClick={() => {
              setExpand(expand ? false : "expanded");
            }}
        >
            <span></span>
            <span></span>
            <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Item>
              <Link
                aria-label="Go to Home Page"
                className="navbar-link"
                to="/"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Home</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Shop Page"
                className="navbar-link"
                to="/shop"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Shop</span>
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Link
                aria-label="Go to Cart Page"
                className="navbar-link"
                to="/cart"
                onClick={() => setExpand(false)}
              >
                <span className="nav-link-label">Cart</span>
              </Link>
            </Nav.Item>

            <Nav.Item className="expanded-cart">
              <Dropdown align="end">
                <Dropdown.Toggle
                  as="span"  // makes your icon act as the toggle
                  bsPrefix="custom-toggle"   // removes default caret
                  variant="link"
                  id="profile-dropdown"
                  className="p-0 border-0"
                >
                  <i className="bi bi-person-fill nav-icon"></i>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {user ? (
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  ) : (
                    <>
                      <Dropdown.Item as={Link} to="/login">Login</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/register">Register</Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>

              <Link
                aria-label="Go to Cart Page"
                to="/cart"
                className="cart"
                data-num={cartList.length}
              >
                <i class="bi bi-cart-fill nav-icon"></i>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                aria-label="Go to Wishlist Page"
                className="navbar-link"
                to="/wishlist"
                onClick={() => setExpand(false)}
              >
                <i className="bi bi-heart nav-icon wishlist-icon" ></i>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
