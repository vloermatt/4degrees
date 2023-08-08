export const getBackgroundColor = (progress: number) => {
  if (progress < 50) {
    return "green";
  }
  if (progress > 80) {
    return "red";
  }
  return "orange";
};
