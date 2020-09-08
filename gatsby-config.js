module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    title: `Li Hao Blog`,
    name: `Li Hao`,
    siteUrl: `https://chaos1ee.github.io`,
    description: `This is a personal blog be used to record life and code.`,
    hero: {
      heading: `Li Hao Blog`,
      maxWidth: 680,
    },
    social: [
      {
        name: `github`,
        url: `https://github.com/chaos1ee`,
      },
    ],
  },
  plugins: [
    {
      resolve: '@narative/gatsby-theme-novela',
      options: {
        contentPosts: 'content/posts',
        contentAuthors: 'content/authors',
        basePath: '/',
        authorsPage: true,
        sources: {
          local: true,
          contentful: false,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Novela by Narative`,
        short_name: `Novela`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.svg`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {},
    },
  ],
};
