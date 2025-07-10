'use client'
import React, { useEffect, useState } from 'react'
import styles from './user-table.module.scss'
import SideNav from '../components/SideNav'
import UserTableData from '../components/UserTableData'
import axios from 'axios'
import useSWR from 'swr'
import { Typography } from '@mui/material'
import { useRouter } from 'next/navigation'

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function UserTable() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check')
        if (response.data.authenticated) {
          setIsAuthenticated(true)
        } else {
          router.push('/login')
        }
      } catch (error) {
        console.error('Authentication check failed:', error)
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
  } = useSWR("/api/users", fetcher);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
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