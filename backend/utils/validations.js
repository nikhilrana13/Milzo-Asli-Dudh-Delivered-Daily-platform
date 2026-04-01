const safeParse = (data) => {
  try {
    return typeof data === "string" ? JSON.parse(data) : data;
  } catch {
    return null;
  }
}
const validateDeliveryTimings = (timings) => {
  if (!Array.isArray(timings)) return "Invalid format";
  const allowedSlots = ["morning", "evening"];
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  for (let t of timings) {
    if (!allowedSlots.includes(t.slot)) {
      return "Invalid slot (morning/evening allowed)";
    }
    if (!timeRegex.test(t.time)) {
      return "Invalid time format (HH:MM)";
    }
  }
  return null; // valid
};
const validateKycDetails = (kyc) => {
  if (!kyc) return "KYC details required";
  // Aadhaar (12 digits)
  if (!/^[0-9]{12}$/.test(kyc.aadharNumber)) {
    return "Invalid Aadhaar number";
  }
  // Bank Account (basic check)
  if (!/^[0-9]{9,18}$/.test(kyc.bankAccountNumber)) {
    return "Invalid bank account number";
  }
  // IFSC
  if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(kyc.ifscCode)) {
    return "Invalid IFSC code";
  }
  return null;
};

const validateContacts = (contacts) => {
  if (!Array.isArray(contacts) || contacts.length === 0) {
    return "At least one contact required";
  }

  for (let num of contacts) {
    if (!/^[0-9]{10}$/.test(num)) {
      return "Invalid contact number";
    }
  }

  return null;
};

const AddProductPriceOptionsValidation = (priceOptions)=>{
  if(!priceOptions) return "Price options are required";
    // Must be array
  if (!Array.isArray(priceOptions)) {
    return "Price options must be an array";
  }
  const allowedUnits = ["ml", "litre", "g", "kg"];
  const seen = new Set(); // duplicate check

  for (let i = 0; i < priceOptions.length; i++) {
    const option = priceOptions[i];
    // Required fields
    if (!option.unit || !option.quantity || !option.mrp || !option.sellingPrice) {
      return `All fields are required in price option ${i + 1}`;
    }
    // Unit validation
    if (!allowedUnits.includes(option.unit)) {
      return `Invalid unit in option ${i + 1}`;
    }
    // Quantity validation
    if (typeof option.quantity !== "number" || option.quantity <= 0) {
      return `Invalid quantity in option ${i + 1}`;
    }
    // Price validation
    if (typeof option.mrp !== "number" || option.mrp <= 0) {
      return `Invalid MRP in option ${i + 1}`;
    }
    if (typeof option.sellingPrice !== "number" || option.sellingPrice <= 0) {
      return `Invalid selling price in option ${i + 1}`;
    }
    // Selling price <= MRP
    if (option.sellingPrice > option.mrp) {
      return `Selling price cannot be greater than MRP in option ${i + 1}`;
    }
    // Duplicate unit + quantity check
    const key = `${option.unit}-${option.quantity}`;
    if (seen.has(key)) {
      return `Duplicate price option for ${option.quantity}${option.unit}`;
    }
    seen.add(key);
  }
  return null;
}


module.exports = {safeParse,validateContacts,validateDeliveryTimings,validateKycDetails,AddProductPriceOptionsValidation}