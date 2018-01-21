var plugins = [{
      plugin: require('D:/personal/lumen-blog/node_modules/gatsby-plugin-feed/gatsby-ssr.js'),
      options: {"plugins":[],"query":"\n          {\n            site {\n              siteMetadata {\n                url\n                title\n                subtitle\n              }\n            }\n          }\n        ","feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  limit: 1000,\n                  sort: { order: DESC, fields: [frontmatter___date] },\n                  filter: { frontmatter: { layout: { eq: \"post\" }, draft: { ne: true } } }\n                ) {\n                  edges {\n                    node {\n                      html\n                      fields {\n                        slug\n                      }\n                      frontmatter {\n                        title\n                        date\n                        layout\n                        draft\n                        description\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/rss.xml"}]},
    },{
      plugin: require('D:/personal/lumen-blog/node_modules/gatsby-plugin-google-analytics/gatsby-ssr.js'),
      options: {"plugins":[],"trackingId":""},
    },{
      plugin: require('D:/personal/lumen-blog/node_modules/gatsby-plugin-sitemap/gatsby-ssr.js'),
      options: {"plugins":[],"query":"\n            {\n              site {\n                siteMetadata {\n                  url\n                }\n              }\n              allSitePage(\n                filter: {\n                  path: { regex: \"/^(?!/404/|/404.html|/dev-404-page/)/\" }\n                }\n              ) {\n                edges {\n                  node {\n                    path\n                  }\n                }\n              }\n          }","output":"/sitemap.xml"},
    },{
      plugin: require('D:/personal/lumen-blog/node_modules/gatsby-plugin-react-helmet/gatsby-ssr.js'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   require('/path/to/plugin1/gatsby-ssr.js'),
//   require('/path/to/plugin2/gatsby-ssr.js'),
// ]

const apis = require(`./api-ssr-docs`)

module.exports = (api, args, defaultReturn) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }
  // Run each plugin in series.
  let results = plugins.map(plugin => {
    if (plugin.plugin[api]) {
      const result = plugin.plugin[api](args, plugin.options)
      return result
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
