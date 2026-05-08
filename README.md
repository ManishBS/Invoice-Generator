# Invoice Generator

A professional invoice generator application that creates GST-compliant invoices with detailed tax calculations.

## Features

- ✅ GST (CGST/SGST) tax calculations
- ✅ Itemized line items with HSN/SAC codes
- ✅ Professional invoice template
- ✅ Automatic total calculations (subtotal, tax, grand total)
- ✅ Amount in words conversion
- ✅ PDF export functionality
- ✅ Bank details and payment information
- ✅ Signature section
- ✅ Business and customer information sections

## Invoice Components

### Business Information
- Business name, address, and contact details
- GSTIN/UIN
- State code

### Customer Information
- Billed to (customer details)
- Shipping address

### Line Items
- S.No., Description, HSN/SAC code
- Quantity, Unit, Rate, Amount
- Multiple item support

### Tax Calculations
- CGST (Central GST)
- SGST (State GST)
- Tax rates and amounts
- Total amount in words

### Payment Details
- Bank account information
- IFSC code
- Branch details

## Project Structure

```
Invoice-Generator/
├── src/
│   ├── components/
│   │   ├── InvoiceForm.js
│   │   ├── LineItems.js
│   │   ├── TaxCalculations.js
│   │   └── BankDetails.js
│   ├── utils/
│   │   ├── invoiceGenerator.js
│   │   ├── taxCalculator.js
│   │   └── numberToWords.js
│   ├── templates/
│   │   └── invoiceTemplate.html
│   └── App.js
├── public/
├── styles/
│   └── invoice.css
├── package.json
└── README.md
```

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## Usage

1. Fill in business information
2. Add customer/billing details
3. Add line items with descriptions, HSN/SAC, quantity, and rates
4. System automatically calculates taxes (CGST/SGST)
5. Review the invoice preview
6. Export as PDF

## Invoice Data Structure

```json
{
  "invoiceNumber": "001",
  "invoiceDate": "2026-05-08",
  "dueDate": "2026-06-08",
  "business": {
    "name": "SCHOOL BIO",
    "address": "Address Line 1, Address Line 2",
    "city": "City",
    "state": "State",
    "pincode": "000000",
    "gstin": "GSTIN",
    "stateCode": "00"
  },
  "customer": {
    "name": "Customer Name",
    "address": "Address",
    "city": "City",
    "state": "State",
    "pincode": "000000",
    "gstin": "GSTIN"
  },
  "shippingAddress": {
    "name": "Shipping Name",
    "address": "Address",
    "city": "City",
    "state": "State",
    "pincode": "000000"
  },
  "lineItems": [
    {
      "sNo": 1,
      "description": "Product/Service Description",
      "hsn": "HSN/SAC Code",
      "qty": 1,
      "unit": "Unit",
      "rate": 1000,
      "amount": 1000
    }
  ],
  "taxes": {
    "cgstRate": 2.5,
    "sgstRate": 2.5
  },
  "bankDetails": {
    "accountName": "Account Name",
    "accountNumber": "Account Number",
    "ifsc": "IFSC Code",
    "branch": "Branch Name"
  }
}
```

## Technologies Used

- React.js (Frontend)
- HTML/CSS for styling
- PDF generation library (for export)
- JavaScript utilities for calculations

## Tax Calculations

The application automatically calculates:
- **Subtotal**: Sum of all line items
- **CGST**: Central GST at specified rate
- **SGST**: State GST at specified rate
- **Total**: Subtotal + CGST + SGST

## License

MIT License

## Author

ManishBS

---

For more information or to report issues, please create a GitHub issue in this repository.
