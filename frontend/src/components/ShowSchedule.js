import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';
import { SingleSquare, DoubleSquare } from '../scheduleGraph/Square';
import { SingleTriangle, DoubleTriangle } from '../scheduleGraph/Triangle';
import { LETTERS } from '../utilities/entry';
import { SEMESTER, SHEET_URL } from '../utilities/globalVariable';
import { instance, getCommonConfig } from '../apiUtilities/instance';

// GroupCompeteId: 1. 三取一 2. 三取二 3. 四取一 4. 四取二
// Square: 1(上),2(下),3(左),4(右)
// Triangle: 1(左上),2(右上),3(下)
// const COMPETE = ["三取一", "三取二", "四取一", "四取二"]

const ShowSchedule = ({ dataId, view }) => {
    const navigate = useNavigate();
    const [groupCnt, setGroupCnt] = useState(null);
    const [groupDetail, setGroupDetail] = useState([]);

    const getGroup = async () => {
        const config = getCommonConfig(true);
        try {
            const res = await instance.get(`/rounds?typeId=${dataId + 1}&semester=${SEMESTER}`, config);
            if (res.status === 200) {
                const gCnt = Number(res.data.data.groupCnt);
                setGroupCnt(gCnt);
                const groupLetter = LETTERS.slice(0, gCnt);
                setGroupDetail(groupLetter.map(letter => res.data.data[letter]));
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getGroup();
    }, []);

    const renderGroupComponent = (index, Component) => (
        <Component
            key={index}
            groupLabel={LETTERS[index]}
            detail={groupDetail[index]}
            viewType={"show"}
        />
    );

    const renderGroups = (print, TriangleComponent, SquareComponent) => (
        Array.from(Array(groupCnt)).map((_, index) =>
            index % 2 === 0 ? (
                <div
                    key={index}
                    className={print}
                    style={{
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >
                    {groupDetail[index][0].groupCompeteId <= 2 ?
                        renderGroupComponent(index, TriangleComponent)
                        :
                        renderGroupComponent(index, SquareComponent)
                    }
                    {index + 1 < groupCnt ?
                        groupDetail[index + 1][0].groupCompeteId <= 2 ?
                        renderGroupComponent(index + 1, TriangleComponent)
                        :
                        renderGroupComponent(index + 1, SquareComponent)
                        : null
                    }
                </div>
            ) : null
        )
    );

    return (
        <>
            {groupDetail.length > 0 && (
                <Box
                    sx={{
                        marginTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <iframe className="no-printme" src={SHEET_URL[dataId]} width="100%" height="600" allow="autoplay"></iframe>
                    {dataId <= 1 ? 
                        renderGroups("printgraph", SingleTriangle, SingleSquare) : 
                        renderGroups("printgraph", DoubleTriangle, DoubleSquare)
                    }
                    {view === "manager" && (
                        <div className="no-printme">
                            <Button
                                sx={{ marginTop: '10px', marginBottom: '10px' }}
                                onClick={() => window.print()}
                            >
                                列印
                            </Button>
                        </div>
                    )}
                    <div
                        className="no-printme"
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}
                    >
                        {dataId <= 1
                            ? renderGroups("no-printme", SingleTriangle, SingleSquare)
                            : renderGroups("no-printme", DoubleTriangle, DoubleSquare)}
                    </div>

                    <div className="no-printme">
                        <Button
                            sx={{ mt: '3%' }}
                            variant="outlined"
                            onClick={() => navigate('/schedulehome')}
                        >
                            返回賽程專區
                        </Button>
                    </div>
                </Box>
            )}
        </>
    );
};

export default ShowSchedule;