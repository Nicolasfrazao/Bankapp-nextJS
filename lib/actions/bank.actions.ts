"use server";

// Import the necessary types from the Plaid API SDK
import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

// Import the Plaid client from the Plaid file in the lib directory
import { plaidClient } from "../plaid";

// Import the parseStringify function from the utils file in the lib directory
import { parseStringify } from "../utils";

// Import the functions to get transactions and banks from the transaction and user actions files in the lib directory
import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // Get the banks from the database based on the user ID
    const banks = await getBanks({ userId });

    // Loop through each bank and get the account information and institution information from the Plaid API
    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // Get the account information from the Plaid API using the access token of the bank account
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // Get the institution information from the Plaid API using the institution ID of the bank account
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        // Create a new object with the desired properties for the bank account
        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharaebleId: bank.sharableId,
        };

        return account;
      })
    );

    // Calculate the total number of banks and the total current balance of all accounts
    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    // Parse and stringify the accounts, totalBanks, and totalCurrentBalance and return it
    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    // If an error occurs, log it to the console and return an error message
    console.error("An error occurred while getting the accounts:", error);
  }
};
// Get one bank account
/**
 * This function retrieves a single bank account from the database.
 * It takes an object containing the Appwrite document ID of the bank account as a parameter.
 * It returns a parsed and stringified JSON object containing the bank account data and all transactions associated with the account.
 *
 * @param {getAccountProps} options - An object containing the Appwrite document ID of the bank account.
 * @returns {Promise<string>} A stringified JSON object containing the bank account data and all transactions associated with the account.
 */
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // Get the bank account from the database using the provided Appwrite document ID.
    const bank = await getBank({ documentId: appwriteItemId });

    // Get the account information from the Plaid API using the access token of the bank account.
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // Get the transfer transactions associated with the bank account from the Appwrite database.
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    // Map the transfer transactions to a new array with the desired properties.
    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    // Get the institution information from the Plaid API using the institution ID of the bank account.
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    // Get the transactions associated with the bank account from the Plaid API using the access token of the bank account.
    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    // Create a new object with the desired properties for the bank account.
    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // Combine the transactions from the Plaid API and the transfer transactions from the Appwrite database,
    // and sort them by date with the most recent transaction first.
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Return the bank account data and all transactions as a parsed and stringified JSON object.
    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    // If an error occurs, log it to the console and return an error message.
    console.error("An error occurred while getting the account:", error);
  }
};
/**
 * This function fetches information about a bank institution from the Plaid API.
 * It takes an object containing the institution ID as a parameter and returns a parsed and stringified
 * JSON object containing information about the institution.
 *
 * @param {getInstitutionProps} options - An object containing the institution ID.
 * @returns {Promise<string>} A stringified JSON object containing information about the institution.
 */
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    // Make a request to the Plaid API to get information about the specified institution
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId, // The ID of the institution to fetch information for
      country_codes: ["US"] as CountryCode[], // Filter the institutions by country code
    });

    // Extract the institution data from the response
    const institution = institutionResponse.data.institution;

    // Parse and stringify the institution data and return it
    return parseStringify(institution);
  } catch (error) {
    // If an error occurs, log it to the console and return an error message
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
/**
 * This function retrieves all transactions for a given access token.
 * It iterates through each page of new transaction updates for the item
 * and appends the transactions to the 'transactions' array.
 * Once all pages have been retrieved, it returns the transactions as a stringified JSON object.
 *
 * @param {getTransactionsProps} options - An object containing the access token for the item.
 * @return {Promise<string>} A stringified JSON object containing all transactions for the item.
 */
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  // Initialize a boolean flag to indicate if there are more pages of transactions
  let hasMore = true;
  // Initialize an empty array to store all retrieved transactions
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      // Make a request to the Plaid API to get the next page of transactions
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      // Extract the data from the response
      const data = response.data;

      // Map each transaction in the 'added' array to a new object with the desired properties
      const newTransactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        // If the transaction has a category, use the first category as the transaction category
        // Otherwise, use an empty string as the category
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      // Add the newly mapped transactions to the 'transactions' array
      transactions = [...transactions, ...newTransactions];

      // Update the 'hasMore' flag based on the value in the response data
      hasMore = data.has_more;
    }

    // Return the transactions as a stringified JSON object
    return parseStringify(transactions);
  } catch (error) {
    // Log any errors that occur during the process
    console.error("An error occurred while getting the accounts:", error);
  }
};
