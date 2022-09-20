import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { Divider } from '@mui/material';
import Tournament from '../ScheduleGraph/Tournament';
import { SingleSquare, DoubleSquare } from "../ScheduleGraph/Square" // {} if no export default
import { SingleTriangle, DoubleTriangle } from '../ScheduleGraph/Triangle';
import { EVENTENTRY, LETTERS, DEGREECODE } from '../utilities/entry';
import { useNavigate } from "react-router-dom";
import instance from '../instance';

// GroupCompeteId: 1. 三取一 2. 三取二 3. 四取一 4. 四取二
// Square: 1(上),2(下),3(左),4(右)
// Triangle: 1(左上),2(右上),3(下)

const ShowSchedule = ({dataId, department, scheduleType}) => {
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false)
    const token = localStorage.getItem("token")
    const [groupCnt, setGroupCnt] = useState(3)
    const [groupDetail, setGroupDetail] = useState([])
    const [resData, setResData] = useState()

    useEffect(() => {
        console.log(scheduleType);
    }, [])
    
    const getGroup = async () => {
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const res = await instance.get(`/rounds?typeId=${dataId+1}`, config);
            if (res.status === 200) {
                console.log(res.data.data)
                setResData(res.data.data);
                let gCnt = Number(res.data.data.groupCnt);
                setGroupCnt(gCnt);
                let groupLetter = LETTERS.slice(0, gCnt);
                console.log(groupLetter);
                getGroupDetailOf(res.data.data, groupLetter);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getGroupDetailOf = (dict, groupLetter) => {
        let idx = 0;
        const key = Object.keys(dict);
        const value = Object.values(dict);
        const arr = [];
        console.log(key.length)
        for (var i = 0; i < key.length; i++) {
            if ( groupLetter.findIndex((element) => element === key[i]) > -1) {
                arr.push(value[i]);
            }
        }
        setGroupDetail(groupDetail.concat(arr))
        setGetInfo(true);
    }

    useEffect(() => {
        getGroup()
        // ßonsole.log(groupDetail)
    }, [])

    return (
        <>
            {/* {scheduleType ? 
                <Tournament dataId={dataId}/>
                : */}
                <Grid container columnSpacing={{ xs: 1, md: 2 }}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'center'
                    }}
                >
                    {getInfo ? 
                        dataId <= 1 ?
                            Array.from(Array(groupCnt)).map((_, index) => (
                            groupDetail[index][0].groupCompeteId === 1 || groupDetail[index][0].groupCompeteId === 2? 
                                <Grid item key={index} sx={{justifyContent: 'center'}}>
                                    <SingleTriangle 
                                        groupLabel={LETTERS[index]} 
                                        detail={groupDetail[index]}
                                        viewType={"show"}
                                        // department={department}
                                    />
                                </Grid> 
                                :   
                                    <Grid item key={index} sx={{justifyContent: 'center'}}>
                                        <SingleSquare 
                                            groupLabel={LETTERS[index]}
                                            detail={groupDetail[index]}
                                            viewType={"show"}
                                            // department={department}
                                        />
                                </Grid>
                            )) 
                            :
                            Array.from(Array(groupCnt)).map((_, index) => (
                                groupDetail[index][0].groupCompeteId === 1 || groupDetail[index][0].groupCompeteId === 2? 
                                    <Grid item key={index} sx={{justifyContent: 'center'}}>
                                        <DoubleTriangle 
                                            groupLabel={LETTERS[index]} 
                                            detail={groupDetail[index]}
                                            viewType={"show"}
                                            // department={department}
                                        />
                                    </Grid>
                                    : 
                                        <Grid item key={index} sx={{justifyContent: 'center'}}>
                                            <DoubleSquare 
                                                groupLabel={LETTERS[index]}
                                                detail={groupDetail[index]}
                                                // department={department}
                                                viewType={"show"}
                                            />
                                        </Grid>
                            )):
                        <></>
                    }
                </Grid>
                {getInfo ? 
                    <Tournament dataId={dataId}/> : <></>
                }
            {/* } */}
        </>
    )
}

export default ShowSchedule;
