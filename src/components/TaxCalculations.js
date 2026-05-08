import React from 'react';
import { calculateTaxes, amountInWords } from '../utils/taxCalculator';

function TaxCalculations({ taxes, lineItems, onTaxRatesChange }) {
  const handleTaxRateChange = (e) => {
    const { name, value } = e.target;
    const rate = parseFloat(value) || 0;
    
    if (name === 'cgstRate') {
      onTaxRatesChange(rate, taxes.sgstRate);
    } else {
      onTaxRatesChange(taxes.cgstRate, rate);
    }
  };

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxDetails = calculateTaxes(subtotal, taxes.cgstRate, taxes.sgstRate);
  const grandTotal = taxDetails.grandTotal;
  const amountWords = amountInWords(grandTotal);

  return (
    <div className="section tax-calculations-section">
      <h3>Tax Rates & Calculations</h3>
      
      <div className="tax-rates-section">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="cgstRate">CGST Rate (%)</label>
            <input
              type="number"
              id="cgstRate"
              name="cgstRate"
              className="input-small"
              value={taxes.cgstRate}
              onChange={handleTaxRateChange}
              step="0.01"
              min="0"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sgstRate">SGST Rate (%)</label>
            <input
              type="number"
              id="sgstRate"
              name="sgstRate"
              className="input-small"
              value={taxes.sgstRate}
              onChange={handleTaxRateChange}
              step="0.01"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Tax Summary Table */}
      <div className="tax-table-wrapper">
        <table className="tax-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount (₹)</th>
              <th>Rate (%)</th>
              <th>Tax (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>CGST (Central GST)</td>
              <td>{subtotal.toFixed(2)}</td>
              <td>{taxes.cgstRate.toFixed(2)}</td>
              <td>{taxDetails.cgst.toFixed(2)}</td>
            </tr>
            <tr>
              <td>SGST (State GST)</td>
              <td>{subtotal.toFixed(2)}</td>
              <td>{taxes.sgstRate.toFixed(2)}</td>
              <td>{taxDetails.sgst.toFixed(2)}</td>
            </tr>
            <tr className="total-tax-row">
              <td>Total Tax</td>
              <td>-</td>
              <td>{(taxes.cgstRate + taxes.sgstRate).toFixed(2)}</td>
              <td>₹ {taxDetails.totalTax.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Totals Summary */}
      <div className="totals-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>₹ {subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>CGST ({taxes.cgstRate}%):</span>
          <span>₹ {taxDetails.cgst.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>SGST ({taxes.sgstRate}%):</span>
          <span>₹ {taxDetails.sgst.toFixed(2)}</span>
        </div>
        <div className="summary-row grand-total">
          <span>Grand Total:</span>
          <span>₹ {grandTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Amount in Words */}
      <div className="amount-in-words">
        <strong>Amount in Words:</strong> {amountWords}
      </div>
    </div>
  );
}

export default TaxCalculations;
