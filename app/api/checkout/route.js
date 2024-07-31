import axios from 'axios';

export async function POST(req) {
  try {
    const { variantId } = await req.json();
    const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
      {
        query: `
          mutation {
            checkoutCreate(input: { lineItems: [{ variantId: "${variantId}", quantity: 1 }] }) {
              checkout {
                id
                webUrl
              }
            }
          }
        `
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
      }
    );

    return new Response(JSON.stringify({ checkoutUrl: response.data.data.checkoutCreate.checkout.webUrl }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
