/**
 * Extract the content from the editor content
 */

export default function getContentFromEditorContent(content: string) {
  const regex = /<[^>]*>?/gm;

  const noTagText = content.replace(regex, "");
  return noTagText;
}

/**
 * This is the regex for catching the content of all HTML tags
 *           /<(?:.|\n)[^>]*?>(.*?)<\/(?:.|\n)*?>/g;
 * Explanation: match all HTML tag but only remember the content of the tag
 * However doesn't take in account <br/> or <hr/>
 * We can use matchAll() to get all the matched
 */
