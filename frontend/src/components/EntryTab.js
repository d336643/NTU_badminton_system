import * as React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Typography, Box, Alert } from '@mui/material';
import ShowApplicant from './ShowApplicant';
import ShowSchedule from './ShowSchedule';
import AssignSchedule from './AssignSchedule';
import EditSchedule from './EditSchedule';
import { EVENTENTRY } from '../utilities/entry';

const TYPE = ['報名、繳費狀態', '排定賽程', '修改賽程', '檢視賽程']

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

// manageType: 0: show applicant status, 1: assign schedule, 2: edit schedule, 3: show schedule
export default function BasicTabs({manageType, department}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
        <Box
          sx={{
              marginTop: "3%",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
          }}
        >
            <h3 style={{ marginBottom: '1%' }}>{TYPE[Number(manageType)]}－{EVENTENTRY[Number(value)]}</h3>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="男單" {...a11yProps(0)} style={{minWidth:"20%"}}/>
                <Tab label="女單" {...a11yProps(1)} style={{minWidth:"20%"}}/>
                <Tab label="男雙" {...a11yProps(2)} style={{minWidth:"20%"}}/>
                <Tab label="女雙" {...a11yProps(3)} style={{minWidth:"20%"}}/>
                <Tab label="混雙" {...a11yProps(4)} style={{minWidth:"20%"}}/>
            </Tabs>
            {manageType === 2 ?
              <Alert severity="info" maxWidth="sm" size="small">
                欲修改賽程請點擊的參賽者，使其跳至待修改區域
              </Alert> : <></>
            }
            {Array.from(Array(5)).map((_, index) => (
                <TabPanel value={value} index={index} style={{ marginTop: '-30px' }}>
                    { manageType === 0 ?
                        <ShowApplicant dataId={Number(index)} />
                        : 
                        manageType === 1 ? 
                            <AssignSchedule dataId={Number(index)} />
                            :
                            manageType === 2 ? 
                                <EditSchedule dataId={Number(index)} department={department} />
                                :
                                manageType === 3 ? 
                                    <ShowSchedule dataId={Number(index)} department={department}  />
                                    : <></>
                    }
                </TabPanel>
            ))}
        </Box>
  );
}