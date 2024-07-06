import "../src/app/globals.css";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";

const preview: Preview = {
  parameters: {
    darkMode: {
      // Override the default dark theme
      dark: { ...themes.dark },
      // Override the default light theme
      light: { ...themes.normal },
      stylePreview: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
