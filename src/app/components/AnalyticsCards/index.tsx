'use client'
import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { FaUsers, FaCar, FaClipboardList } from 'react-icons/fa'
import useSWR from 'swr'
import axios from 'axios'

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

function AnalyticsCards() {
  const { data: usersData } = useSWR("/api/users", fetcher);
  const { data: carRequestData } = useSWR("/api/carRequest", fetcher);
  
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    pendingRequests: 0
  });
  
  useEffect(() => {
    if (usersData?.data) {
      setStats(prev => ({
        ...prev,
        totalUsers: usersData.data.length || 0
      }));
    }
    
    if (carRequestData?.data) {
      // Count total cars
      setStats(prev => ({
        ...prev,
        totalCars: carRequestData.data.length || 0
      }));
      
      // Count pending requests
      const pendingRequests = carRequestData.data.filter((request: any) => 
        request.status === 'Pending'
      ).length;
      
      setStats(prev => ({
        ...prev,
        pendingRequests
      }));
    }
  }, [usersData, carRequestData]);

  return (
    <div className={styles.main}>
      <div className={styles.card}>
        <div className={styles.icon_container}>
          <FaUsers className={styles.icon} />
        </div>
        <div className={styles.content}>
          <p>Total Users</p>
          <h1>{stats.totalUsers}</h1>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.icon_container}>
          <FaCar className={styles.icon} />
        </div>
        <div className={styles.content}>
          <p>Total Rental Cars</p>
          <h1>{stats.totalCars}</h1>
        </div>
      </div>
      
      <div className={styles.card}>
        <div className={styles.icon_container}>
          <FaClipboardList className={styles.icon} />
        </div>
        <div className={styles.content}>
          <p>Pending Requests</p>
          <h1>{stats.pendingRequests}</h1>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsCards