import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../app/features/cart/cartSlice";
import { toggleWishlist } from "../app/features/cart/wishlistSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handelAdd = (productItem) => {
      dispatch(addToCart({ product: productItem, num: 1 }));
      toast.success("Product has been added to cart!");
    };

    const handleToggleWishlist = (productItem) => {
      dispatch(toggleWishlist(productItem));
      toast.info("Removed from wishlist!");
    };

  return (
    <section className="wishlist-page py-5">
      <Container>
        <h2 className="mb-4 text-center">My Wishlist ❤️</h2>

        {wishlist.length === 0 ? (
          <div className="text-center p-5">
            <h4 className="text-muted">No items in your wishlist</h4>
            <p className="text-muted">Browse products and add some favorites!</p>
          </div>
        ) : (
          <Row>
            {wishlist.map((item, index) => (
              <Col md={4} sm={6} xs={12} key={item.id} className="mb-4">
                <div className="card" key={index} style={{ width: "18rem" }}>
                    <i
                    className="bi bi-heart-fill text-danger"
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      fontSize: "1.5rem",
                      cursor: "pointer",
                    }}
                    onClick={() => handleToggleWishlist(item)}
                  ></i>
                  <img
                    // variant="top"
                    src={item.imgUrl}
                    alt={item.productName}
                    style={{ height: "200px", objectFit: "contain", cursor: "pointer"}}
                    onClick={() => navigate(`/shop/${item.id}`)}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.productName}</h5>
                    <p className="card-text">₹{item.price}</p>
                    <button className="btn btn-dark" onClick={() => handelAdd(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  );
};

export default Wishlist;
