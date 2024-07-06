import type { StorybookConfig } from "@storybook/nextjs";

// const config: StorybookConfig = {
//   stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
//   addons: [
//     "@storybook/addon-onboarding",
//     "@storybook/addon-links",
//     "@storybook/addon-essentials",
//     "@chromatic-com/storybook",
//     "@storybook/addon-interactions",
//     'storybook-dark-mode'
//   ],
//   framework: {
//     name: "@storybook/nextjs",
//     options: {},
//   },
//   staticDirs: ["../public"],
// };
// export default config;



const config: StorybookConfig = {
    stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@chromatic-com/storybook",
      "@storybook/addon-interactions",
      "@storybook/addon-styling-webpack",
      "storybook-dark-mode",
      "storybook-msw-addon",
    ],
    framework: {
      name: "@storybook/nextjs",
      options: {},
    },
    staticDirs: ["../public"],
    features: {
      experimentalRSC: true,
    },
  };
  export default config;
  