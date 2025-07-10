import React, { useState } from 'react'   
import styles from './index.module.scss'
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import axios from 'axios'
import { message } from 'antd';
function EditModel({setOpenModal, rowData, mutateCarRequest}:{setOpenModal:any, rowData?: any, mutateCarRequest?: any}) {
    const [formData, setFormData] = useState({
        name: rowData?.name || '',
        phone: rowData?.phone || '',
        car_model: rowData?.car_model || '',
        duration: rowData?.duration || '',
        status: rowData?.status || 'Pending'
    })

    const handleTextFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name as string]: value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axios.post('/api/carRequest', {
                id: rowData?.id,
                ...formData
            })
            message.success('Request updated')
            if(mutateCarRequest) {
                mutateCarRequest()
            }
            setOpenModal(false)
        } catch (error) {
            console.error('Error updating data:', error)
        }
    }

    return (
        <div className={styles.edit_model}>
            <h1>{rowData ? 'Edit Request' : 'Add New Request'}</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleTextFieldChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleTextFieldChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Car Model"
                    name="car_model"
                    value={formData.car_model}
                    onChange={handleTextFieldChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Rental Duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleTextFieldChange}
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        label="Status"
                        onChange={handleSelectChange}
                        required
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Approved">Approved</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.button_container}>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        className={styles.save_button}
                    >
                        Save
                    </Button>
                    <Button 
                        variant="outlined" 
                        color="secondary" 
                        onClick={() => setOpenModal(false)}
                        className={styles.cancel_button}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default EditModel

