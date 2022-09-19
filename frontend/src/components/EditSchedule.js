import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, Alert } from '@mui/material';
import { SingleSquare, DoubleSquare } from "../ScheduleGraph/Square" // {} if no export default
import { SingleTriangle, DoubleTriangle } from '../ScheduleGraph/Triangle';
import { EVENTENTRY, LETTERS } from '../utilities/entry';
import { useNavigate } from "react-router-dom";
import instance from '../instance';

const EditSchedule = ({dataId, department}) => {
    const [groupCnt, setGroupCnt] = useState(3)
    const [groupDetail, setGroupDetail] = useState([
        [ // A
            {
                groupIndex: 1,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "euni", "sid": "R00000000", departmentId: '7250', degreeId: 1},
                    { "uid": 9, "username": "ally", "sid": "R111111111", departmentId: '7250', degreeId: 3}
                ],
                player2: [
                    { "uid": 1, "username": "jannie", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Una", "sid": "R333333333", departmentId: '7250', degreeId: 1}
                ]
            },
            {
                groupIndex: 2,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Jake", "sid": "R00000000", departmentId: '7250', degreeId: 4},
                    { "uid": 9, "username": "Alison", "sid": "R111111111", departmentId: '7250', degreeId: 5},
                ],
                player2: [
                    { "uid": 1, "username": "Cece", "sid": "R222222222", departmentId: '7250', degreeId: 6},
                    { "uid": 2, "username": "Kiki", "sid": "R333333333", departmentId: '7250', degreeId: 7},
                ]
            },
            {
                groupIndex: 3,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Audrie", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "Eric", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "jannie", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Una", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
            {
                groupIndex: 4,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "euni", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "ally", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "jannie", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Una", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
        ],
        [ // B
            {
                groupIndex: 1,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "BB", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "B1", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "Jeee", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "UUU", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
            {
                groupIndex: 2,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Cei", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "Oops", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "Hey", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Hi", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
            {
                groupIndex: 3,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Wooooo", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "Lol", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "hahaha", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "youuuuu", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
            {
                groupIndex: 4,
                groupCompeteId: 4,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "kkkk", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "okk", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "jannie", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Una", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
        ],
        [ // C
            {
                groupIndex: 1,
                groupCompeteId: 2,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "BB", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "B1", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "Jeee", "sid": "R222222222", departmentId: '7250', degreeId: 6},
                    { "uid": 2, "username": "UUU", "sid": "R333333333", departmentId: '7250', degreeId: 6},
                ]
            },
            {
                groupIndex: 2,
                groupCompeteId: 2,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Cei", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "Oops", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "Hey", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "Hi", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            },
            {
                groupIndex: 3,
                groupCompeteId: 2,
                typeIndex: null,
                player1: [
                    { "uid": 7, "username": "Wooooo", "sid": "R00000000", departmentId: '7250', degreeId: 2},
                    { "uid": 9, "username": "Lol", "sid": "R111111111", departmentId: '7250', degreeId: 2},
                ],
                player2: [
                    { "uid": 1, "username": "hahaha", "sid": "R222222222", departmentId: '7250', degreeId: 2},
                    { "uid": 2, "username": "youuuuu", "sid": "R333333333", departmentId: '7250', degreeId: 2},
                ]
            }
        ]
    ])

    const [resData, setResData] = useState()
    
    const getInfo = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              'accept':'application/json'
            },
        };
        try {
            const res = await instance.get("/rounds", config);
            if (res.data.success === true) {
                setResData(res.data.data);
                let gCnt = res.data.data.groupCnt;
                setGroupCnt(res.data.data.groupCnt);
                let groupLetter = LETTERS.slice(0, gCnt);
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
        const testArr = value.map(function(x, i) {
            if (key[i] === groupLetter[idx]) {
                idx += 1;
                return value[i];
            }  
        });
        setGroupDetail(groupDetail.concat(testArr))
    }

    useEffect(() => {
        Array.from(Array(groupCnt)).map((_, index) => (
            console.log(groupDetail[index][0])
        ))
    //     getGroup();
    //     console.log(resData);
    }, [])

    return (
        <>
            <Container sx={{display: 'grid', gridAutoColumns: '1fr'}}>
                <Box sx={{gridColumn: '1/4', marginTop: '20px'}}>
                    <Box sx={{position: 'sticky', top: '30px', left: '-10px'}}>
                        <h>待修改</h>
                    </Box>
                </Box>
                <Grid container
                    sx={{gridColumn: '4/22', display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'center'}}>
                    {Array.from(Array(groupCnt)).map((_, index) => (
                        groupDetail[index][0].groupCompeteId === 1 ?
                            <Grid item key={index}>
                                <SingleTriangle 
                                    groupLabel={LETTERS[index]} 
                                    detail={groupDetail[index]}
                                    department={department}
                                />
                            </Grid> 
                            : groupDetail[index][0].groupCompeteId === 2 ?
                                <Grid item key={index}>
                                    <DoubleTriangle 
                                        groupLabel={LETTERS[index]} 
                                        detail={groupDetail[index]}
                                        department={department}
                                    />
                                </Grid>
                                : groupDetail[index][0].groupCompeteId === 3 ?
                                    <Grid item key={index}>
                                        <SingleSquare 
                                            groupLabel={LETTERS[index]}
                                            detail={groupDetail[index]}
                                            department={department}
                                        />
                                    </Grid>
                                    : groupDetail[index][0].groupCompeteId === 4 ?
                                        <Grid item key={index}>
                                            <DoubleSquare 
                                                groupLabel={LETTERS[index]}
                                                detail={groupDetail[index]}
                                                department={department}
                                                viewType={"edit"}
                                            />
                                        </Grid>
                                        : <></>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default EditSchedule;
