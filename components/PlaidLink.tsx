// Import the necessary dependencies for the component
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from 'react-plaid-link';
import { useRouter } from 'next/navigation';
import { createLinkToken, exchangePublicToken } from '@/lib/actions/user.actions';
import Image from 'next/image';

// Define the PlaidLink component
const PlaidLink = ({ user, variant }: PlaidLinkProps) => {
  // Get the router object from the Next.js routing library
  const router = useRouter();

  // Define a state variable to store the Plaid link token
  const [token, setToken] = useState('');

  // Fetch the Plaid link token when the component mounts or when the user prop changes
  useEffect(() => {
    const getLinkToken = async () => {
      // Call the createLinkToken function to get the link token for the user
      const data = await createLinkToken(user);

      // Set the token state variable with the link token
      setToken(data?.linkToken);
    };

    getLinkToken();
  }, [user]);

  // Define the onSuccess callback function
  const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
    // Call the exchangePublicToken function to exchange the public token for an access token
    await exchangePublicToken({
      publicToken: public_token,
      user,
    });

    // Redirect the user to the home page
    router.push('/');
  }, [user]);

  // Define the Plaid link configuration object
  const config: PlaidLinkOptions = {
    token, // Set the token prop to the token state variable
    onSuccess, // Set the onSuccess prop to the onSuccess callback function
  };

  // Get the Plaid link object using the usePlaidLink hook
  const { open, ready } = usePlaidLink(config);

  // Render the component
  return (
    <>
      {/* Render the button based on the variant prop */}
      {variant === 'primary' ? (
        <Button
          onClick={() => open()} // Call the open function to open the Plaid link
          disabled={!ready} // Disable the button if the Plaid link is not ready
          className="plaidlink-primary"
        >
          Connect bank
        </Button>
      ) : variant === 'ghost' ? (
        <Button
          onClick={() => open()} // Call the open function to open the Plaid link
          variant="ghost"
          className="plaidlink-ghost"
        >
          {/* Render the bank connect image */}
          <Image
            src={'/public/icons/connect-bank.svg'}
            alt="Connect bank"
            width={30}
            height={30}
          />
          <p className="hidden text-[20px] font-semibold text-black-2 xl:block">
            Connect bank
          </p>
        </Button>
      ) : (
        <Button
          onClick={() => open()} // Call the open function to open the Plaid link
          className="plaidlink-default"
        >
          {/* Render the bank connect image */}
          <Image
            src={'/public/icons/connect-bank.svg'}
            alt="Connect bank"
            width={30}
            height={30}
          />
          <p className="text-[20px] font-semibold text-black-2">
            Connect bank
          </p>
        </Button>
      )}
    </>
  );
};

export default PlaidLink;