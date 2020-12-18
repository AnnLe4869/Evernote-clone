/**
 * Use to extract a title from the text content of the editor
 */
export default function getTitleFromNote(content: string) {
  // This will match the first h1 HTML tag, including the content
  // However only the content is remembered
  const regex = /(?:<h1[^>]*>(.*?)<\/h1>)/;

  // Get the remembered content only
  const matchedContent = content.match(regex);
  if (matchedContent) {
    return matchedContent[1].substring(0, 20);
  }
  return "No title";
}
