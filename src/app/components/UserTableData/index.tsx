import React from 'react'
import styles from './index.module.scss'

import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MdModeEdit, MdCheckCircle, MdAdd } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import axios from 'axios';
import Modal from '../Modal'
import EditModel from '../EditModel';
import { Button } from '@mui/material';
import { message } from 'antd';
interface RowData {
    id: number;
    name: string;
    phone: string;
    car_model: string;
    duration: string;
    status: string;
}

function UserTableData({usersData, userDataLoading, userError, mutateUsers}: {usersData: any, userDataLoading: boolean, userError: any, mutateUsers: any}) {
    const columns: GridColDef<RowData>[] = [
        { field: 'id', headerName: 'ID', width: 50, type: 'number' },
        { field: 'name', headerName: 'Name', width: 200, type: 'string' },
        { field: 'phone', headerName: 'Phone', width: 150, type: 'string' },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'state', headerName: 'State', width: 150 },
        { field: 'zip', headerName: 'Zip', width: 150 },
        { field: 'status', headerName: 'Status', width: 150, type: 'string' },
       
    ];
    const rows: RowData[] = usersData?.data;

    return (
        <div className={styles.table_data}>
        <DataGrid<RowData>
            rows={rows}
            columns={columns}
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