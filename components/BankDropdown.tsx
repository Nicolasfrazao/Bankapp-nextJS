"use client";

// Importing the necessary components and utilities from Next.js and React
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

// Importing the Select component from the ui directory
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";

// Importing the formUrlQuery and formatAmount utilities from the lib directory
import { formUrlQuery, formatAmount } from "@/lib/utils";

// Declaring the BankDropdown component and its props
export const BankDropdown = ({
  // The accounts prop is an array of account objects
  accounts = [],
  // The setValue prop is a function for setting the value of a form input
  setValue,
  // The otherStyles prop is a string of CSS styles
  otherStyles,
}: BankDropdownProps) => {
  // Using the useSearchParams and useRouter hooks from Next.js
  const searchParams = useSearchParams();
  const router = useRouter();
  // Using the useState hook to manage the selected account state
  const [selected, setSeclected] = useState(accounts[0]);

  // Defining the handleBankChange function
  const handleBankChange = (id: string) => {
    // Finding the account object with the matching appwriteItemId
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    // Updating the selected account state
    setSeclected(account);

    // Generating a new URL with updated search parameters
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    // Navigating to the new URL without scrolling to the top of the page
    router.push(newUrl, { scroll: false });

    // Checking if the setValue prop is defined and calling it with the senderBank key and the new id value
    if (setValue) {
      setValue("senderBank", id);
    }
  };
  return (
    <Select
      defaultValue={selected.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger
        className={`flex w-full bg-white gap-3 md:w-[300px] ${otherStyles}`}
      >
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p className="line-clamp-1 w-full text-left">{selected.name}</p>
      </SelectTrigger>
      <SelectContent
        className={`w-full bg-white md:w-[300px] ${otherStyles}`}
        align="end"
      >
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.appwriteItemId}
              className="cursor-pointer border-t"
            >
              <div className="flex flex-col ">
                <p className="text-16 font-medium">{account.name}</p>
                <p className="text-14 font-medium text-blue-600">
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};