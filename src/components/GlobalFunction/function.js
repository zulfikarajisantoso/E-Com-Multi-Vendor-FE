export const formatCurrency = (amount) => {
    // Convert the amount to string and split into integer and decimal parts
    const parts = amount.toString().split('.');
    
    // Add thousand separators to the integer part
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  
    // Join the integer and decimal parts with a comma
    return parts.join(',');
  };