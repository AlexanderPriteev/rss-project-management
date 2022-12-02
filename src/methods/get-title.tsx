export const getTitle = (str: string) =>
  str
    .split(' - ')
    .filter((e, i) => i)
    .join(' - ');
