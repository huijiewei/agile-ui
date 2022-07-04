import type { Plugin } from 'vite';
import minifyHtml from '@minify-html/js';

export const viteHtmlMinify = (): Plugin => {
  return {
    name: 'htmlMinifyPlugin',
    apply: 'build',
    transformIndexHtml(code) {
      const minified = minifyHtml.minify(
        code,
        minifyHtml.createConfiguration({
          do_not_minify_doctype: true,
          ensure_spec_compliant_unquoted_attribute_values: true,
          keep_html_and_head_opening_tags: true,
          keep_spaces_between_attributes: true,
          keep_closing_tags: true,
          keep_comments: false,
          minify_css: true,
          minify_js: true,
          remove_bangs: true,
          remove_processing_instructions: true,
        })
      );

      return minified.toString();
    },
  };
};
