"use client";

// Importing necessary modules
import Image from "next/image"; // Module for rendering images
import { useSearchParams, useRouter } from "next/navigation"; // Modules for working with search parameters and navigation

// Importing necessary functions and types from the utils module
import {
  cn, // Function for class name generation
  formUrlQuery, // Function for generating a URL query parameter string
  formatAmount, // Function for formatting currency amounts
  getAccountTypeColors, // Function for getting colors for account types
} from "@/lib/utils"; // Module containing utility functions

// This functional component renders the information about a bank account
const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  // Creating a reference to the router object
  const router = useRouter();
  // Creating a reference to the search parameters object
  const searchParams = useSearchParams();

  // Determining if the current account is the active account
  const isActive = appwriteItemId === account?.appwriteItemId;

  // Function to handle the bank change event
  const handleBankChange = () => {
    // Generating a new URL with updated search parameters
    const newUrl = formUrlQuery({
      params: searchParams.toString(), // Current search parameters
      key: "id", // Key for the account ID
      value: account?.appwriteItemId, // Value for the account ID
    });
    // Navigating to the new URL
    router.push(newUrl, { scroll: false }); // Without scrolling to the top of the page
  };

  // Getting the colors for the account type
  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div
      onClick={handleBankChange}
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700": type === "card" && isActive,
        "rounded-xl": type === "card",
        "hover:shadow-sm cursor-pointer": type === "card",
      })}
    >
      <figure
        className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="bank-info_content">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>
          {type === "full" && (
            <p
              className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>

        <p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;