/**
 * Calculate CGST and SGST taxes
 * @param {number} subtotal - The subtotal amount
 * @param {number} cgstRate - CGST rate in percentage
 * @param {number} sgstRate - SGST rate in percentage
 * @returns {Object} Tax calculation details
 */
export const calculateTaxes = (subtotal, cgstRate = 0, sgstRate = 0) => {
  const cgst = (subtotal * cgstRate) / 100;
  const sgst = (subtotal * sgstRate) / 100;
  const totalTax = cgst + sgst;
  const grandTotal = subtotal + totalTax;

  return {
    subtotal: subtotal,
    cgstRate: cgstRate,
    sgstRate: sgstRate,
    cgst: cgst,
    sgst: sgst,
    totalTax: totalTax,
    grandTotal: grandTotal
  };
};

/**
 * Convert amount to Indian currency words
 * @param {number} num - The amount to convert
 * @returns {string} Amount in words
 */
export const amountInWords = (num) => {
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const scales = ['', 'thousand', 'lakh', 'crore'];

  // Handle decimal part
  const parts = num.toString().split('.');
  const integerPart = parseInt(parts[0]);
  const decimalPart = parts[1] ? parseInt(parts[1]) : 0;

  if (integerPart === 0) {
    return 'zero rupees and ' + (decimalPart || 0) + ' paise';
  }

  let words = '';
  let scaleIndex = 0;
  let tempNum = integerPart;

  while (tempNum > 0) {
    let groupValue = tempNum % 100;
    
    if (scaleIndex === 0) {
      groupValue = tempNum % 1000;
      tempNum = Math.floor(tempNum / 1000);
    } else {
      groupValue = tempNum % 100;
      tempNum = Math.floor(tempNum / 100);
    }

    if (groupValue > 0) {
      let groupWords = convertHundreds(groupValue, ones, teens, tens);
      if (groupWords) {
        if (scaleIndex > 0) {
          words = groupWords + ' ' + scales[scaleIndex] + ' ' + words;
        } else {
          words = groupWords + ' ' + words;
        }
      }
    }
    scaleIndex++;
  }

  words = words.trim();
  
  // Capitalize first letter
  words = words.charAt(0).toUpperCase() + words.slice(1);
  
  // Add paise if present
  if (decimalPart > 0) {
    words += ' and ' + decimalPart + ' paise';
  } else {
    words += ' rupees';
  }

  return words;
};

/**
 * Convert hundreds value to words
 */
const convertHundreds = (num, ones, teens, tens) => {
  let words = '';
  
  const hundreds = Math.floor(num / 100);
  if (hundreds > 0) {
    words = ones[hundreds] + ' hundred';
  }

  const remainder = num % 100;
  if (remainder >= 10 && remainder <= 19) {
    if (words) words += ' ';
    words += teens[remainder - 10];
  } else {
    const ten = Math.floor(remainder / 10);
    const one = remainder % 10;
    
    if (ten > 1) {
      if (words) words += ' ';
      words += tens[ten];
      if (one > 0) {
        words += ' ' + ones[one];
      }
    } else if (one > 0) {
      if (words) words += ' ';
      words += ones[one];
    }
  }

  return words;
};
