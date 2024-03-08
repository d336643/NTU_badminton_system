import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Container, Alert, Stack, Switch, Button, List } from '@mui/material';
import Register from './Register';
import { useNavigate } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// manageType: 0: show applicant status, 1: assign schedule, 2: edit schedule, 3: show schedule, 4: output game table
export default function BasicTabs({manageType, department, identity}) {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
        <Container
          sx={{
              marginTop: "20px",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
              <List
                  sx={{
                      marginTop: '5%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                  }}
              >
                <h3 style={{ marginBottom: '2%' }}>報名 / 編輯賽事</h3>
                <Alert severity="info" style={{ marginBottom: '3%' }}>
                    <p style={{ marginBottom: '1%'}}>報名賽事前，請詳細閱讀<a href="/competitionrule">競賽章程</a></p>
                    <p>如需報名團體賽，請填寫
                      <a href="https://forms.gle/m6jVoM5tidTkUgje7">
                        團賽報名表單
                      </a>
                    </p>
                    <p><b>報名後不能修改，請確認後再報名</b></p>
                </Alert>
              </List>
              {/* <p>循環賽</p>
              <Switch
                checked={scheduleType}
                onChange={handleSwitch}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <p>單淘汰</p> */}
            </Stack>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="報名賽事" {...a11yProps(0)} style={{minWidth:"20%"}}/>
                <Tab label="編輯賽事" {...a11yProps(1)} style={{minWidth:"20%"}}/>
            </Tabs>
            {Array.from(Array(2)).map((_, index) => (
                <TabPanel value={value} index={index} style={{ marginTop: '-30px', width: '85%'}}>
                    <Register editmode={index == 0 ? false : true} />
                </TabPanel>
            ))}
        </Container>
  );
}
