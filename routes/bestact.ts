export const handler = (): Response => {
  return new Response(null, {
    headers: { "location": "/bestact/index.html" },
    status: 302,
  });
};
