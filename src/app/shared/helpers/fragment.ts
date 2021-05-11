export const getLinkToFragment = (fragment: string): string => {
  return `${window.location.pathname}#${fragment}`;
};
