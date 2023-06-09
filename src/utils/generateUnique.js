

// function to generate unique id for adding to database of integer type
export const generateUnique = () => {
  const id = Date.now();
  const idInt = parseInt(id.toString().slice(-8));
  return idInt;
}