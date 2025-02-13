export const calculateHeight = (height?: number | null) => {
  if (height === undefined || height === null) {
    return "0ft 0in"; // Handle undefined or null input
  }

  const totalInches = height * 3.937; // Convert decimeters to inches
  const feet = Math.floor(totalInches / 12); // Calculate feet
  const inches = Math.round(totalInches % 12); // Calculate remaining inches

  return `${feet}ft ${inches}in`;
};
