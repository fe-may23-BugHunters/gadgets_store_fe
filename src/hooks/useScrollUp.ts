export const useScrollUp = () => {
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return { handleScrollUp };
};
