import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);

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
                  <img
                    // variant="top"
                    src={item.image}
                    alt={item.name}
                    style={{ height: "200px", objectFit: "contain" }}
                  />
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">₹{item.price}</p>
                    <button className="btn btn-dark" onClick={() => addToCart(item)}>
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
