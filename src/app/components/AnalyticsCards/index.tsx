import React from 'react'
import styles from './index.module.scss'
function AnalyticsCards() {
  return (
    <div className={styles.main}>
        <div className={styles.card}>
            <p>Total Users</p>
            <h1>500</h1>
        </div>
        <div className={styles.card}>
        <p>Total Rental Cars</p>
        <h1>1000</h1>
        </div>
        <div className={styles.card}>
        <p>New Requests</p>
        <h1>100</h1>
        </div>
    </div>
  )
}

export default AnalyticsCards