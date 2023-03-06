const theme = {
  color: {
    primaryColor: "#ff385c",
    secondaryColor: "#00848a",
  },
  text: {
    primaryColor: "#484848",
    secondaryColor: "#333",
    lightColor: "#666",
  },
  mixin: {
    boxShadow: `&:hover {
      box-shadow: 1px 2px 5px  rgba(0,0,0,0.18);
      transition: box-shadow .2s ease;
    }`,
  },
};

export default theme;
