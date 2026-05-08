import React from 'react';
import LineItems from './LineItems';
import TaxCalculations from './TaxCalculations';
import BankDetails from './BankDetails';

function InvoiceForm({ invoiceData, onDataChange }) {
  const handleBusinessChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...invoiceData,
      business: { ...invoiceData.business, [name]: value }
    });
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...invoiceData,
      customer: { ...invoiceData.customer, [name]: value }
    });
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...invoiceData,
      shippingAddress: { ...invoiceData.shippingAddress, [name]: value }
    });
  };

  const handleInvoiceDetailsChange = (e) => {
    const { name, value } = e.target;
    onDataChange({
      ...invoiceData,
      [name]: value
    });
  };

  const handleLineItemsChange = (newItems) => {
    onDataChange({
      ...invoiceData,
      lineItems: newItems
    });
  };

  const handleTaxRatesChange = (cgstRate, sgstRate) => {
    onDataChange({
      ...invoiceData,
      taxes: { cgstRate, sgstRate }
    });
  };

  const handleBankDetailsChange = (newBankDetails) => {
    onDataChange({
      ...invoiceData,
      bankDetails: newBankDetails
    });
  };

  return (
    <form>
      {/* Invoice Details */}
      <div className="section">
        <h3>Invoice Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="invoiceNumber">Invoice Number</label>
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              className="input-small"
              value={invoiceData.invoiceNumber}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="invoiceDate">Invoice Date</label>
            <input
              type="date"
              id="invoiceDate"
              name="invoiceDate"
              className="input-small"
              value={invoiceData.invoiceDate}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              className="input-small"
              value={invoiceData.dueDate}
              onChange={handleInvoiceDetailsChange}
            />
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="section">
        <h3>Business Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="name"
              className="input-medium"
              value={invoiceData.business.name}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessGSTIN">GSTIN/UIN</label>
            <input
              type="text"
              id="businessGSTIN"
              name="gstin"
              className="input-medium"
              value={invoiceData.business.gstin}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="stateCode">State Code</label>
            <input
              type="text"
              id="stateCode"
              name="stateCode"
              className="input-small"
              value={invoiceData.business.stateCode}
              onChange={handleBusinessChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="businessAddress">Address</label>
          <textarea
            id="businessAddress"
            name="address"
            className="input-full"
            value={invoiceData.business.address}
            onChange={handleBusinessChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="businessCity">City</label>
            <input
              type="text"
              id="businessCity"
              name="city"
              className="input-small"
              value={invoiceData.business.city}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessState">State</label>
            <input
              type="text"
              id="businessState"
              name="state"
              className="input-small"
              value={invoiceData.business.state}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessPincode">Pincode</label>
            <input
              type="text"
              id="businessPincode"
              name="pincode"
              className="input-small"
              value={invoiceData.business.pincode}
              onChange={handleBusinessChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="businessPhone">Phone</label>
            <input
              type="tel"
              id="businessPhone"
              name="phone"
              className="input-small"
              value={invoiceData.business.phone}
              onChange={handleBusinessChange}
            />
          </div>
        </div>
      </div>

      {/* Customer Information */}
      <div className="section">
        <h3>Bill To (Customer Information)</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              name="name"
              className="input-medium"
              value={invoiceData.customer.name}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerGSTIN">GSTIN</label>
            <input
              type="text"
              id="customerGSTIN"
              name="gstin"
              className="input-medium"
              value={invoiceData.customer.gstin}
              onChange={handleCustomerChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="customerAddress">Address</label>
          <textarea
            id="customerAddress"
            name="address"
            className="input-full"
            value={invoiceData.customer.address}
            onChange={handleCustomerChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="customerCity">City</label>
            <input
              type="text"
              id="customerCity"
              name="city"
              className="input-small"
              value={invoiceData.customer.city}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerState">State</label>
            <input
              type="text"
              id="customerState"
              name="state"
              className="input-small"
              value={invoiceData.customer.state}
              onChange={handleCustomerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="customerPincode">Pincode</label>
            <input
              type="text"
              id="customerPincode"
              name="pincode"
              className="input-small"
              value={invoiceData.customer.pincode}
              onChange={handleCustomerChange}
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="section">
        <h3>Ship To (Shipping Address)</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="shippingName">Recipient Name</label>
            <input
              type="text"
              id="shippingName"
              name="name"
              className="input-medium"
              value={invoiceData.shippingAddress.name}
              onChange={handleShippingChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="shippingAddress">Address</label>
          <textarea
            id="shippingAddress"
            name="address"
            className="input-full"
            value={invoiceData.shippingAddress.address}
            onChange={handleShippingChange}
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="shippingCity">City</label>
            <input
              type="text"
              id="shippingCity"
              name="city"
              className="input-small"
              value={invoiceData.shippingAddress.city}
              onChange={handleShippingChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingState">State</label>
            <input
              type="text"
              id="shippingState"
              name="state"
              className="input-small"
              value={invoiceData.shippingAddress.state}
              onChange={handleShippingChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="shippingPincode">Pincode</label>
            <input
              type="text"
              id="shippingPincode"
              name="pincode"
              className="input-small"
              value={invoiceData.shippingAddress.pincode}
              onChange={handleShippingChange}
            />
          </div>
        </div>
      </div>

      {/* Line Items */}
      <LineItems 
        items={invoiceData.lineItems}
        onItemsChange={handleLineItemsChange}
      />

      {/* Tax Rates */}
      <TaxCalculations
        taxes={invoiceData.taxes}
        lineItems={invoiceData.lineItems}
        onTaxRatesChange={handleTaxRatesChange}
      />

      {/* Bank Details */}
      <BankDetails
        bankDetails={invoiceData.bankDetails}
        onBankDetailsChange={handleBankDetailsChange}
      />
    </form>
  );
}

export default InvoiceForm;
