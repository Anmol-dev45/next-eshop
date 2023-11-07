export const productRating = (data: any) =>
  data.reviews.reduce((acc: number, item: any) => acc + item.rating, 0) /
  data.reviews.length;
