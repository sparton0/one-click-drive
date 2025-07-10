'use client'
import React from 'react'
import styles from './index.module.scss'
import { FaHome, FaUser, FaChartLine, FaSignOutAlt } from 'react-icons/fa'
import logo from '@/assets/mainLogo.png'
import logoSec from '@/assets/logo-aboutus1.png'
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi2";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
function SideNav() {
    const router = useRouter()
     const handleLogout = async () => {
        try {
            await axios.post('/api/auth/logout')
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
        }
    }
    return (
        <div className={styles.side_nav}>
            <div className={styles.logo} onClick={()=>{
                router.push('/')
            }}>
                <Image src={logo} alt="logo" width={50} height={25} />
                <div className={styles.logo_sec}>
                    <Image src={logoSec} alt="logo" width={150} height={40} />
                </div>
            </div>
            <div className={styles.nav_items_container}>
                <div className={styles.nav_items_container_1}>
                    <div className={styles.nav_items} onClick={()=>{
                        router.push('/')
                    }}>
                        <div className={styles.nav_item}>
                            <HiOutlineHome className={styles.nav_icon} />
                            <span className={styles.nav_text}>Dashboard</span>
                        </div>

                    </div>

                    <div className={styles.nav_items} onClick={()=>{
                        router.push('/user-table')
                    }}>
                        <div className={styles.nav_item}>
                            <HiOutlineUserGroup className={styles.nav_icon} />
                            <span className={styles.nav_text}>User Table</span>
                        </div>

                    </div>

                    <div className={styles.nav_items} onClick={()=>{
                        router.push('/settings')
                    }}>
                        <div className={styles.nav_item}>
                            <IoSettingsOutline className={styles.nav_icon} />
                            <span className={styles.nav_text}>Settings</span>
                        </div>

                    </div>
                </div>
                <div className={styles.nav_items1}  onClick={handleLogout}>
                        <div className={styles.nav_item}>
                            <IoLogOutOutline 
                           
                            className={styles.nav_icon} />
                            <span className={styles.nav_text}>Logout</span>
                        </div>

                    </div>
            </div>
        </div>
    )
}

export default SideNav