'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';
/**
 * AuthForm component is a form that allows users to either sign up or sign in.
 * It uses React Hook Form, Zod, and Appwrite for form validation and handling.
 * 
 * @param {string} type - The type of the form ("sign-in" or "sign-up").
 * @return {JSX.Element} The AuthForm component.
 */
const AuthForm = ({ type }: { type: string }) => {
  // Define state variables
  const router = useRouter(); // Get the Next.js router
  const [user, setUser] = useState(null); // Define state for the user object
  const [isLoading, setIsLoading] = useState(false); // Define state for the loading state

  // Define the form schema using the authFormSchema function
  const formSchema = authFormSchema(type);

  // 1. Initialize the form using React Hook Form.
  // - Resolver: Validate the form data using Zod.
  // - Default values: Set the default values for the form fields.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "", // Email field is empty by default
      password: '' // Password field is empty by default
    },
  })
  
  /**
   * 2. Define a submit handler for the form.
   * - The handler is an asynchronous function that takes the form data as input.
   * - It sets the loading state to true.
   * - It checks the form type and performs the appropriate action:
   *   - If the form type is "sign-up", it signs up the user with Appwrite and creates a Plaid token.
   *   - If the form type is "sign-in", it signs in the user with Appwrite.
   * - If an error occurs during the sign-up or sign-in process, it logs the error.
   * - Finally, it sets the loading state to false.
   * 
   * @param {z.infer<typeof formSchema>} data - The form data.
   * @return {Promise<void>} A promise that resolves when the form is submitted.
   */
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true); // Set the loading state to true

    try {
      // Sign up with Appwrite & create plaid token
      if(type === 'sign-up') {
        const userData = {
          firstName: data.firstName!, // First name from the form data
          lastName: data.lastName!, // Last name from the form data
          address1: data.address1!, // Address 1 from the form data
          city: data.city!, // City from the form data
          state: data.state!, // State from the form data
          postalCode: data.postalCode!, // Postal code from the form data
          dateOfBirth: data.dateOfBirth!, // Date of birth from the form data
          ssn: data.ssn!, // SSN from the form data
          email: data.email, // Email from the form data
          password: data.password // Password from the form data
        }

        // Sign up the user with Appwrite
        const newUser = await signUp(userData);

        setUser(newUser); // Set the user state to the new user object
      }

      if(type === 'sign-in') {
        // Sign in the user with Appwrite
        const response = await signIn({
          email: data.email, // Email from the form data
          password: data.password, // Password from the form data
        })

        if(response) router.push('/') // Redirect to the home page if sign-in is successful
      }
    } catch (error) {
      console.log(error); // Log any errors that occur during sign-up or sign-in
    } finally {
      setIsLoading(false); // Set the loading state to false
    }
  }
  return (
    <section className="auth-form">
      <header className='flex flex-col gap-5 md:gap-8'>
          <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>

          <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
              {user 
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Link your account to get started'
                  : 'Please enter your details'
                }
              </p>  
            </h1>
          </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ): (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === 'sign-up' && (
                <>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                    <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your first name' />
                  </div>
                  <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                  <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                    <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                    <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                  </div>
                </>
              )}

              <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />

              <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === 'sign-in' 
                    ? 'Sign In' : 'Sign Up'}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
        </>
      )}
    </section>
  )
}

export default AuthForm