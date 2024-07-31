import axios from 'axios';

export async function GET(req, { params }) {
  try {
    const { handle } = params;
    const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
      {
        query: `
          {
            productByHandle(handle: "${handle}") {
              id
              title
              description
              handle
              images(first: 10) {
                edges {
                  node {
                    originalSrc
                    altText
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price {
                        amount
                        currencyCode
                        }
                  }
                }
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

    return new Response(JSON.stringify(response.data.data.productByHandle), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.error('Error fetching products:', err.message);
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
