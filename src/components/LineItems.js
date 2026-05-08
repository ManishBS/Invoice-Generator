import React from 'react';

function LineItems({ items, onItemsChange }) {
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    
    if (field === 'qty' || field === 'rate') {
      newItems[index][field] = parseFloat(value) || 0;
    } else {
      newItems[index][field] = value;
    }
    
    // Auto-calculate amount
    newItems[index].amount = newItems[index].qty * newItems[index].rate;
    onItemsChange(newItems);
  };

  const handleAddItem = () => {
    const newItem = {
      sNo: items.length + 1,
      description: '',
      hsn: '',
      qty: 1,
      unit: '',
      rate: 0,
      amount: 0
    };
    onItemsChange([...items, newItem]);
  };

  const handleRemoveItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    // Re-number items
    newItems.forEach((item, i) => {
      item.sNo = i + 1;
    });
    onItemsChange(newItems);
  };

  return (
    <div className="section line-items-section">
      <h3>Line Items</h3>
      <div style={{ overflowX: 'auto' }}>
        <table className="line-items-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>S.No</th>
              <th>Description of goods</th>
              <th style={{ width: '100px' }}>HSN/SAC</th>
              <th style={{ width: '80px' }}>Qty</th>
              <th style={{ width: '80px' }}>Unit</th>
              <th style={{ width: '100px' }}>Rate</th>
              <th style={{ width: '100px' }}>Amount</th>
              <th style={{ width: '60px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.sNo}</td>
                <td>
                  <input
                    type="text"
                    className="input-full"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                    placeholder="Product/Service description"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-full"
                    value={item.hsn}
                    onChange={(e) => handleItemChange(index, 'hsn', e.target.value)}
                    placeholder="HSN/SAC"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-full"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-full"
                    value={item.unit}
                    onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                    placeholder="Unit"
                    style={{ width: '100%' }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="input-full"
                    value={item.rate}
                    onChange={(e) => handleItemChange(index, 'rate', e.target.value)}
                    step="0.01"
                    style={{ width: '100%' }}
                  />
                </td>
                <td className="amount-cell">
                  ₹ {item.amount.toFixed(2)}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn-add-item"
        onClick={handleAddItem}
      >
        + Add Item
      </button>
    </div>
  );
}

export default LineItems;
