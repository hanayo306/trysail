export const imageCount = (length: number) => {
  switch (length) {
    case 1:
      return 1;
    case 2:
      return 2;
    default:
      return 2.5;
  }
};
