import * as React from 'react';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { 
    Tabs, 
    Tab, 
    Typography, 
    Box, 
    Alert, 
    Stack,
} from '@mui/material';

import ShowOtherApplicant from './ShowOtherApplicant';
import ShowApplicant from './ShowApplicant';
import ShowSchedule from './ShowSchedule';
import AssignSchedule from './AssignSchedule';
import EditSchedule from './EditSchedule';
import OutputGameTable from './OutputGameTable';

import { EVENTENTRY } from '../utilities/entry';

const TYPE = ['報名、繳費狀態', '排定賽程', '修改賽程', '檢視賽程', '匯出出賽單']

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
export default function BasicTabs({ manageType, view }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <h3 className="no-printme" style={{ marginBottom: '20px' }}>
                    {TYPE[Number(manageType > 0 ? manageType : 0)]}－{EVENTENTRY[Number(value)]}
                </h3>
            </Stack>
            <div className="no-printme">
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
            </div>
            {manageType === 2 && (
                <Alert severity="info" maxWidth="sm" size="small">
                    欲修改賽程請選擇要移動的場次編號及目標場次編號
                </Alert>
            )}
            {manageType === 3 && (
                <div className="no-printme">
                    <Alert severity="info" maxWidth="sm" size="small">
                        四角循環皆取二名晉級；三角循環除女單取二名，其餘皆取一名。
                    </Alert>
                </div>
            )}
            {Array.from(Array(5)).map((_, index) => (
                <TabPanel key={index} value={value} index={index} style={{ marginTop: '-30px' }}>
                    { manageType >= 0 ? (
                        manageType === 0 ? (
                            <ShowApplicant dataId={Number(index)} />
                        ) : manageType === 1 ? (
                            <AssignSchedule dataId={Number(index)} />
                        ) : manageType === 2 ? (
                            <EditSchedule dataId={Number(index)} />
                        ) : manageType === 3 ? (
                            <ShowSchedule dataId={Number(index)} view={view} />
                        ) : (
                            <OutputGameTable dataId={Number(index)} />
                        )
                    ) : (
                        <ShowOtherApplicant dataId={Number(index)} />
                    )}
                </TabPanel>
            ))}
        </Box>
    );
}