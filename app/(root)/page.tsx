import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSidebar from "@/components/RightSidebar";
import TotalBalanceBox from "@/components/TotalBalanceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";

const Home = async( { searchParams: { id, page } } : SearchParamProps) =>
{
  const currentPage = Number( page as string ) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts( {
    userId: loggedIn.$id
  } )
  
  if ( !accounts ) return;
  
  const accountsData = accounts?.data;
  const appwriteItemId = ( id as string ) || accountsData[ 0 ]?.appwriteItemId;

  const account = await getAccount( { appwriteItemId } );

  return (
    <section>
      Test
    </section>
  )
}

export default Home;