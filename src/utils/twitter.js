export const shareToTwitter = (text) => {
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
  );
};
