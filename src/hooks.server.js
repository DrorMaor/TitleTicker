export async function handle({ event, resolve }) {
  const response = await resolve(event, {
    headers: {
      'Content-Security-Policy': "script-src 'self'"
    }
  });
  return response;
}
