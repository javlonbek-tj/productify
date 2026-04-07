export function getInitials(
  firstname: string | null | undefined,
  lastname: string | null | undefined,
  email: string,
): string {
  if (firstname && lastname) return `${firstname[0]}${lastname[0]}`.toUpperCase();
  if (firstname) return firstname[0].toUpperCase();
  return email[0].toUpperCase();
}

export function getFullName(
  firstname: string | null | undefined,
  lastname: string | null | undefined,
  email: string,
): string {
  if (firstname || lastname) return [firstname, lastname].filter(Boolean).join(' ');
  return email;
}
