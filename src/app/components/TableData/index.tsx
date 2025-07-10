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
    const [loading, setLoading] = useState<{[key: number]: boolean}>({})

    const handleApprove = async (id: number) => {
        try {
            // Set loading state for this specific row
            setLoading(prev => ({ ...prev, [id]: true }))
            
            const response = await axios.post('/api/approveReq', { id })
            
            if (response.data.success) {
                message.success('Request approved')
                // Refresh the data
                mutateCarRequest()
            } else {
                message.error(response.data.message || 'Failed to approve request')
            }
        } catch (error: any) {
            console.error('Error approving request:', error)
            message.error(error.response?.data?.message || 'Failed to approve request. Please try again.')
        } finally {
            // Clear loading state
            setLoading(prev => ({ ...prev, [id]: false }))
        }
    }

    const handleReject = async (id: number) => {
        try {
            // Set loading state for this specific row
            setLoading(prev => ({ ...prev, [id]: true }))
            
            const response = await axios.post('/api/rejectReq', { id })
            
            if (response.data.success) {
                message.success('Request rejected')
                // Refresh the data
                mutateCarRequest()
            } else {
                message.error(response.data.message || 'Failed to reject request')
            }
        } catch (error: any) {
            console.error('Error rejecting request:', error)
            message.error(error.response?.data?.message || 'Failed to reject request. Please try again.')
        } finally {
            // Clear loading state
            setLoading(prev => ({ ...prev, [id]: false }))
        }
    }

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
                const isLoading = loading[params.row.id] || false
                
                return (
                    <div className={styles.action_buttons}>
                        <MdModeEdit 
                            className="MdModeEdit" 
                            onClick={() => {
                                setSelectedRow(params.row)
                                setOpenModal(true)
                            }} 
                        />
                        {params?.row?.status === 'Pending' && <IoIosCloseCircle 
                            className="IoIosCloseCircle"
                            onClick={() => handleReject(params.row.id)}
                            style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        />}
                        {params?.row?.status === 'Pending' && <MdCheckCircle
                            onClick={() => handleApprove(params.row.id)}
                            className="MdCheckCircle"
                            style={{ opacity: isLoading ? 0.5 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
                        />}
                    </div>
                )
            }
        },
    ];

    const rows: RowData[] = carRequestData?.data || [];

    return (
        <>
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