import React from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

class PurchaseData extends React.Component {

  state = {
    cardNumber: '',
    cardName: '',
    expireDate: '',
    cvv: ''
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault()
    const {cardNumber, cardName, expireDate, cvv} = this.state
    this.props.onPay({cardNumber, cardName, expireDate, cvv})
  }

  handleCancel = e => {
      e.preventDefault()
      this.props.onCancel()
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label for="cardNumber">Card number</label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              placeholder="Card number"
              onChange={this.handleChange}
              value={this.state.cardNumber}
            />
          </div>
          <div className="form-group">
            <label for="cardName">Card name</label>
            <input
              type="text"
              name="cardName"
              id="cardName"
              placeholder="Card name"
              onChange={this.handleChange}
              value={this.state.cardName}
            />
          </div>
          <div className="form-group">
            <label for="expireDate">Expire date</label>
            <input
              type="text"
              name="expireDate"
              id="expireDate"
              placeholder="Expire date"
              onChange={this.handleChange}
              value={this.state.expireDate}
            />
          </div>
          <div className="form-group">
            <label for="cvv">cvv</label>
            <input
              type="text"
              name="cvv"
              id="cvv"
              placeholder="cvv"
              onChange={this.handleChange}
              value={this.state.cvv}
            />
          </div>
          <button block color="primary" onClick={handleSubmit}>
            Pay
          </button>
          <button block color="secondary" onClick={handleCancel}>
            Back to cart
          </button>

        </form>
      </div>
    );
  }
}

export default PurchaseData