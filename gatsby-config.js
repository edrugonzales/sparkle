module.exports = {
  siteMetadata: {
    title: `Sparkle`,
    description: `Sparkle is an online food delivery service`,
    author: `Sparkle Star International`,
  },
  plugins: [
    {
      resolve: "@sentry/gatsby",
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-stripe`,
    `gatsby-plugin-styled-components`,
    // {
    //   resolve: `gatsby-plugin-webfonts`,
    //   options: {
    //     fonts: {
    //       google: [
    //         {
    //           family: `Montserrat`,
    //           variants: [`300`, `600`],
    //         },
    //       ],
    //     },
    //   },
    // },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Sparkle",
        short_name: "Sparkle",
        start_url: "/",
        background_color: "#3d9afc",
        theme_color: "#3d9afc",
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: "standalone",
        icon: "src/assets/images/appicon/maskable_icon.png", // This path is relative to the root of the site.
        // An optional attribute which provides support for CORS check.
        // If you do not provide a crossOrigin option, it will skip CORS for manifest.
        // Any invalid keyword or empty string defaults to `anonymous`
        crossOrigin: `use-credentials`,
      },
    },
    "gatsby-plugin-offline",
  ],
}
