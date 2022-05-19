import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import StripeCheckout from "react-stripe-checkout";

const CardDiv = () => {

  const [product, setProduct] = useState({
    name: "Delivery",
    price: 20,
    productBy: "Dominos",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };
    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div className="div">
        <Card bg="light" border="primary" style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80"
          />
          <Card.Body>
            <Card.Title>Paras Guglani</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>Sector 36 - sector 14</ListGroup.Item>
              <ListGroup.Item>Products: rice,lays,wheat</ListGroup.Item>
              <ListGroup.Item>UID: 20125454</ListGroup.Item>
              <ListGroup.Item>Commision: Rs 20 </ListGroup.Item>
            </ListGroup>
            <div className="buttons">
              {/* <Button className="button mr-8" variant="success">
                Pay Now
              </Button> */}

              <StripeCheckout
                stripeKey={process.env.REACT_APP_KEY}
                token={makePayment}
                name="Pay now"
                amount={product.price * 100}
                shippingAddress
                billingAddress
              >
                <Button className="btn-large mr-8" variant="success">
                  Pay {product.price} Rs
                </Button>
              </StripeCheckout>
              <Button className="button" variant="primary">
                Track
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default CardDiv;
