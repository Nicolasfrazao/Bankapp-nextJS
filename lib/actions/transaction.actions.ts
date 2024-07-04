"use server";

// Import the necessary modules from the Appwrite SDK and our local utils file.
import { ID, Query } from "node-appwrite"; // Import the necessary modules from the Appwrite SDK.
import { createAdminClient } from "../server/appwrite"; // Import the createAdminClient function from our server/appwrite file.
import { parseStringify } from "../utils"; // Import the parseStringify function from our utils file.

// Import the necessary environment variables.
const {
  APPWRITE_DATABASE_ID: DATABASE_ID, // The ID of the Appwrite database.
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID, // The ID of the Appwrite collection that stores the transactions.
} = process.env;

// Define a function that creates a new transaction in the database.
export const createTransaction = async (transaction: CreateTransactionProps) => {
  try {
    // Create an Appwrite client using the createAdminClient function from our server/appwrite file.
    const { database } = await createAdminClient();

    // Create a new transaction document in the Appwrite database with the provided transaction data.
    // The transaction data includes the channel (online), category (Transfer), and the rest of the transaction data.
    const newTransaction = await database.createDocument(
      DATABASE_ID!, // The ID of the Appwrite database.
      TRANSACTION_COLLECTION_ID!, // The ID of the Appwrite collection that stores the transactions.
      ID.unique(), // Generate a unique ID for the new transaction.
      {
        channel: 'online', // The channel of the transaction (online).
        category: 'Transfer', // The category of the transaction (Transfer).
        ...transaction, // The rest of the transaction data.
      }
    )

    // Return the new transaction document as a string.
    return parseStringify(newTransaction);
  } catch (error) {
    // Log any errors that occur during the process.
    console.log(error);
  }
}

// Define a function that retrieves all transactions for a given bank account ID.
export const getTransactionsByBankId = async ({bankId}: getTransactionsByBankIdProps) => {
  try {
    // Create an Appwrite client using the createAdminClient function from our server/appwrite file.
    const { database } = await createAdminClient();

    // Retrieve all documents from the Appwrite database that have the specified bank account ID as the sender's bank ID.
    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('senderBankId', bankId)], // Filter the documents by the sender's bank ID.
    )

    // Retrieve all documents from the Appwrite database that have the specified bank account ID as the receiver's bank ID.
    const receiverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal('receiverBankId', bankId)], // Filter the documents by the receiver's bank ID.
    );

    // Combine the sender and receiver transactions into a single object with a total count of transactions and an array of documents.
    const transactions = {
      total: senderTransactions.total + receiverTransactions.total, // The total count of transactions.
      documents: [
        ...senderTransactions.documents, // The sender transactions.
        ...receiverTransactions.documents, // The receiver transactions.
      ]
    }

    // Return the combined transactions as a string.
    return parseStringify(transactions);
  } catch (error) {
    // Log any errors that occur during the process.
    console.log(error);
  }
}
