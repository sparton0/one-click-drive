'use client'
import React, { useState } from 'react'
import styles from './settings.module.scss'
import SideNav from '../components/SideNav'
import { Tabs, Tab, Box, Typography, TextField, Button, Switch, FormControlLabel, Divider, Card, CardContent } from '@mui/material'
import { MdPerson, MdNotifications, MdSecurity, MdBrush, MdLanguage } from 'react-icons/md'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      className={styles.tab_panel}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Settings() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={styles.settings_container}>
      <SideNav />
      <div className={styles.settings_content}>
        <Typography variant="h4" component="h1" className={styles.settings_title}>
          Settings
        </Typography>
        
        <Card className={styles.settings_card}>
          <CardContent className={styles.settings_card_content}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className={styles.tabs_container}>
              <Tabs 
                value={value} 
                onChange={handleChange} 
                orientation="vertical"
                className={styles.tabs}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab icon={<MdPerson />} iconPosition="start" label="Profile" className={styles.tab} />
                <Tab icon={<MdNotifications />} iconPosition="start" label="Notifications" className={styles.tab} />
                <Tab icon={<MdSecurity />} iconPosition="start" label="Security" className={styles.tab} />
                <Tab icon={<MdBrush />} iconPosition="start" label="Appearance" className={styles.tab} />
                <Tab icon={<MdLanguage />} iconPosition="start" label="Language" className={styles.tab} />
              </Tabs>
            </Box>
            
            <div className={styles.tab_panels}>
              <TabPanel value={value} index={0}>
                <Typography variant="h6" gutterBottom>Profile Settings</Typography>
                <Divider className={styles.divider} />
                
                <form className={styles.form}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue="Admin User"
                    margin="normal"
                    className={styles.input}
                  />
                  <TextField
                    fullWidth
                    label="Email Address"
                    defaultValue="admin@onclickdrive.com"
                    margin="normal"
                    className={styles.input}
                  />
                  <TextField
                    fullWidth
                    label="Phone Number"
                    defaultValue="+971 55 123 4567"
                    margin="normal"
                    className={styles.input}
                  />
                  <TextField
                    fullWidth
                    label="Position"
                    defaultValue="System Administrator"
                    margin="normal"
                    className={styles.input}
                  />
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={styles.button}
                  >
                    Save Changes
                  </Button>
                </form>
              </TabPanel>
              
              <TabPanel value={value} index={1}>
                <Typography variant="h6" gutterBottom>Notification Settings</Typography>
                <Divider className={styles.divider} />
                
                <div className={styles.notification_settings}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email Notifications"
                  />
                  <Typography variant="body2" color="textSecondary" className={styles.setting_description}>
                    Receive email notifications for new car requests
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Push Notifications"
                  />
                  <Typography variant="body2" color="textSecondary" className={styles.setting_description}>
                    Receive push notifications for new car requests
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="SMS Notifications"
                  />
                  <Typography variant="body2" color="textSecondary" className={styles.setting_description}>
                    Receive SMS notifications for new car requests
                  </Typography>
                  
                  <FormControlLabel
                    control={<Switch />}
                    label="Marketing Communications"
                  />
                  <Typography variant="body2" color="textSecondary" className={styles.setting_description}>
                    Receive marketing communications and newsletters
                  </Typography>
                </div>
              </TabPanel>
              
              <TabPanel value={value} index={2}>
                <Typography variant="h6" gutterBottom>Security Settings</Typography>
                <Divider className={styles.divider} />
                
                <form className={styles.form}>
                  <TextField
                    fullWidth
                    label="Current Password"
                    type="password"
                    margin="normal"
                    className={styles.input}
                  />
                  <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    margin="normal"
                    className={styles.input}
                  />
                  <TextField
                    fullWidth
                    label="Confirm New Password"
                    type="password"
                    margin="normal"
                    className={styles.input}
                  />
                  
                  <Button 
                    variant="contained" 
                    color="primary" 
                    className={styles.button}
                  >
                    Update Password
                  </Button>
                  
                  <Divider className={styles.divider} style={{ margin: '2rem 0' }} />
                  
                  <Typography variant="h6" gutterBottom>Two-Factor Authentication</Typography>
                  <FormControlLabel
                    control={<Switch />}
                    label="Enable Two-Factor Authentication"
                  />
                  <Typography variant="body2" color="textSecondary" className={styles.setting_description}>
                    Add an extra layer of security to your account
                  </Typography>
                </form>
              </TabPanel>
              
              <TabPanel value={value} index={3}>
                <Typography variant="h6" gutterBottom>Appearance Settings</Typography>
                <Divider className={styles.divider} />
                
                <div className={styles.appearance_settings}>
                  <Typography variant="subtitle1" gutterBottom>Theme</Typography>
                  <div className={styles.theme_options}>
                    <Card className={`${styles.theme_card} ${styles.theme_card_active}`}>
                      <CardContent>
                        <Typography>Light</Typography>
                      </CardContent>
                    </Card>
                    <Card className={styles.theme_card}>
                      <CardContent>
                        <Typography>Dark</Typography>
                      </CardContent>
                    </Card>
                    <Card className={styles.theme_card}>
                      <CardContent>
                        <Typography>System</Typography>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Typography variant="subtitle1" gutterBottom style={{ marginTop: '2rem' }}>Font Size</Typography>
                  <div className={styles.font_size_slider}>
                    <Typography variant="body2">Small</Typography>
                    <input type="range" min="1" max="3" defaultValue="2" className={styles.slider} />
                    <Typography variant="body2">Large</Typography>
                  </div>
                </div>
              </TabPanel>
              
              <TabPanel value={value} index={4}>
                <Typography variant="h6" gutterBottom>Language Settings</Typography>
                <Divider className={styles.divider} />
                
                <div className={styles.language_settings}>
                  <Typography variant="subtitle1" gutterBottom>Select Language</Typography>
                  <div className={styles.language_options}>
                    <Card className={`${styles.language_card} ${styles.language_card_active}`}>
                      <CardContent>
                        <Typography>English</Typography>
                      </CardContent>
                    </Card>
                    <Card className={styles.language_card}>
                      <CardContent>
                        <Typography>Arabic</Typography>
                      </CardContent>
                    </Card>
                    <Card className={styles.language_card}>
                      <CardContent>
                        <Typography>French</Typography>
                      </CardContent>
                    </Card>
                    <Card className={styles.language_card}>
                      <CardContent>
                        <Typography>Spanish</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabPanel>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Settings 