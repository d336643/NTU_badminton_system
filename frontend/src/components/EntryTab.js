import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ShowApplicant from './ShowApplicant';
import ShowSchedule from './ShowSchedule';

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
export default function BasicTabs({manageType}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
        <>
            <h3 style={{ marginBottom: '1%' }}>{TYPE[Number(manageType)]}</h3>
            <Tabs 
                value={value} 
                onChange={handleChange} 
                variant="scrollable"
                scrollButtons="auto"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="男單" {...a11yProps(0)} />
                <Tab label="女單" {...a11yProps(1)} />
                <Tab label="男雙" {...a11yProps(2)} />
                <Tab label="女雙" {...a11yProps(3)} />
                <Tab label="混雙" {...a11yProps(4)} />
            </Tabs>
            {Array.from(Array(5)).map((_, index) => (
                <TabPanel value={value} index={index}>
                    { manageType === 0 ?
                        <ShowApplicant dataId={Number(index)} />
                        : 
                        manageType === 1 ? 
                            <></>
                            :
                            manageType === 2 ? 
                                <></>
                                :
                                manageType === 3 ? 
                                    <ShowSchedule dataId={Number(index)} />
                                    : <></>
                    }
                </TabPanel>
            ))}
        </>
  );
}