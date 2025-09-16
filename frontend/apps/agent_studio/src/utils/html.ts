export function isHtml(str?: string) {
  if (!str) return false;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    const parserErrors = doc.getElementsByTagName('parsererror');
    if (parserErrors.length) {
      return false;
    }
    return doc.body.innerHTML;
  } catch (error) {
    return false;
  }
}
