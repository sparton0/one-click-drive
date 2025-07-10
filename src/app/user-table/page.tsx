'use client'
import React, { useEffect, useState } from 'react'
import styles from './user-table.module.scss'
import SideNav from '../components/SideNav'
import UserTableData from '../components/UserTableData'
import axios from 'axios'
import useSWR from 'swr'
import { Typography, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(`Fetched data from ${url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
};

function UserTable() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check')
        if (response.data.authenticated) {
          setIsAuthenticated(true)
        } else {
          setAuthError('Not authenticated')
          router.push('/login')
        }
      } catch (error: any) {
        console.error('Authentication check failed:', error)
        setAuthError(error.message || 'Authentication check failed')
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const {
    data: usersData,
    mutate: mutateUsers,
    error: userError,
    isLoading: userDataLoading
  } = useSWR("/api/users", fetcher, {
    onError: (error) => {
      console.error("SWR error fetching users:", error);
    },
    revalidateOnFocus: false,
    dedupingInterval: 10000
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (authError) {
    return (
      <div className={styles.error}>
        <p>Authentication Error: {authError}</p>
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => router.push('/login')}
        >
          Go to Login
        </Button>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={styles.user_table_container}>
      <SideNav />
      <div className={styles.user_table_content}>
       
        <UserTableData 
          usersData={usersData} 
          userDataLoading={userDataLoading} 
          userError={userError} 
          mutateUsers={mutateUsers}
        />
      </div>
    </div>
  )
}

export default UserTable