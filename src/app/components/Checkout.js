'use client'
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import OrderConfirmation from "./OrderConfirmation";
import OrderDetails from "./OrderDetails";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Checkout.css";

export default function Checkout({ order }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  // If the form is submitted, show the order confirmation instead of the checkout form
  if (isSubmitted) {
    return <OrderConfirmation order={order} />;
  }

  return (
    <Container className="checkout-container">
      <Row className="checkout-row">
        <Col md={6} className="checkout-col">
          <h2>Payment Information</h2>
          <div className="payment-header">
            <Form.Group className="form-group card-number" controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control type="text" name="cardNumber" placeholder="1234 5678 9012 3456" />
            </Form.Group>
            <Button variant="outline-primary" className="saved-card-btn" href="/payment">
              Use Saved Card
            </Button>
          </div>

          <Form onSubmit={handleSubmit} className="payment-form">
            <div className="name-row">
              <Form.Group className="form-group" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="John" />
              </Form.Group>
              <Form.Group className="form-group" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Doe" />
              </Form.Group>
            </div>

            <div className="exp-cvv-row">
              <Form.Group className="form-group" controlId="formExpirationDate">
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control type="text" name="expirationDate" placeholder="MM/YY" />
              </Form.Group>
              <Form.Group className="form-group" controlId="formCVV">
                <Form.Label>CVV</Form.Label>
                <Form.Control type="text" name="cvv" placeholder="123" />
              </Form.Group>
            </div>

            <hr className="divider" />

            <Form.Group className="form-group" controlId="formBillingAddress">
              <Form.Label>Billing Address</Form.Label>
              <Form.Control type="text" name="billingAddress" placeholder="123 Main St" />
            </Form.Group>

            <Form.Group className="form-group" controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" name="zipCode" placeholder="12345" />
            </Form.Group>

            <div className="promo-row">
              <Form.Group className="form-group promo-group" controlId="formPromoCode">
                <Form.Label>Promo Code</Form.Label>
                <Form.Control type="text" name="promoCode" placeholder="Enter promo code" />
              </Form.Group>
              <Button variant="outline-primary" className="apply-btn">Apply</Button>
            </div>

            <div className="button-row">
              {/*<Button variant="outline-primary" href="/order-summary" className="back-btn">Back</Button>*/}
              <Button variant="primary" type="submit" className="checkout-btn">Checkout</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
