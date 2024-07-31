import axios from 'axios';

export async function GET(req) {
  try {
    const { SHOPIFY_STORE_DOMAIN, SHOPIFY_STOREFRONT_ACCESS_TOKEN } = process.env;

    const response = await axios.post(
      `https://${SHOPIFY_STORE_DOMAIN}/api/2023-07/graphql.json`,
      {
        query: `
          {
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                  images(first: 1) {
                    edges {
                      node {
                        originalSrc
                        altText
                      }
                    }
                  }
                  priceRange {
                    minVariantPrice {
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

    return new Response(JSON.stringify(response.data.data.products.edges.map(edge => edge.node)), {
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
