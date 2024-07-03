import { getTransactionStatus } from "./../public/assets/lib/utils";
/* eslint-disable no-prototype-builtins */

// Importing necessary dependencies
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

// Function to combine and format CSS classes
export function cn(...inputs: ClassValue[]) {
  // Combine and format CSS classes using twMerge and clsx
  return twMerge(clsx(inputs));
}

// Function to format a date and time
export const formatDateTime = (dateString: Date) => {
  // Defining options for formatting the date and time
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Abbreviated weekday name (e.g., 'Mon')
    month: "short", // Abbreviated month name (e.g., 'Oct')
    day: "numeric", // Numeric day of the month (e.g., '25')
    hour: "numeric", // Numeric hour (e.g., '8')
    minute: "numeric", // Numeric minute (e.g., '30')
    hour12: true, // Use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // Abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // Numeric year (e.g., '2023')
    month: "2-digit", // Abbreviated month name (e.g., 'Oct')
    day: "2-digit", // Numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // Abbreviated month name (e.g., 'Oct')
    year: "numeric", // Numeric year (e.g., '2023')
    day: "numeric", // Numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // Numeric hour (e.g., '8')
    minute: "numeric", // Numeric minute (e.g., '30')
    hour12: true, // Use 12-hour clock (true) or 24-hour clock (false)
  };

  // Formatting the date and time using toLocaleString()
  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );
  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );
  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );
  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  // Returning the formatted date and time as an object
  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

// Function to format a number as a currency
export function formatAmount(amount: number): string {
  // Creating a formatter for the currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });

  // Formatting the amount using the formatter
  return formatter.format(amount);
}

// Function to parse and stringify a value
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

// Function to remove special characters from a string
export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

// Type for URL query parameters
interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

// Function to update a URL query parameter
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  // Parsing the current URL query parameters
  const currentUrl = qs.parse(params);

  // Updating the specified query parameter
  currentUrl[key] = value;

  // Stringifying the updated URL query parameters
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

// Function to get account type colors based on the account type
export function getAccountTypeColors(type: AccountTypes) {
  // Switch statement to determine the account colors based on the account type
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

// Function to count the number of transactions for each category
export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  // Initializing an object to store the category counts
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterating over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extracting the category from the transaction
      const category = transaction.category;

      // Checking if the category exists in the categoryCounts object
      if (categoryCounts.hasOwnProperty(category)) {
        // Incrementing the count if it exists
        categoryCounts[category]++;
      } else {
        // Initializing the count to 1 if it doesn't exist
        categoryCounts[category] = 1;
      }

      // Incrementing the total count
      totalCount++;
    });

  // Converting the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sorting the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  // Returning the aggregatedCategories array
  return aggregatedCategories;
}

// Function to extract the customer ID from a URL
export function extractCustomerIdFromUrl(url: string) {
  // Splitting the URL string by '/'
  const parts = url.split("/");

  // Extracting the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  // Returning the customer ID
  return customerId;
}

// Function to encrypt an ID using base64 encoding
export function encryptId(id: string) {
  // Encrypting the ID using base64 encoding
  return btoa(id);
}

// Function to decrypt an ID using base64 decoding
export function decryptId(id: string) {
  // Decrypting the ID using base64 decoding
  return atob(id);
}

/**
 * Function to get the transaction status based on the date.
 * If the date is more recent than two days ago, the status is "Processing".
 * Otherwise, the status is "Success".
 *
 * @param {Date} date - The date to check the transaction status for.
 * @return {string} The transaction status, either "Processing" or "Success".
 */
export const getTransactionStatus = (date: Date) => {
  // Creating a new Date object representing today
  const today = new Date();

  // Creating a new Date object representing two days ago
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  // Checking if the date is more recent than two days ago
  if (date > twoDaysAgo) {
    // If it is, the transaction status is "Processing"
    return "Processing";
  } else {
    // If it's not, the transaction status is "Success"
    return "Success";
  }
};

/**
 * Function to define the schema for the authentication form based on the type.
 *
 * @param {string} type - The type of the authentication form ("sign-in" or "sign-up").
 * @return {z.ZodObject<{
 *   firstName?: z.ZodString | undefined;
 *   lastName?: z.ZodString | undefined;
 *   address1?: z.ZodString | undefined;
 *   city?: z.ZodString | undefined;
 *   state?: z.ZodString | undefined;
 *   postalCode?: z.ZodString | undefined;
 *   dateOfBirth?: z.ZodString | undefined;
 *   ssn?: z.ZodString | undefined;
 *   email: z.ZodString;
 *   password: z.ZodString;
 * }>} The schema for the authentication form.
 */
export const authFormSchema = (type: string) => z.object({
  // sign up
  // If the form is a sign-in form, the fields are optional
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  // both
  email: z.string().email(), // email is required for both sign-in and sign-up forms
  password: z.string().min(8), // password is required for both sign-in and sign-up forms
})
