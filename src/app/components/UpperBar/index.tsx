'use client'
import React, { useState } from 'react'
import styles from './index.module.scss'
import { FaUserCircle } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import { useTheme } from 'next-themes'
import Modal from '../Modal'
import Notification from '../Notification'
import { useRouter } from 'next/navigation'
import axios from 'axios'

function UpperBar() {
    const { theme, setTheme } = useTheme()
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const router = useRouter()
    
    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    // const handleLogout = async () => {
    //     try {
    //         await axios.post('/api/auth/logout')
    //         router.push('/login')
    //     } catch (error) {
    //         console.error('Logout error:', error)
    //     }
    // }

    return (
        <>
            <div className={styles.upper_bar}>
                <h1 className={styles.upper_bar_title}>Hello, Admin</h1>
                <div className={styles.upper_bar_profile_container}>
                    {theme === 'dark' ? (
                        <MdLightMode
                            className={styles.upper_bar_profile}
                            onClick={toggleTheme}
                        />
                    ) : (
                        <MdDarkMode
                            className={styles.upper_bar_profile}
                            onClick={toggleTheme}
                        />
                    )}
                    <IoIosNotifications
                        onClick={() => setIsNotificationOpen(true)}
                        className={styles.upper_bar_profile} />
                    <FaUserCircle className={styles.upper_bar_profile} />
                    {/* <MdLogout 
                        className={styles.upper_bar_profile} 
                        onClick={handleLogout}
                        title="Logout"
                    /> */}
                </div>
            </div>
            {isNotificationOpen && (
                <Modal
                    modalContent={
                        <Notification
                            setNotificationModal={setIsNotificationOpen}
                            filteredNotifications={[]}
                        />
                    }
                    showCloseModalBtn={false}
                    modalPosition="center"
                    modalContainerStyles={{
                        margin: "auto",
                        borderRadius: "5px",
                        width: "30rem",
                        height: "33rem",
                        position: "absolute",
                        right: "3rem",
                        top: "5rem",
                      }}
                    setOpenModal={() => {
                        setIsNotificationOpen(false);
                    }}
                />
            )}
        </>
    )
}

export default UpperBar
// {isNotificationOpen ? (
//     <Modal
//       modalContent={
//
//       }
//       showCloseModalBtn={true}
//       modalPosition="center"
//       modalContainerStyles={{
//         margin: "auto",
//         borderRadius: "10px",
//         width: "75vw",
//       }}
//       setOpenModal={() => {
//         setIsNotificationOpen(null);
//       }}

