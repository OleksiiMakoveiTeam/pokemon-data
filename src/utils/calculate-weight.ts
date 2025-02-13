export const calculateWeight = (weightInHg?: number | null) => {
  const KG_PER_HG = 0.1; // 1 hectogram = 0.1 kg
  const LBS_PER_KG = 2.20462; // 1 kg = 2.20462 lbs

  if (weightInHg === undefined || weightInHg === null) {
    return 0.0; // Handle undefined or null input
  }

  const weightInLbs = weightInHg * KG_PER_HG * LBS_PER_KG;
  return parseFloat(weightInLbs.toFixed(1)); // Round to 1 decimal place
};
