export function isValidYTUrl(url: string): boolean {
  const urlRe = new RegExp(
    "((http|https)://|)(www.|)youtube.com/(channel/|user/)[a-zA-Z0-9-]{1,}",
    "gi"
  );
  const isValid = urlRe.test(url);
  return isValid ? true : false;
}
