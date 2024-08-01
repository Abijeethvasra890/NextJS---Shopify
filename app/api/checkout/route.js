import axios from 'axios';

export async function POST(req) {
  try {
    const { cart } = await req.json();
    console.log('Cart received:', cart);

    const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

    if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
      throw new Error('Shopify environment variables are not set');
    }

    const lineItems = cart.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity,
    }));

    console.log('Line items:', lineItems);

    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
      {
        query: `
          mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
              checkout {
                id
                webUrl
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: {
          input: {
            lineItems,
          },
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        },
      }
    );

    console.log('Response data:', response.data);

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
