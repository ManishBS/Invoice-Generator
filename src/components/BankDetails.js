import React from 'react';

function BankDetails({ bankDetails, onBankDetailsChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onBankDetailsChange({
      ...bankDetails,
      [name]: value
    });
  };

  return (
    <div className="section bank-details-section">
      <h3>Bank Details for Payment</h3>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="accountName">Account Holder Name</label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            className="input-medium"
            value={bankDetails.accountName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="accountNumber">Account Number</label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            className="input-medium"
            value={bankDetails.accountNumber}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="ifsc">IFSC Code</label>
          <input
            type="text"
            id="ifsc"
            name="ifsc"
            className="input-medium"
            value={bankDetails.ifsc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="branch">Branch Name</label>
          <input
            type="text"
            id="branch"
            name="branch"
            className="input-medium"
            value={bankDetails.branch}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default BankDetails;
