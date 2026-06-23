const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getTickets = async () => {
  const res = await fetch(`${baseUrl}/api/tickets`, { cache: 'no-store' });
  return res.json();
}