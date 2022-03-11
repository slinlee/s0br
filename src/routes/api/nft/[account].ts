/** @type {import('./[account]').RequestHandler} */

export async function get({ params }) {
  const apiKey: string = import.meta.env.VITE_MORALIS_API_KEY; // TODO get the api key from env var
  const tokenContract = `0x2a0493dee4f4b5e4b595326f0e73645f6f493923`;
  const url = `https://deep-index.moralis.io/api/v2/${params?.account}/nft/${tokenContract}?chain=polygon&format=decimal`;

  const res = await fetch(url, {
    method: `GET`,
    headers: { accept: "application/json", "X-API-Key": apiKey },
  });
  let response = await res.json();
  response = response.result;

  if (response) {
    return {
      body: { response },
    };
  }

  // Not found
  return { status: 404 };
}
