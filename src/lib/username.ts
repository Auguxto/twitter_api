export function validateUsername(username: string): Boolean {
  const name = username.trim();
  const hasSpace = name.includes(" ");

  if (hasSpace) return false;

  return true;
}
