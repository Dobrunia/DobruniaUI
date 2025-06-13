// CSS переменные из variables.pcss в виде строки для инжекции
export const CSS_VARIABLES = `/* Правила 1 - только 3 размера small, medium, large */
:root {
  /* layout */
  --layout-content-width: 1200px;
  --layout-sidebar-width: 300px;

  /* spacing */
  --spacing-tiny: 0.2rem;
  --spacing-small: 0.5rem;
  --spacing-medium: 1rem;
  --spacing-large: 2rem;

  /* radius */
  --radius-medium: 6px;
  --radius-large: 16px;

  /* transition */
  --transition-fast: 0.15s;
  --transition-slow: 0.3s;

  /* font sizes */
  --font-size-small: 0.7rem;
  --font-size-small-plus: 0.8rem;
  --font-size-medium: 1rem;
  --font-size-large: 1.2rem;

  /* avatar status colors */
  --avatar-status-online: #4cd964;
  --avatar-status-offline: #b0b8c9;
  --avatar-status-dnd: #d44c4a;

  /* font family */
  --font-family: 'Rubik', sans-serif;
}

@media (max-width: 1200px) {
  :root {
    --layout-content-width: 1000px;
    --layout-sidebar-width: 220px;
  }
}

@media (max-width: 900px) {
  :root {
    --layout-content-width: 100vw;
    --layout-sidebar-width: 160px;
  }
}
`;
