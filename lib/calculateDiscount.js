export const calculateDiscount = (price, discount) => {
  const save = price * (discount / 100);
  return { save, discount: price - save };
};
