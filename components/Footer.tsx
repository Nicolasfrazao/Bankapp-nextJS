// Importing necessary dependencies and components
import { logoutAccount } from '@/lib/actions/user.actions' // User logout action
import Image from 'next/image' // Next.js image component
import { useRouter } from 'next/navigation' // Next.js router hook
import React from 'react' // React

// Footer component that displays user information and logout button
const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  // Using Next.js router hook to get router object
  const router = useRouter();

  // Function to handle logout action
  const handleLogOut = async () => {
    // Calling user logout action and waiting for it to complete
    const loggedOut = await logoutAccount();

    // If logout is successful, redirect user to sign-in page
    if(loggedOut) router.push('/sign-in')
  }

  // Rendering Footer component
  return (
    <footer className="footer">
      {/* Displaying user's initial */}
      <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
        <p className="text-xl font-bold text-gray-700">
          {user?.firstName[0]}
        </p>
      </div>

      {/* Displaying user's name and email */}
      <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
          <h1 className="text-14 truncate text-gray-700 font-semibold">
            {user?.firstName}
          </h1>
          <p className="text-14 truncate font-normal text-gray-600">
            {user?.email}
          </p>
      </div>

      {/* Logout button */}
      <div className="footer_image" onClick={handleLogOut}>
        <Image src="icons/logout.svg" fill alt="jsm" />
      </div>
    </footer>
  )
}

// Exporting Footer component as default export
export default Footer
