export const checkPermission = (originalId, compareId) => {
  if (originalId == compareId) return;
  else {
    throw new Error("Not authorized to access this route");
  }
};
