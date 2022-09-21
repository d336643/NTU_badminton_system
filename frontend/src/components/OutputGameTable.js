import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { SingleTableDetial, DoubleTableDetial} from './TableDetail';
import { LETTERS } from '../utilities/entry';
import { useNavigate } from "react-router-dom";
import instance from '../instance';

const OutPut = ({dataId}) => {
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false)
    const token = localStorage.getItem("token")
    const [groupCnt, setGroupCnt] = useState(3)
    const [groupDetail, setGroupDetail] = useState([])
    const [resData, setResData] = useState()

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
                // console.log(res.data.data)
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

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    function print() {
        window.print();
    }

    return (
        <>
            {getInfo ?
                <Box
                    sx={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        sx={{marginBottom: '10px'}}
                        onClick={() => openInNewTab(`/printgametable/type=${dataId}`)}
                        >
                        匯出出賽單
                    </Button>
                    <div id='printMe'>
                        {dataId <= 1 ?
                            Array.from(Array(groupCnt)).map((_, index) => (
                                <SingleTableDetial dataId={dataId} detail={groupDetail[index]}/>
                            )) 
                            :
                            Array.from(Array(groupCnt)).map((_, index) => (
                                <DoubleTableDetial dataId={dataId} detail={groupDetail[index]} />
                            ))
                        }
                    </div>
                </Box>
                : <></>
            }
        </>
    )
}

export default OutPut;
