'use client'
import React, { useState } from 'react'
import styles from './index.module.scss'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdModeEdit, MdCheckCircle, MdAdd } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';
import Modal from '../Modal'
import EditModel from '../EditModel';
import { Button } from '@mui/material';
import { message } from 'antd';
import { CircularProgress } from '@mui/material';

interface UserRowData {
    id: number;
    name: string;
    phone: string;
    city: string;
    state: string;
    zip: string;
    status: string;
}

function UserTableData({usersData, userDataLoading, userError, mutateUsers}: {usersData: any, userDataLoading: boolean, userError: any, mutateUsers: any}) {
    const columns: GridColDef<UserRowData>[] = [
        { field: 'id', headerName: 'ID', width: 50, type: 'number' },
        { field: 'name', headerName: 'Name', width: 200, type: 'string' },
        { field: 'phone', headerName: 'Phone', width: 150, type: 'string' },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'zip', headerName: 'Zip', width: 150 },
        { field: 'status', headerName: 'Status', width: 150, type: 'string' },
    ];
    
    // Safely extract rows and handle empty data
    const rows: UserRowData[] = usersData?.data || [];
    
    // Handle loading state
    if (userDataLoading) {
        return (
            <div className={styles.loading_container}>
                <CircularProgress />
                <p>Loading user data...</p>
            </div>
        );
    }
    
    // Handle error state
    if (userError) {
        return (
            <div className={styles.error_container}>
                <p>Error loading user data. Please try again.</p>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => mutateUsers()}
                >
                    Retry
                </Button>
            </div>
        );
    }
    
    // Handle empty data
    if (!rows || rows.length === 0) {
        return (
            <div className={styles.empty_container}>
                <p>No user data available.</p>
            </div>
        );
    }

    return (
        <div className={styles.table_data}>
            <DataGrid<UserRowData>
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10, 25]}
                sx={{
                    display: "grid",
                    fontFamily: "var(--main-font)",
                    fontSize: "1.5rem",
                    '& .MuiDataGrid-cell': {
                        padding: '8px',
                    },
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: 'var(--bg-card)',
                        color: 'var(--text-color)',
                    },
                    '& .MuiDataGrid-cell--textCenter': {
                        justifyContent: 'center',
                    },
                }}
            />
        </div>
    )
}

export default UserTableData