import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button } from '@mui/material';
import { SingleSquare, DoubleSquare } from '../scheduleGraph/Square';
import { SingleTriangle, DoubleTriangle } from '../scheduleGraph/Triangle';
import { LETTERS } from '../utilities/entry';
import { SEMESTER } from '../utilities/globalVariable';
import { instance, getCommonConfig } from '../apiUtilities/instance';

// GroupCompeteId: 1. 三取一 2. 三取二 3. 四取一 4. 四取二
// Square: 1(上),2(下),3(左),4(右)
// Triangle: 1(左上),2(右上),3(下)
// const COMPETE = ["三取一", "三取二", "四取一", "四取二"]
const sheetUrl = [
    "https://drive.google.com/file/d/1IRRsaxJCWtk9e42IURvQ3fezv2kL8Ify/preview",
    "https://drive.google.com/file/d/1hQDXHgvrH3Ag4hTiMbnsKvgK9sucw8Vq/preview",
    "https://drive.google.com/file/d/1efSHrFc8sDFTaR_RrxC2hGjgzzhc5p-F/preview",
    "https://drive.google.com/file/d/1VRE4EiRsQF951BlujQY1TGYkT_pCVj6q/preview",
    "https://drive.google.com/file/d/1AEUF0lMm9Srj1iZre1sgRU_EkPb1dtVz/preview",
]

const ShowSchedule = ({ dataId, view }) => {
    const navigate = useNavigate();
    const [getInfo, setGetInfo] = useState(false);
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
                setGetInfo(true);
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
            viewType="show"
        />
    );

    const renderGroups = (SingleComponent, DoubleComponent) => (
        Array.from(Array(groupCnt)).map((_, index) =>
            index % 2 === 0 ? (
                <div
                    key={index}
                    className="printgraph"
                    style={{
                        gridTemplateColumns: 'repeat(2, 1fr)',
                    }}
                >
                    {renderGroupComponent(index, groupDetail[index][0].groupCompeteId <= 2 ? SingleComponent : DoubleComponent)}
                    {index + 1 < groupCnt && renderGroupComponent(index + 1, groupDetail[index + 1][0].groupCompeteId <= 2 ? SingleComponent : DoubleComponent)}
                </div>
            ) : null
        )
    );

    return (
        <>
            {getInfo && (
                <Box
                    sx={{
                        marginTop: '0px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    
                    {dataId <= 1 ? renderGroups(SingleTriangle, SingleSquare) : renderGroups(DoubleTriangle, DoubleSquare)}

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

                    <iframe className="no-printme" src={sheetUrl[dataId]} width="100%" height="600" allow="autoplay"></iframe>

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
                            ? renderGroups(SingleTriangle, SingleSquare)
                            : renderGroups(DoubleTriangle, DoubleSquare)}
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