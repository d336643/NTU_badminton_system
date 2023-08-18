import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { 
    Box,
    ListItem, 
    ListItemText,  
    Autocomplete, 
    TextField, 
    Button
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { SingleSquare, DoubleSquare } from "../scheduleGraph/Square";
import { SingleTriangle, DoubleTriangle } from '../scheduleGraph/Triangle';
import { EVENTENTRY, LETTERS } from '../utilities/entry';

import { instance, getCommonConfig } from '../apiUtilities/instance';

const allGame = [{typeIndex: 1}, {typeIndex: 2}, {typeIndex: 3}]

const EditSchedule = ({dataId}) => {
    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false);
    const [groupCnt, setGroupCnt] = useState(0);
    const [groupDetail, setGroupDetail] = useState([]);
    const [resData, setResData] = useState();
    const [editNum, setEditNum] = useState(0);

    
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
            {/* {getInfo ?  */}
                <Box
                    sx={{
                        mt: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box sx={{ position: 'sticky', mt: '10px', display: 'flex', flexDirection: 'column'}}>
                        {/* <h>I am sticky! -- 選擇要移動的場次編號及目標場次編號</h> */}
                        {
                            Array.from(Array(editNum)).map((_, index) => (
                                <>
                                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                    <ListItemText sx={{ gridColumn: '1/3' }} id="source" primary="欲修改場次" />
                                    <Autocomplete 
                                        size="small"
                                        sx={{ gridColumn: '4/8' }}
                                        id="select-source"
                                        options={allGame}
                                        getOptionLabel={(option) => `${option.typeIndex}`}
                                        isOptionEqualToValue={(option, value) => option.typeIndex === value.typeIndex}
                                        defaultValue={'請選擇場次編號'}
                                        onChange={(event, newValue, reason) => {
                                            // setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} 
                                            />
                                        }
                                    />
                                </ListItem>
                                <ListItem sx={{ display: 'grid', gridAutoColumns: '1fr'}}>
                                    <ListItemText sx={{ gridColumn: '1/3' }} id="source" primary="目標場次" />
                                    <Autocomplete 
                                        size="small"
                                        sx={{ gridColumn: '4/8' }}
                                        id="select-source"
                                        options={allGame}
                                        getOptionLabel={(option) => `${option.typeIndex}`}
                                        isOptionEqualToValue={(option, value) => option.typeIndex === value.typeIndex}
                                        defaultValue={'請選擇場次編號'}
                                        onChange={(event, newValue, reason) => {
                                            // setCompetitors1(reason === "clear" || reason === "removeOption" ? null : newValue.uid)
                                        }}
                                        renderInput={(params) => 
                                            <TextField {...params} 
                                            />
                                        }
                                    />
                                </ListItem>
                                </>
                            ))
                        }
                        <Button 
                            variant="text"
                            onClick={() => setEditNum(editNum+1)}
                        >
                            <AddIcon />
                            新增編輯場次
                        </Button>
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
                {/* : <></>
            } */}
        </>
    )
}

export default EditSchedule;
