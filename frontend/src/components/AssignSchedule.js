import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container component="main" maxWidth="md">
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                // borderBottom: 1, 
                // borderColor: 'divider'
            }}
        >
            <h3 style={{ marginBottom: '2%', marginTop: "5%" }}>排定賽程</h3>
            {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}> */}
            <Tabs 
                value={value} 
                onChange={handleChange} 
                aria-label="basic tabs example"
                textColor="primary"
                indicatorColor="primary"
            >
                <Tab label="男單" {...a11yProps(0)} />
                <Tab label="女單" {...a11yProps(1)} />
                <Tab label="男雙" {...a11yProps(2)} />
                <Tab label="女雙" {...a11yProps(3)} />
                <Tab label="混雙" {...a11yProps(4)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                男單
            </TabPanel>
            <TabPanel value={value} index={1}>
                女單
            </TabPanel>
            <TabPanel value={value} index={2}>
                男雙
            </TabPanel>
            <TabPanel value={value} index={3}>
                女雙
            </TabPanel>
            <TabPanel value={value} index={4}>
                混雙
            </TabPanel>
        </Box>
    </Container>
  );
}