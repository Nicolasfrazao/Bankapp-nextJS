// This file contains functions that create Appwrite clients with different authentication methods.
// The clients can be used to interact with the Appwrite API.

// Import the necessary modules from the Appwrite SDK.
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";

// Import the cookies function from Next.js.
import { cookies } from "next/headers";

// Create a function that creates a client with a session-based authentication method.
// This function takes no parameters and returns a promise that resolves to an object with
// properties for accessing different parts of the Appwrite API.
export async function createSessionClient() {
  // Create a new Appwrite client.
  const client = new Client()
    // Set the Appwrite endpoint using the value from the environment variables.
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    // Set the Appwrite project ID using the value from the environment variables.
    .setProject(process.env.APPWRITE_PROJECT_ID!);

  // Get the session cookie from the request headers.
  const session = cookies().get("appwrite-session");

  // If the session cookie is not present or has no value, throw an error.
  if (!session || !session.value) {
    throw new Error("No session");
  }

  // Set the session for the Appwrite client.
  client.setSession(session.value);

  // Return an object with properties for accessing different parts of the Appwrite API.
  return {
    // Get the Account object from the Appwrite SDK. This object can be used to interact with the
    // Accounts API.
    get account() {
      return new Account(client);
    },
  };
}

// Create a function that creates a client with an API key-based authentication method.
// This method is used by administrators to interact with the Appwrite API.
// This function takes no parameters and returns a promise that resolves to an object with
// properties for accessing different parts of the Appwrite API.
export async function createAdminClient() {
  // Create a new Appwrite client.
  const client = new Client()
    // Set the Appwrite endpoint using the value from the environment variables.
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    // Set the Appwrite project ID using the value from the environment variables.
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    // Set the Appwrite API key using the value from the environment variables.
    .setKey(process.env.APPWRITE_SECRET_KEY!);

  // Return an object with properties for accessing different parts of the Appwrite API.
  return {
    // Get the Account object from the Appwrite SDK. This object can be used to interact with the
    // Accounts API.
    get account() {
      return new Account(client);
    },
    // Get the Databases object from the Appwrite SDK. This object can be used to interact with the
    // Databases API.
    get database() {
      return new Databases(client);
    },
    // Get the Users object from the Appwrite SDK. This object can be used to interact with the
    // Users API.
    get user() {
      return new Users(client);
    }
  };
}

