const maxLength = 25;

export const truncateText = (text: string) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`;
  }
  return text;
};
