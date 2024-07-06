"use server";

// Import the Dwolla v2 client and its dependencies.
import { Client } from "dwolla-v2";

// Define a function that returns the environment based on the environment variable.
const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string; // Get the environment variable.

  switch (environment) { // Check the environment variable.
    case "sandbox": // If the environment is sandbox.
      return "sandbox"; // Return the sandbox environment.
    case "production": // If the environment is production.
      return "production"; // Return the production environment.
    default: // If the environment is neither sandbox nor production.
      throw new Error( // Throw an error indicating that the environment should either be sandbox or production.
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

// Create a new Dwolla client with the environment and keys from the environment variables.
const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_API_KEY as string,
  secret: process.env.DWOLLA_API_SECRET as string,
});

// Function to create a Dwolla Funding Source using a Plaid Processor Token.
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    // Send a POST request to create a new funding source.
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName, // Set the name of the funding source.
        plaidToken: options.plaidToken, // Set the Plaid token for the funding source.
      })
      .then((res) => res.headers.get("location")); // Return the location of the newly created funding source.
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err); // Log an error if the creation fails.
  }
};

// Function to create an on-demand authorization link.
export const createOnDemandAuthorization = async () => {
  try {
    // Send a POST request to create a new on-demand authorization.
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links; // Get the links from the response.
    return authLink; // Return the links.
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err); // Log an error if the creation fails.
  }
};

// Function to create a Dwolla customer.
export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    // Send a POST request to create a new customer.
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location")); // Return the location of the newly created customer.
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err); // Log an error if the creation fails.
  }
};

// Function to transfer funds from one funding source to another.
export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    // Create a request body for the transfer.
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl, // Set the source funding source URL.
        },
        destination: {
          href: destinationFundingSourceUrl, // Set the destination funding source URL.
        },
      },
      amount: {
        currency: "USD", // Set the currency to USD.
        value: amount, // Set the value of the transfer.
      },
    };
    // Send a POST request to create a new transfer.
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location")); // Return the location of the newly created transfer.
  } catch (err) {
    console.error("Transfer fund failed: ", err); // Log an error if the transfer fails.
  }
};

// Function to add a funding source to a Dwolla customer.
export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // Create an on-demand authorization link.
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // Create a funding source for the Dwolla customer.
    const fundingSourceOptions = {
      customerId: dwollaCustomerId, // Set the customer ID.
      fundingSourceName: bankName, // Set the name of the funding source.
      plaidToken: processorToken, // Set the Plaid token for the funding source.
      _links: dwollaAuthLinks, // Set the links for the funding source.
    };
    return await createFundingSource(fundingSourceOptions); // Return the URL of the newly created funding source.
  } catch (err) {
    console.error("Transfer fund failed: ", err); // Log an error if the transfer fails.
  }
};
