import { redirect } from 'next/navigation'
import { Button } from '@mui/material'

export default function Page() {
  return (
    redirect('/login')
  )
}