/* eslint-disable no-unused-vars */

// Declare the type for the props of the SearchParam component
declare type SearchParamProps = {
  // An object containing the original query parameters
  params: { [key: string]: string };
  // An object containing the parsed query parameters
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

// Declare the type for the parameters of the sign up form
declare type SignUpParams = {
  // The user's first name
  firstName: string;
  // The user's last name
  lastName: string;
  // The address line 1 of the user's address
  address1: string;
  // The city of the user's address
  city: string;
  // The state of the user's address
  state: string;
  // The postal code of the user's address
  postalCode: string;
  // The user's date of birth
  dateOfBirth: string;
  // The user's social security number
  ssn: string;
  // The user's email address
  email: string;
  // The user's chosen password
  password: string;
};

// Declare the type for the user object containing user credentials
declare type LoginUser = {
  // The user's email address
  email: string;
  // The user's chosen password
  password: string;
};

// Declare the type for the user object returned by the API
declare type User = {
  // The unique ID of the user
  $id: string;
  // The user's email address
  email: string;
  // The unique ID of the user
  userId: string;
  // The URL of the user's Dwolla customer account
  dwollaCustomerUrl: string;
  // The ID of the user's Dwolla customer account
  dwollaCustomerId: string;
  // The user's first name
  firstName: string;
  // The user's last name
  lastName: string;
  // The user's full name
  name: string;
  // The address line 1 of the user's address
  address1: string;
  // The city of the user's address
  city: string;
  // The state of the user's address
  state: string;
  // The postal code of the user's address
  postalCode: string;
  // The user's date of birth
  dateOfBirth: string;
  // The user's social security number
  ssn: string;
};

// Declare the type for the parameters of a new user request
declare type NewUserParams = {
  // The unique ID of the user
  userId: string;
  // The user's email address
  email: string;
  // The user's full name
  name: string;
  // The user's chosen password
  password: string;
};

// Declare the type for the account object returned by the API
declare type Account = {
  // The unique ID of the account
  id: string;
  // The available balance of the account
  availableBalance: number;
  // The current balance of the account
  currentBalance: number;
  // The official name of the account's financial institution
  officialName: string;
  // The masked account number for the account
  mask: string;
  // The ID of the account's financial institution
  institutionId: string;
  // The name of the account
  name: string;
  // The type of the account
  type: string;
  // The subtype of the account
  subtype: string;
  // The ID of the Appwrite item representing the account
  appwriteItemId: string;
  // The shareable ID of the account
  shareableId: string;
};

// Declare the type for the transaction object returned by the API
declare type Transaction = {
  // The unique ID of the transaction
  id: string;
  // The unique ID of the transaction (legacy)
  $id: string;
  // The name of the transaction
  name: string;
  // The payment channel used for the transaction
  paymentChannel: string;
  // The type of the transaction
  type: string;
  // The ID of the account associated with the transaction
  accountId: string;
  // The amount of the transaction
  amount: number;
  // Indicates whether the transaction is pending or not
  pending: boolean;
  // The category of the transaction
  category: string;
  // The date of the transaction
  date: string;
  // The image associated with the transaction (if any)
  image: string;
  // The type of the transaction (legacy)
  type: string;
  // The creation date of the transaction
  $createdAt: string;
  // The channel of the transaction (legacy)
  channel: string;
  // The ID of the sender's bank account (if any)
  senderBankId: string;
  // The ID of the receiver's bank account (if any)
  receiverBankId: string;
};

// Declare the type for the bank object returned by the API
declare type Bank = {
  // The unique ID of the bank account
  $id: string;
  // The ID of the account associated with the bank account
  accountId: string;
  // The ID of the bank associated with the account
  bankId: string;
  // The access token for the bank account
  accessToken: string;
  // The URL of the bank account's funding source
  fundingSourceUrl: string;
  // The unique ID of the user associated with the bank account
  userId: string;
  // The shareable ID of the bank account
  shareableId: string;
};

// Declare the possible types for account types
declare type AccountTypes =
  | "depository" // A depository account allows you to deposit and withdraw money
  | "credit" // A credit account is used to borrow money
  | "loan" // A loan account is used to borrow money
  | "investment" // An investment account is used to invest money in financial instruments
  | "other"; // Other types of accounts that do not fit the above categories

// Define the possible categories for transactions
declare type Category = "Food and Drink" | "Travel" | "Transfer";

// Define the type for the category count data returned by the API
declare type CategoryCount = {
  name: string; // The name of the category
  count: number; // The number of transactions in this category
  totalCount: number; // The total number of transactions across all categories
};

// Define the type for the receiver data returned by the API
declare type Receiver = {
  firstName: string; // The first name of the receiver
  lastName: string; // The last name of the receiver
};

// Define the type for the parameters of a transfer request
declare type TransferParams = {
  sourceFundingSourceUrl: string; // The URL of the funding source for the source account
  destinationFundingSourceUrl: string; // The URL of the funding source for the destination account
  amount: string; // The amount to transfer
};

// Define the type for the parameters of a new funding source request
declare type AddFundingSourceParams = {
  dwollaCustomerId: string; // The ID of the Dwolla customer
  processorToken: string; // The token for the processor
  bankName: string; // The name of the bank
};

// Define the type for the parameters of a new Dwolla customer request
declare type NewDwollaCustomerParams = {
  firstName: string; // The first name of the customer
  lastName: string; // The last name of the customer
  email: string; // The email address of the customer
  type: string; // The type of the customer
  address1: string; // The first line of the customer's address
  city: string; // The city of the customer's address
  state: string; // The state of the customer's address
  postalCode: string; // The postal code of the customer's address
  dateOfBirth: string; // The date of birth of the customer
  ssn: string; // The Social Security number of the customer
};

// Define the props for the CreditCard component
declare interface CreditCardProps {
  account: Account; // The account object to display
  userName: string; // The name of the user
  showBalance?: boolean; // Whether to show the balance of the account
}

// Define the props for the BankInfo component
declare interface BankInfoProps {
  account: Account; // The account object to display
  appwriteItemId?: string; // The ID of the account in Appwrite
  type: "full" | "card"; // The type of information to display
}

// Define the props for the HeaderBox component
declare interface HeaderBoxProps {
  type?: "title" | "greeting"; // The type of header
  title: string; // The title of the header
  subtext: string; // The subtext of the header
  user?: string; // The name of the user (optional)
}

// Define the props for the MobileNav component
declare interface MobileNavProps {
  user: User; // The user object to display
}

// Define the props for the PageHeader component
declare interface PageHeaderProps {
  topTitle: string; // The title at the top of the page
  bottomTitle: string; // The title at the bottom of the page
  topDescription: string; // The description at the top of the page
  bottomDescription: string; // The description at the bottom of the page
  connectBank?: boolean; // Whether to display a button to connect a bank
}

// Define the props for the Pagination component
declare interface PaginationProps {
  page: number; // The current page number
  totalPages: number; // The total number of pages
}

// Define the props for the PlaidLink component
declare interface PlaidLinkProps {
  user: User; // The user object to display
  variant?: "primary" | "ghost"; // The variant of the link
  dwollaCustomerId?: string; // The ID of the user's Dwolla customer (optional)
}

// Declare the type for the User object
// declare type User = sdk.Models.Document & {
//   accountId: string; // The ID of the account
//   email: string; // The email address of the user
//   name: string; // The name of the user
//   items: string[]; // The IDs of the user's accounts
//   accessToken: string; // The access token for the user's accounts
//   image: string; // The URL of the user's profile image
// };

// Define the props for the AuthForm component
declare interface AuthFormProps {
  type: "sign-in" | "sign-up"; // The type of form to display
}

// Define the props for the BankDropdown component
declare interface BankDropdownProps {
  accounts: Account[]; // The accounts to display in the dropdown
  setValue?: UseFormSetValue<any>; // The function to set the value of the form field
  otherStyles?: string; // Additional styles to apply to the dropdown
}

/**

 * Interface for the BankTabItem component props.
 * The props required for the BankTabItem component to render correctly.
 */
declare interface BankTabItemProps {
  // The account object for the bank
  account: Account;
  // The appwrite item ID for the account, optional
  appwriteItemId?: string;
}

/**
 * Interface for the TotalBalanceBox component props.
 * The props required for the TotalBalanceBox component to render correctly.
 */
declare interface TotalBalanceBoxProps {
  // The list of accounts for the user
  accounts: Account[];
  // The total number of banks the user has
  totalBanks: number;
  // The total current balance of all the banks combined
  totalCurrentBalance: number;
}

/**
 * Interface for the Footer component props.
 * The props required for the Footer component to render correctly.
 */
declare interface FooterProps {
  // The user object for the currently logged in user
  user: User;
  // The type of the footer, either 'mobile' or 'desktop', optional
  type?: 'mobile' | 'desktop';
}

/**
 * Interface for the RightSidebar component props.
 * The props required for the RightSidebar component to render correctly.
 */
declare interface RightSidebarProps {
  // The user object for the currently logged in user
  user: User;
  // The list of transactions for the user
  transactions: Transaction[];
  // The list of banks for the user
  banks: Bank[] & Account[];
}

/**
 * Interface for the Siderbar component props.
 * The props required for the Siderbar component to render correctly.
 */
declare interface SidebarProps {
  // The user object for the currently logged in user
  user: User;
}

/**
 * Interface for the RecentTransactions component props.
 * The props required for the RecentTransactions component to render correctly.
 */
declare interface RecentTransactionsProps {
  // The list of accounts for the user
  accounts: Account[];
  // The list of transactions for the user
  transactions: Transaction[];
  // The appwrite item ID for the account
  appwriteItemId: string;
  // The current page number of transactions
  page: number;
}

/**
 * Interface for the TransactionHistoryTable component props.
 * The props required for the TransactionHistoryTable component to render correctly.
 */
declare interface TransactionHistoryTableProps {
  // The list of transactions for the user
  transactions: Transaction[];
  // The current page number of transactions
  page: number;
}

/**
 * Interface for the CategoryBadge component props.
 * The props required for the CategoryBadge component to render correctly.
 */
declare interface CategoryBadgeProps {
  // The category name
  category: string;
}

/**
 * Interface for the TransactionTable component props.
 * The props required for the TransactionTable component to render correctly.
 */
declare interface TransactionTableProps {
  // The list of transactions for the user
  transactions: Transaction[];
}

/**
 * Interface for the Category component props.
 * The props required for the Category component to render correctly.
 */
declare interface CategoryProps {
  // The category count object for the category
  category: CategoryCount;
}

/**
 * Interface for the DoughnutChart component props.
 * The props required for the DoughnutChart component to render correctly.
 */
declare interface DoughnutChartProps {
  // The list of accounts for the user
  accounts: Account[];
}

/**
 * Interface for the PaymentTransferForm component props.
 * The props required for the PaymentTransferForm component to render correctly.
 */
declare interface PaymentTransferFormProps {
  // The list of accounts for the user
  accounts: Account[];
}

/**
 * Interface for the getAccounts function props.
 * The props required for the getAccounts function to run correctly.
 */
declare interface getAccountsProps {
  // The user ID for the user
  userId: string;
}

/**
 * Interface for the getAccount function props.
 * The props required for the getAccount function to run correctly.
 */
declare interface getAccountProps {
  // The appwrite item ID for the account
  appwriteItemId: string;
}

/**
 * Interface for the getInstitution function props.
 * The props required for the getInstitution function to run correctly.
 */
declare interface getInstitutionProps {
  // The institution ID for the institution
  institutionId: string;
}

/**
 * Interface for the getTransactions function props.
 * The props required for the getTransactions function to run correctly.
 */
declare interface getTransactionsProps {
  // The access token for the account
  accessToken: string;
}

/**
 * Interface for the CreateFundingSourceOptions object.
 * The options required to create a funding source.
 */
declare interface CreateFundingSourceOptions {
  // The Dwolla customer ID
  customerId: string;
  // The name of the funding source
  fundingSourceName: string;
  // The Plaid account processor token
  plaidToken: string;
  // The Dwolla on-demand authorization link
  _links: object;
}

/**
 * Interface for the CreateTransaction function props.
 * The props required for the CreateTransaction function to run correctly.
 */
declare interface CreateTransactionProps {
  // The name of the transaction
  name: string;
  // The amount of the transaction
  amount: string;
  // The ID of the sender
  senderId: string;
  // The ID of the sender bank
  senderBankId: string;
  // The ID of the receiver
  receiverId: string;
  // The ID of the receiver bank
  receiverBankId: string;
  // The email of the receiver
  email: string;
}

/**
 * Interface for the getTransactionsByBankId function props.
 * The props required for the getTransactionsByBankId function to run correctly.
 */
declare interface getTransactionsByBankIdProps {
  // The ID of the bank
  bankId: string;
}

/**
 * Interface for the signIn function props.
 * The props required for the signIn function to run correctly.
 */
declare interface signInProps {
  // The email of the user
  email: string;
  // The password of the user
  password: string;
}

/**
 * Interface for the getUserInfo function props.
 * The props required for the getUserInfo function to run correctly.
 */
declare interface getUserInfoProps {
  // The ID of the user
  userId: string;
}

/**
 * Interface for the exchangePublicToken function props.
 * The props required for the exchangePublicToken function to run correctly.
 */
declare interface exchangePublicTokenProps {
  // The public token for the user
  publicToken: string;
  // The user object for the currently logged in user
  user: User;
}

/**
 * Interface for the createBankAccount function props.
 * The props required for the createBankAccount function to run correctly.
 */
declare interface createBankAccountProps {
  // The access token for the account
  accessToken: string;
  // The ID of the user
  userId: string;
  // The ID of the account
  accountId: string;
  // The ID of the bank
  bankId: string;
  // The funding source URL for the account
  fundingSourceUrl: string;
  // The shareable ID for the account
  shareableId: string;
}

/**
 * Interface for the getBanks function props.
 * The props required for the getBanks function to run correctly.
 */
declare interface getBanksProps {
  // The ID of the user
  userId: string;
}

/**
 * Interface for the getBank function props.
 * The props required for the getBank function to run correctly.
 */
declare interface getBankProps {
  // The ID of the document
  documentId: string;
}

/**
 * Interface for the getBankByAccountId function props.
 * The props required for the getBankByAccountId function to run correctly.
 */
declare interface getBankByAccountIdProps
{
  // The ID of the account
  accountId: string;
}