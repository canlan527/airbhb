const theme = {
  color: {
    primaryColor: "var(--color-brand)",
    secondaryColor: "var(--color-accent)",
  },
  text: {
    primaryColor: "var(--color-ink)",
    secondaryColor: "var(--color-ink-strong)",
    lightColor: "var(--color-ink-muted)",
  },
  mixin: {
    boxShadow: `&:hover {
      box-shadow: var(--shadow-elevated-hover);
      transition: box-shadow .2s ease;
      
    }`,
  },
};

export default theme;
