import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import { SingleTableDetial, DoubleTableDetial, AdvTableDetial} from './TableDetail';
import { LETTERS, GAME } from '../utilities/entry';
import { useNavigate } from "react-router-dom";
import instance from '../instance';

const OutPut = ({dataId}) => {
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false)
    const token = localStorage.getItem("token")
    const [groupCnt, setGroupCnt] = useState(0)
    const [groupDetail, setGroupDetail] = useState([])

    // useEffect(() => {
    //     console.log(scheduleType);
    // }, [])
    
    const getGroup = async () => {
        if (dataId !== 5) {
            const config = {
                headers:{
                    'Authorization': 'Bearer ' + token
                }
            }
            try {
                const res = await instance.get(`/rounds?typeId=${dataId+1}`, config);
                if (res.status === 200) {
                    // console.log(res.data.data)
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

    return (
        <>
            {dataId === 5 ?
                <Box
                    sx={{
                        marginTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div class="no-printme">
                        <Button
                            sx={{marginTop: '10px', marginTop: '20px', marginBottom: '-25px'}}
                            onClick={() => window.print()}
                            >
                            列印
                        </Button>
                    </div>
                    <div class='printMe'>
                        <AdvTableDetial />
                    </div>
                </Box>
                :
                getInfo ?
                <Box
                    sx={{
                        marginTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div class="no-printme">
                        <Button
                            sx={{marginTop: '10px', marginBottom: '10px'}}
                            onClick={() => window.print()}
                            >
                            列印
                        </Button>
                    </div>
                    {dataId <= 1 ?
                        Array.from(Array(groupCnt)).map((_, index) => (
                            <div class='printMe'>
                                <SingleTableDetial dataId={dataId} detail={groupDetail[index]}/>
                            </div>
                        )) 
                        :
                        Array.from(Array(groupCnt)).map((_, index) => (
                            <div class='printMe'>
                                <DoubleTableDetial dataId={dataId} detail={groupDetail[index]} />
                            </div>
                        ))
                    }
                </Box>
                : <></>
            }
        </>
    )
}

export default OutPut;
