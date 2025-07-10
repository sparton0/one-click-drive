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
interface RowData {
    id: number;
    name: string;
    phone: string;
    car_model: string;
    duration: string;
    status: string;
}

function TableData({ carRequestData, mutateCarRequest }: { carRequestData: any, mutateCarRequest: any }) {
    const [openModal, setOpenModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState<RowData | null>(null)

    const columns: GridColDef<RowData>[] = [
        { field: 'id', headerName: 'ID', width: 50, type: 'number' },
        { field: 'name', headerName: 'Name', width: 200, type: 'string' },
        { field: 'phone', headerName: 'Phone', width: 150, type: 'string' },
        { field: 'car_model', headerName: 'Car Model', width: 150, type: 'string' },
        { field: 'duration', headerName: 'Rental Duration', width: 150, type: 'string' },
        // { field: 'city', headerName: 'City', width: 150 },
        // { field: 'state', headerName: 'State', width: 150 },
        // { field: 'zip', headerName: 'Zip', width: 150 },
        { field: 'status', headerName: 'Status', width: 150, type: 'string' },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            align: 'center',
            headerAlign: 'center',
            type: 'actions',
            renderCell: (params: any) => {
                console.log('params', params)
                return (
                    <div className={styles.action_buttons}>
                        <MdModeEdit 
                            className="MdModeEdit" 
                            onClick={() => {
                                setSelectedRow(params.row)
                                setOpenModal(true)
                            }} 
                        />
                        {params?.row?.status === 'Pending' && <IoIosCloseCircle className="IoIosCloseCircle"
                            onClick={async () => {
                                const response = await axios.post('/api/rejectReq', { id: params?.row?.id })
                                message.success('Request rejected')
                                mutateCarRequest()
                            }}
                        />}
                        {params?.row?.status === 'Pending' && <MdCheckCircle
                            onClick={async () => {
                                const response = await axios.post('/api/approveReq', { id: params?.row?.id })
                                message.success('Request approved')
                                mutateCarRequest()
                            }}
                            className="MdCheckCircle" />}
                    </div>
                )
            }
        },
    ];

    const rows: RowData[] = carRequestData?.data;

    return (
        <>
            {/* <div className={styles.table_header}>
                <h2>Car Requests</h2>
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<MdAdd />}
                    onClick={() => {
                        setSelectedRow(null)
                        setOpenModal(true)
                    }}
                >
                    Add New Request
                </Button>
            </div> */}
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
            {
                openModal && (
                    <Modal
                        modalContent={
                            <EditModel
                                setOpenModal={setOpenModal}
                                rowData={selectedRow}
                                mutateCarRequest={mutateCarRequest}
                            />
                        }
                        showCloseModalBtn={false}
                        modalPosition="center"
                        modalContainerStyles={{
                            margin: "auto",
                            borderRadius: "16px",
                            maxWidth: "70vw",
                            maxHeight: "80vh",
                          }}
                        setOpenModal={() => {
                            setOpenModal(false);
                        }}
                    />
                )
            }
        </>
    )
}

export default TableData