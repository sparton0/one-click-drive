'use client'
import React, { useState, useEffect } from 'react'
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import styles from './login.module.scss'
import logo from '@/assets/logo_sec.png'
import Image from 'next/image'
import { message } from 'antd';
function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/auth/check')
        if (response.data.authenticated) {
          router.push('/')
        }
      } catch (error) {
        // message.error('Login failed')
        console.error('Auth check error:', error)
      } finally {
        setIsCheckingAuth(false)
      }
    }
    
    checkAuth()
  }, [router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post('/api/auth/login', formData)
      
      if (response.data.success) {
        message.success('Login successful')

        router.push('/')
      } else {
        setError(response.data.message || 'Login failed')
      }
    } catch (error: any) {
      setError(error.response?.data?.message || 'Invalid email or password')
      message.error('Login failed')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (isCheckingAuth) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <Container component="main" maxWidth="xs" className={styles.login_container}>
      <Paper elevation={3} className={styles.paper}>
        <div className={styles.logo_container}>
          <Image src={logo} alt="logo"
          width={130}
          height={40}
          className={styles.logo} />
        </div>
        <div className={styles.title}>
          Admin Login
        </div>
        <Box component="form" onSubmit={handleSubmit} className={styles.form}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          {error && (
            <Typography color="error" align="center" className={styles.error}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
            className={styles.submit_button}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default Login