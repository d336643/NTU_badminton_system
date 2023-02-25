import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Alert } from '@mui/material';
import { SingleSquare, DoubleSquare } from "../ScheduleGraph/Square" // {} if no export default
import { SingleTriangle, DoubleTriangle } from '../ScheduleGraph/Triangle';
import { EVENTENTRY, LETTERS } from '../utilities/entry';
import { useNavigate } from "react-router-dom";
import instance from '../instance';

const EditSchedule = ({dataId}) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false);
    const [groupCnt, setGroupCnt] = useState(0);
    const [groupDetail, setGroupDetail] = useState([]);
    const [resData, setResData] = useState();
    
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
        // console.log(groupDetail)
    }, [])

    return (
        <>
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
                    <Box sx={{position: 'sticky', marginTop: '10px'}}>
                        <h>I am sticky! -- 待修改</h>
                    </Box>
                    {dataId <= 1 ?
                        Array.from(Array(groupCnt)).map((_, index) => (
                            index % 2 === 0 ?
                            <div class='printgraph' 
                                style={
                                    (index+2) % 6 === 0 ?
                                    {
                                        // display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        pageBreakAfter: 'always',
                                        marginTop: '5px',
                                        marginBottom: '5px'
                                    }
                                    :
                                    {
                                        // display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        marginTop: '5px',
                                        marginBottom: '5px'
                                    }
                                }
                            >
                                {groupDetail[index][0].groupCompeteId <= 2? 
                                    <SingleTriangle 
                                        groupLabel={LETTERS[index]} 
                                        detail={groupDetail[index]}
                                        viewType={"edit"}
                                    /> 
                                    : 
                                        <SingleSquare 
                                            groupLabel={LETTERS[index]}
                                            detail={groupDetail[index]}
                                            viewType={"edit"}
                                            // department={department}
                                        />
                                }
                                {index+1 < groupCnt ?
                                    groupDetail[index+1][0].groupCompeteId <= 2? 
                                        <SingleTriangle 
                                            groupLabel={LETTERS[index+1]} 
                                            detail={groupDetail[index+1]}
                                            viewType={"edit"}
                                            // department={department}
                                        /> 
                                        : 
                                        <SingleSquare 
                                            groupLabel={LETTERS[index+1]}
                                            detail={groupDetail[index+1]}
                                            viewType={"edit"}
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
                                    (index + 2) % 6 === 0 ?
                                    {
                                        // display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        pageBreakAfter: 'always',
                                        marginTop: '5px',
                                        marginBottom: '5px'
                                    }
                                    :
                                    {
                                        // display: 'grid',
                                        gridTemplateColumns: 'repeat(2, 1fr)',
                                        marginTop: '5px',
                                        marginBottom: '5px'
                                    }
                                }
                            >
                                {groupDetail[index][0].groupCompeteId <= 2? 
                                    <DoubleTriangle 
                                        groupLabel={LETTERS[index]} 
                                        detail={groupDetail[index]}
                                        viewType={"edit"}
                                        // department={department}
                                    /> 
                                    : 
                                        <DoubleSquare 
                                            groupLabel={LETTERS[index]}
                                            detail={groupDetail[index]}
                                            viewType={"edit"}
                                            // department={department}
                                        />
                                }
                                {index+1 < groupCnt ?
                                    groupDetail[index+1][0].groupCompeteId <= 2? 
                                        <DoubleTriangle 
                                            groupLabel={LETTERS[index+1]} 
                                            detail={groupDetail[index+1]}
                                            viewType={"edit"}
                                        /> 
                                        : 
                                        <DoubleSquare 
                                            groupLabel={LETTERS[index+1]}
                                            detail={groupDetail[index+1]}
                                            viewType={"edit"}
                                        />
                                    : <></>}
                            </div> : <></>
                        ))
                    }
                </Box>
                : <></>
            }
        </>
    )
}

export default EditSchedule;
