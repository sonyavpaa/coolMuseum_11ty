
module.exports = config => {

        // Transforms
        const htmlMinTransform = require('./src/transforms/html-min-transform.js');

      // Create a helpful production flag
      const isProduction = process.env.NODE_ENV === 'production';

      // Only minify HTML if we are in production because it slows builds _right_ down
      if (isProduction) {
        config.addTransform('htmlmin', htmlMinTransform);
      }

      config.addCollection('art', collection => {
        return collection.getFilteredByGlob('./src/art/*.md').sort((a, b) => {
          return Number(a.fileSlug) > Number(b.fileSlug) ? 1 : -1;
        } )
      })

      // Watch CSS files for changes
      config.setBrowserSyncConfig({
        files: './dist/css/*.css'
      });

      // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
      config.setUseGitIgnore(false);


    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist'
      }
    };
  };
