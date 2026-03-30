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


module.exports = {safeParse,validateContacts,validateDeliveryTimings,validateKycDetails}