import React, { useRef } from 'react';
import { calculateTaxes, amountInWords } from '../utils/taxCalculator';
import '../styles/invoice.css';

function InvoicePreview({ invoiceData }) {
  const invoiceRef = useRef(null);

  const subtotal = invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0);
  const taxDetails = calculateTaxes(subtotal, invoiceData.taxes.cgstRate, invoiceData.taxes.sgstRate);
  const grandTotal = taxDetails.grandTotal;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;
    const opt = {
      margin: 10,
      filename: `invoice-${invoiceData.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
    };
    
    // Using html2pdf library if available, otherwise just print
    if (window.html2pdf) {
      window.html2pdf().set(opt).from(element).save();
    } else {
      alert('PDF export requires html2pdf library. Using print instead.');
      handlePrint();
    }
  };

  return (
    <div>
      <div className="preview-actions">
        <button type="button" className="btn btn-primary" onClick={handlePrint}>
          🖨️ Print Invoice
        </button>
        <button type="button" className="btn btn-secondary" onClick={handleDownloadPDF}>
          📥 Download PDF
        </button>
      </div>

      <div ref={invoiceRef} className="invoice-container">
        {/* Header Section */}
        <div className="invoice-header">
          <div className="header-left">
            <h2 className="business-name">{invoiceData.business.name}</h2>
            <p>{invoiceData.business.address}</p>
            <p>
              {invoiceData.business.city}, {invoiceData.business.state} {invoiceData.business.pincode}
            </p>
            <p>Phone: {invoiceData.business.phone}</p>
            <p>GSTIN/UIN: {invoiceData.business.gstin}</p>
            <p>State Code: {invoiceData.business.stateCode}</p>
          </div>
          <div className="header-right">
            <div className="invoice-type">
              <h3>TAX INVOICE (ORIGINAL FOR RECIPIENT)</h3>
            </div>
            <div className="invoice-details-box">
              <div className="detail-item">
                <span className="label">Invoice Number:</span>
                <span className="value">{invoiceData.invoiceNumber}</span>
              </div>
              <div className="detail-item">
                <span className="label">Invoice Date:</span>
                <span className="value">{invoiceData.invoiceDate}</span>
              </div>
              <div className="detail-item">
                <span className="label">Due Date:</span>
                <span className="value">{invoiceData.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer and Shipping Info */}
        <div className="invoice-addresses">
          <div className="address-section">
            <h4>Bill To:</h4>
            <p className="customer-name">{invoiceData.customer.name}</p>
            <p>{invoiceData.customer.address}</p>
            <p>
              {invoiceData.customer.city}, {invoiceData.customer.state} {invoiceData.customer.pincode}
            </p>
            {invoiceData.customer.gstin && <p>GSTIN: {invoiceData.customer.gstin}</p>}
          </div>
          <div className="address-section">
            <h4>Ship To:</h4>
            <p className="customer-name">{invoiceData.shippingAddress.name}</p>
            <p>{invoiceData.shippingAddress.address}</p>
            <p>
              {invoiceData.shippingAddress.city}, {invoiceData.shippingAddress.state} {invoiceData.shippingAddress.pincode}
            </p>
          </div>
        </div>

        {/* Line Items Table */}
        <table className="invoice-items-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Description of goods</th>
              <th>HSC/SAC</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.lineItems.map((item, index) => (
              <tr key={index}>
                <td>{item.sNo}</td>
                <td>{item.description}</td>
                <td>{item.hsn}</td>
                <td>{item.qty}</td>
                <td>{item.unit}</td>
                <td>₹ {item.rate.toFixed(2)}</td>
                <td>₹ {item.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tax and Total Section */}
        <div className="invoice-totals">
          <div className="totals-left">
            <div className="totals-section">
              <h4>Tax Summary</h4>
              <table className="tax-summary-table">
                <thead>
                  <tr>
                    <th>Tax Type</th>
                    <th>Rate (%)</th>
                    <th>Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>CGST</td>
                    <td>{invoiceData.taxes.cgstRate.toFixed(2)}</td>
                    <td>{taxDetails.cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td>SGST</td>
                    <td>{invoiceData.taxes.sgstRate.toFixed(2)}</td>
                    <td>{taxDetails.sgst.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bank-details-display">
              <h4>Bank Details for Payment</h4>
              <p><strong>A/C Holder's Name:</strong> {invoiceData.bankDetails.accountName}</p>
              <p><strong>Bank Account:</strong> {invoiceData.bankDetails.accountNumber}</p>
              <p><strong>IFSC Code:</strong> {invoiceData.bankDetails.ifsc}</p>
              <p><strong>Branch:</strong> {invoiceData.bankDetails.branch}</p>
            </div>
          </div>

          <div className="totals-right">
            <div className="total-amount-box">
              <table className="amounts-table">
                <tbody>
                  <tr>
                    <td className="label">Subtotal</td>
                    <td className="amount">₹ {subtotal.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="label">CGST ({invoiceData.taxes.cgstRate}%)</td>
                    <td className="amount">₹ {taxDetails.cgst.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td className="label">SGST ({invoiceData.taxes.sgstRate}%)</td>
                    <td className="amount">₹ {taxDetails.sgst.toFixed(2)}</td>
                  </tr>
                  <tr className="grand-total-row">
                    <td className="label">TOTAL</td>
                    <td className="amount">₹ {grandTotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="amount-in-words-display">
              <p><strong>Amount in Words:</strong></p>
              <p className="words-text">{amountInWords(grandTotal)}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="invoice-footer">
          <p className="authorized-signatory">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}

export default InvoicePreview;
