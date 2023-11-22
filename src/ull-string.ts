export const simplify = (string: string) => {
  return string
    .replace(/\t/g, " ")
    .replace(/ +/g, " ")
    .trim();
};
