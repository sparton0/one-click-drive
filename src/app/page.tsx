'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.scss'
import UpperBar from './components/UpperBar'
import SideNav from './components/SideNav'
import AnalyticsCards from './components/AnalyticsCards'
import TableData from './components/TableData'
import UserTableData from './components/UserTableData'
import axios from "axios";
import useSWR from 'swr';
import { useRouter } from 'next/navigation'
import { Tabs } from '@mui/material';
import { Tab } from '@mui/material';

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
const fetcher2 = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function Page() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    //  const checkAuth = () => {
    //   const isLoggedIn = localStorage.getItem('isLoggedIn')
    //   if (!isLoggedIn) {
    //     router.push('/login')
    //   } else {
    //     setIsAuthenticated(true)
    //   }
    //   setIsLoading(false)
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
  console.log('usersData',usersData)
  const {
    data: carRequestData,
    mutate: mutateCarRequest,
    error: carRequestError,
    isLoading: carRequestLoading
  } = useSWR("/api/carRequest", fetcher2);
  console.log('carRequestData',carRequestData)
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };
  
  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.brnd_strip}>
          <UpperBar />
          <SideNav />
          <AnalyticsCards />
        </div>
        <TableData carRequestData={carRequestData} mutateCarRequest={mutateCarRequest}/>
      </div>
    </>
  )
}

export default Page