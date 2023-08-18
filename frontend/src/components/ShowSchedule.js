import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { 
    Grid,
    Box,
    Button,
} from '@mui/material';

import Tournament from '../scheduleGraph/Tournament';
import { SingleSquare, DoubleSquare } from "../scheduleGraph/Square";
import { SingleTriangle, DoubleTriangle } from '../scheduleGraph/Triangle';

import { EVENTENTRY, LETTERS, DEGREECODE } from '../utilities/entry';

import { instance, getCommonConfig } from '../apiUtilities/instance';

// GroupCompeteId: 1. 三取一 2. 三取二 3. 四取一 4. 四取二
// Square: 1(上),2(下),3(左),4(右)
// Triangle: 1(左上),2(右上),3(下)
// const COMPETE = ["三取一", "三取二", "四取一", "四取二"]
let cnt = 0;

const ShowSchedule = ({dataId, department, scheduleType, identity}) => {
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false)
    const token = localStorage.getItem("token")
    const [groupCnt, setGroupCnt] = useState(3)
    const [groupDetail, setGroupDetail] = useState([])
    const [resData, setResData] = useState()
    const [resEliData, setResEliData] = useState()
    const [eliRoundArr, setEliRoundArr] = useState([])
    const [winnerInfo, setWinnerInfo] = useState([])

    // useEffect(() => {
    //     console.log(scheduleType);
    // }, [])
    
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
                // console.log(groupLetter);
                getGroupDetailOf(res.data.data, groupLetter);
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getSingleElimination = async () => {
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const res = await instance.get(`/rounds/SingleElimination?typeId=${dataId+1}`, config);
            if (res.status === 200) {
                setResEliData(res.data.data);
                setEliRoundArr(eliRoundArr.concat(res.data.data.rounds));
            }
        } catch (error) {
            // console.log(error);
        }
    }

    const getWinner = async () => {
        const config = {
            headers:{
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const res = await instance.get(`/rounds/winners?typeId=${dataId+1}`, config);
            if (res.status === 200) {
                console.log(res.data.data);
                setWinnerInfo(winnerInfo.concat(res.data.data));
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
        // console.log(key.length)
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
                {getInfo ? 
                    <Box
                        style={{
                            marginTop: '0px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {dataId <= 1 ?
                            Array.from(Array(groupCnt)).map((_, index) => (
                                index % 2 === 0 ?
                                <div class='printgraph' 
                                    style={
                                        // (index+2) % 6 === 0 ?
                                        // {
                                        //     // display: 'grid',
                                        //     gridTemplateColumns: 'repeat(2, 1fr)',
                                        //     pageBreakAfter: 'always',
                                        //     marginTop: '5px',
                                        //     marginBottom: '5px'
                                        // }
                                        // :
                                        {
                                            // display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                        }
                                    }
                                >
                                    {groupDetail[index][0].groupCompeteId <= 2? 
                                        <SingleTriangle 
                                            groupLabel={LETTERS[index]} 
                                            detail={groupDetail[index]}
                                            viewType={"show"}
                                            // department={department}
                                        /> 
                                        : 
                                            <SingleSquare 
                                                groupLabel={LETTERS[index]}
                                                detail={groupDetail[index]}
                                                viewType={"show"}
                                                // department={department}
                                            />
                                    }
                                    {index+1 < groupCnt ?
                                        groupDetail[index+1][0].groupCompeteId <= 2? 
                                            <SingleTriangle 
                                                groupLabel={LETTERS[index+1]} 
                                                detail={groupDetail[index+1]}
                                                viewType={"show"}
                                                // department={department}
                                            /> 
                                            : 
                                            <SingleSquare 
                                                groupLabel={LETTERS[index+1]}
                                                detail={groupDetail[index+1]}
                                                viewType={"show"}
                                                // department={department}
                                            />
                                        : <></>}
                                </div> : <></>
                            ))
                            :
                            Array.from(Array(groupCnt)).map((_, index) => (
                                index % 2 === 0 ?
                                <div class='printgraph' 
                                    style={
                                        // (index + 2) % 6 === 0 ?
                                        // {
                                        //     // display: 'grid',
                                        //     gridTemplateColumns: 'repeat(2, 1fr)',
                                        //     pageBreakAfter: 'always',
                                        //     marginTop: '5px',
                                        //     marginBottom: '5px'
                                        // }
                                        // :
                                        {
                                            // display: 'grid',
                                            gridTemplateColumns: 'repeat(2, 1fr)',
                                        }
                                    }
                                >
                                    {groupDetail[index][0].groupCompeteId <= 2? 
                                        <DoubleTriangle 
                                            groupLabel={LETTERS[index]} 
                                            detail={groupDetail[index]}
                                            viewType={"show"}
                                            // department={department}
                                        /> 
                                        : 
                                            <DoubleSquare 
                                                groupLabel={LETTERS[index]}
                                                detail={groupDetail[index]}
                                                viewType={"show"}
                                                // department={department}
                                            />
                                    }
                                    {index+1 < groupCnt ?
                                        groupDetail[index+1][0].groupCompeteId <= 2? 
                                            <DoubleTriangle 
                                                groupLabel={LETTERS[index+1]} 
                                                detail={groupDetail[index+1]}
                                                viewType={"show"}
                                                // department={department}
                                            /> 
                                            : 
                                            <DoubleSquare 
                                                groupLabel={LETTERS[index+1]}
                                                detail={groupDetail[index+1]}
                                                viewType={"show"}
                                                // department={department}
                                            />
                                        : <></>}
                                </div> : <></>
                            ))
                        }
                        {identity === "manager" ?
                            <div class="no-printme">
                                <Button
                                    sx={{marginTop: '10px', marginBottom: '10px'}}
                                    onClick={() => window.print()}
                                    >
                                    列印
                                </Button>
                            </div> : <></>
                        }
                        <div class='no-printme' 
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center'
                            }}>
                            {dataId <= 1 ?
                                Array.from(Array(groupCnt)).map((_, index) => (
                                groupDetail[index][0].groupCompeteId <= 2? 
                                    <Grid item key={index} sx={{justifyContent: 'center'}}>
                                        {/* {identity === "manager" ? <p class='no-printme'>{COMPETE[Number(groupDetail[index][0].groupCompeteId)-1]}</p> :<></>} */}
                                        <div class='no-printme'>
                                            <SingleTriangle 
                                                groupLabel={LETTERS[index]} 
                                                detail={groupDetail[index]}
                                                viewType={"show"}
                                                // department={department}
                                            />
                                        </div>
                                    </Grid> 
                                    :   
                                        <Grid item key={index} sx={{justifyContent: 'center'}}>
                                            {/* {identity === "manager" ? <p class='no-printme'>{COMPETE[Number(groupDetail[index][0].groupCompeteId)-1]}</p> :<></>} */}
                                            <div class='no-printme'>
                                                <SingleSquare 
                                                    groupLabel={LETTERS[index]}
                                                    detail={groupDetail[index]}
                                                    viewType={"show"}
                                                    // department={department}
                                            /></div>
                                    </Grid>
                                )) 
                                :
                                Array.from(Array(groupCnt)).map((_, index) => (
                                    groupDetail[index][0].groupCompeteId <= 2? 
                                        <Grid item key={index} sx={{justifyContent: 'center'}}>
                                            {/* {identity === "manager" ? <p class='no-printme'>{COMPETE[Number(groupDetail[index][0].groupCompeteId)-1]}</p> :<></>} */}
                                            <div class='no-printme'>
                                                <DoubleTriangle 
                                                    groupLabel={LETTERS[index]} 
                                                    detail={groupDetail[index]}
                                                    viewType={"show"}
                                                    // department={department}
                                            /></div>
                                        </Grid>
                                        : 
                                            <Grid item key={index} sx={{justifyContent: 'center'}}>
                                                {/* {identity === "manager" ? <p class='no-printme'>{COMPETE[Number(groupDetail[index][0].groupCompeteId)-1]}</p> :<></>} */}
                                                <div class='no-printme'>
                                                    <DoubleSquare 
                                                        groupLabel={LETTERS[index]}
                                                        detail={groupDetail[index]}
                                                        // department={department}
                                                        viewType={"show"}
                                                /></div>
                                            </Grid>
                                ))
                            }
                            <div class="no-printme" style={{width: '85%'}}>
                                <Tournament 
                                    dataId={dataId}
                                />
                            </div>
                        </div>
                        <div class="no-printme">
                            <Button 
                                sx={{mt: '3%'}}
                                variant="outlined"
                                onClick={() => navigate('/schedulehome')}
                            >
                                返回賽程專區
                            </Button>
                        </div>
                </Box>
                : <></>
            }
        </>
    )
}

export default ShowSchedule;
