"use client"

import { useClerk } from '@clerk/nextjs'
import PrimaryButton from '@/components/global/buttons/PrimaryButton'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (

    <PrimaryButton onClick={() => signOut({ redirectUrl: '/' })}>Log ud</PrimaryButton>
  )
}