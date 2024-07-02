/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// ========================================

declare type SignUpParams = {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

declare type LoginUser = {
  email: string;
  password: string;
};

declare type User = {
  $id: string;
  email: string;
  userId: string;
  dwollaCustomerUrl: string;
  dwollaCustomerId: string;
  firstName: string;
  lastName: string;
  name: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};

declare type Account = {
  id: string;
  availableBalance: number;
  currentBalance: number;
  officialName: string;
  mask: string;
  institutionId: string;
  name: string;
  type: string;
  subtype: string;
  appwriteItemId: string;
  shareableId: string;
};

declare type Transaction = {
  id: string;
  $id: string;
  name: string;
  paymentChannel: string;
  type: string;
  accountId: string;
  amount: number;
  pending: boolean;
  category: string;
  date: string;
  image: string;
  type: string;
  $createdAt: string;
  channel: string;
  senderBankId: string;
  receiverBankId: string;
};

declare type Bank = {
  $id: string;
  accountId: string;
  bankId: string;
  accessToken: string;
  fundingSourceUrl: string;
  userId: string;
  shareableId: string;
};

declare type AccountTypes =
  | "depository"
  | "credit"
  | "loan "
  | "investment"
  | "other";

declare type Category = "Food and Drink" | "Travel" | "Transfer";

declare type CategoryCount = {
  name: string;
  count: number;
  totalCount: number;
};

declare type Receiver = {
  firstName: string;
  lastName: string;
};

declare type TransferParams = {
  sourceFundingSourceUrl: string;
  destinationFundingSourceUrl: string;
  amount: string;
};

declare type AddFundingSourceParams = {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
};

declare type NewDwollaCustomerParams = {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
};

declare interface CreditCardProps {
  account: Account;
  userName: string;
  showBalance?: boolean;
}

declare interface BankInfoProps {
  account: Account;
  appwriteItemId?: string;
  type: "full" | "card";
}

declare interface HeaderBoxProps {
  type?: "title" | "greeting";
  title: string;
  subtext: string;
  user?: string;
}

declare interface MobileNavProps {
  user: User;
}

declare interface PageHeaderProps {
  topTitle: string;
  bottomTitle: string;
  topDescription: string;
  bottomDescription: string;
  connectBank?: boolean;
}

declare interface PaginationProps {
  page: number;
  totalPages: number;
}

declare interface PlaidLinkProps {
  user: User;
  variant?: "primary" | "ghost";
  dwollaCustomerId?: string;
}

// declare type User = sdk.Models.Document & {
//   accountId: string;
//   email: string;
//   name: string;
//   items: string[];
//   accessToken: string;
//   image: string;
// };

declare interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

declare interface BankDropdownProps {
  accounts: Account[];
  setValue?: UseFormSetValue<any>;
  otherStyles?: string;
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
declare interface SiderbarProps {
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