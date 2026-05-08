import React, { useState } from 'react';
import InvoiceForm from './components/InvoiceForm';
import InvoicePreview from './components/InvoicePreview';
import './styles/app.css';

function App() {
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: '001',
    invoiceDate: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    business: {
      name: 'SCHOOL BIO',
      address: 'Ambazari, Aurangpore, Post Haslur-3',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560082',
      phone: '9876543210',
      gstin: '29AAWCT0001H1Z0',
      stateCode: '29'
    },
    customer: {
      name: 'Customer Name',
      address: 'Customer Address',
      city: 'City',
      state: 'State',
      pincode: '000000',
      gstin: 'GSTIN'
    },
    shippingAddress: {
      name: 'Shipping Name',
      address: 'Shipping Address',
      city: 'City',
      state: 'State',
      pincode: '000000'
    },
    lineItems: [
      {
        sNo: 1,
        description: 'Product/Service Description',
        hsn: '1234567890',
        qty: 1,
        unit: 'Units',
        rate: 1000,
        amount: 1000
      }
    ],
    taxes: {
      cgstRate: 2.5,
      sgstRate: 2.5
    },
    bankDetails: {
      accountName: 'Account Name',
      accountNumber: 'Account Number',
      ifsc: 'IFSC Code',
      branch: 'Branch Name'
    }
  });

  const handleInvoiceDataChange = (newData) => {
    setInvoiceData(newData);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📄 Invoice Generator</h1>
        <p>Create professional GST invoices with automatic calculations</p>
      </header>

      <div className="app-container">
        <div className="form-section">
          <InvoiceForm 
            invoiceData={invoiceData} 
            onDataChange={handleInvoiceDataChange}
          />
        </div>

        <div className="preview-section">
          <InvoicePreview invoiceData={invoiceData} />
        </div>
      </div>

      <footer className="app-footer">
        <p>&copy; 2026 Invoice Generator. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
