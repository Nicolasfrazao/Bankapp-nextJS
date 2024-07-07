'use server';
import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType
} from 'plaid';

import { plaidClient } from '../plaid';
import { parseStringify } from '../utils';

import { getTransactionsByBankId } from './transaction.actions';
import { getBanks, getBank } from './user.actions';

export const getAccounts = async ( { userId }: getAccountsProps ) =>
{
  
  try
  {
    const banks = await getBanks( { userId } );

    const accounts = await Promise.all(
      banks?.map( async ( bank: Bank ) =>
      {
        const accountsResponse = await plaidClient.accountsGet( {
          access_token: bank.accessToken
        } );

        const accountData = await accountsResponse.data.accounts[ 0 ];

        const instituition = await getInstitution( {
          institutionId: accountsResponse.data.item.institution_id!,
        } );
        
        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          instituitionId: instituition.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          shareableId: bank.shareableId,
        };

        return account;
      } )
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce( ( total, account ) =>
    {
      return total + account.currentBalance;
    }, 0 );
    
    return parseStringify( { data: accounts, totalBanks, totalCurrentBalance } );
  } catch ( error )
  {
    console.error( "An error occurred while getting the accounts:", error );
  }
};

export const getAccount = async ( { appwriteItemId }: getAccountProps) => {
  
  try {
    const bank = await getBank( {documentId: appwriteItemId} );
  } catch (error) {
    
  }
 };