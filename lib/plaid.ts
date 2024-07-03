// Import the Plaid API client and the Plaid environments from the Plaid API library.
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

// Create a new configuration object for the Plaid client.
// The configuration object takes two parameters:
// - basePath: the environment to use for Plaid API requests. In this case, we're using the sandbox environment.
// - baseOptions: an object containing additional options for the Plaid client.
//   - headers: an object containing HTTP headers to be sent with each request.
//     - 'PLAID-CLIENT-ID': the client ID for the Plaid API. This is read from the environment variables.
//     - 'PLAID-SECRET': the secret key for the Plaid API. This is also read from the environment variables.
const configuration = new Configuration( {
  // Set the base path for Plaid API requests to the sandbox environment.
  basePath: PlaidEnvironments.sandbox,
  // Set the base options for the Plaid client.
  baseOptions: {
    // Set the headers for the Plaid client.
    headers: {
      // Set the 'PLAID-CLIENT-ID' header to the value of the 'PLAID_CLIENT_ID' environment variable.
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      // Set the 'PLAID-SECRET' header to the value of the 'PLAID_SECRET_KEY' environment variable.
      'PLAID-SECRET': process.env.PLAID_SECRET_KEY,
    },
  },
} );

// Create a new instance of the Plaid API client using the configuration object.
export const plaidClient = new PlaidApi( configuration );
