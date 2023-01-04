import React, { useState } from 'react'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { red, green, blue } from '@mui/material/colors';
import '../style/tournament.css';

const Root = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
  [theme.breakpoints.up('md')]: {
    maxWidth: '900px',
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: '1200px',
  },
}));

const srcHTTP = ["https://drive.google.com/file/d/1MRSo66xyZNkKCxyizIsEcXcP0oAPs-TZ/preview", "https://drive.google.com/file/d/1_gzjUnC2uTlUQW20W4d3aOf134QYyE5n/preview",
    "https://drive.google.com/file/d/16pQ_P2tN_29yJ1fwsMs8YrIy3WO6bhld/preview", "https://drive.google.com/file/d/1JSmhcOGKoKM6Md7PTe2GtvHIe_8NbDai/preview", 
    "https://drive.google.com/file/d/1DHdT1-MNKLbA-vAM6idXLmbjd8Lo1uGL/preview"]
const Tourn = ["https://docs.google.com/spreadsheets/d/e/2PACX-1vQHS00sSy4-BCue0hu9QcZDfAND85Ud2k8beOMcEHiKbCktfdMleolJ3-s0S5Hh1Z8mn3PYLTy6tra8/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHS00sSy4-BCue0hu9QcZDfAND85Ud2k8beOMcEHiKbCktfdMleolJ3-s0S5Hh1Z8mn3PYLTy6tra8/pubhtml?gid=743851539&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHS00sSy4-BCue0hu9QcZDfAND85Ud2k8beOMcEHiKbCktfdMleolJ3-s0S5Hh1Z8mn3PYLTy6tra8/pubhtml?gid=901085519&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHS00sSy4-BCue0hu9QcZDfAND85Ud2k8beOMcEHiKbCktfdMleolJ3-s0S5Hh1Z8mn3PYLTy6tra8/pubhtml?gid=1666928225&amp;single=true&amp;widget=true&amp;headers=false",
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHS00sSy4-BCue0hu9QcZDfAND85Ud2k8beOMcEHiKbCktfdMleolJ3-s0S5Hh1Z8mn3PYLTy6tra8/pubhtml?gid=1802646003&amp;single=true&amp;widget=true&amp;headers=false"]
    
function Tournament({dataId}) {
    const score = useState();
    return (
        <iframe src={Tourn[(dataId)]} width="100%" height="800" allow="autoplay" />
        // <>
        //   {dataId === 0 ? 
        //       <div class="tournament">
        //         <ul class="round round-1">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">生傳一 朱呈叡 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;<span>148</span></li>
        //             <li class="game game-bottom ">食科碩一 陳彥同 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">醫學一 陳蔚凡 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;<span>149</span></li>
        //             <li class="game game-bottom ">中文一 劉哲宏 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">資工碩一 李華健 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;<span>150</span></li>
        //             <li class="game game-bottom ">經濟碩一 楊皓宇 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">分細碩一 張育昕 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">醫學一 陳皓奐 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">外文二 江冠毅 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">工海一 林亮瑾<span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">Mich <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">機械碩一 杜柏賢 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">工海碩一 林子喻 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">地科一 黃昱翔 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">公衛一 張展嘉 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">地科二 李梓恆 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">電機一 黃堉翔 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">醫學一 陳奕丞 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">醫學一 賈子謙 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">生科二 邱柏偉 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">園藝二 李浩然 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">資工二 陳楷元 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">土木一 章立典 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">政治二 黃帥陸 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">化工二 吳懿宸 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">園藝碩一 鍾翔宇 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">心理一 王煦<span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">農藝一 鮑佑華<span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">醫學二 薛晉賢 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">資工一 林祐均 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">化工二 王人右 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">機械一 郭新豪 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">化學一 張睿宸 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">電機二 陳奕安 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">動科碩一 舒曉磊 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">藥學二 蔡睿彬 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">財金一 蔡柏陞 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">資管一 袁詠宸 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">生技一 吳旭棟 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">中文碩一 陳柏諺<span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">資工一 林宗慶 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">醫學二 王偉勳 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">化工碩一 李承恩 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">電機一 李宜倫 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">工工碩一 王懷葳 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">機械一 李宇軒 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">運管碩一 林嘉志 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">藥學二 黃學懌 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">材料碩一 邱柏皓 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">物理碩一 王裕鈞 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">經濟一 蔡承瀚<span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">農經二 范國恩 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">機械碩一 許元瀧 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">動科二 劉子賢 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">電信碩一 羅子翔 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">農藝一 房小翔 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">歷史一 林城聿 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">資工一 鄧亦宸 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">森林碩一 許智勛 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">數學一 許友力 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">化學碩一 李耕鴻 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">公衛一 鄭皓元 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top ">外文二 楊尚謙 <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom ">工海二 黃揚輝 <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //         <ul class="round round-2">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "><span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "><span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //         <ul class="round round-3">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "><span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>

        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "><span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "><span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>

        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>

        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //         <ul class="round round-4">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>

        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>

        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //         <ul class="round round-5">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //         <ul class="round round-5">
        //             <li class="spacer">&nbsp;</li>
                    
        //             <li class="game game-top "> <span>{score}</span></li>
        //             <li class="game game-spacer">&nbsp;</li>
        //             <li class="game game-bottom "> <span>{score}</span></li>
                    
        //             <li class="spacer">&nbsp;</li>
        //         </ul>
        //     </div>
        //     :
        //     <></>
        //   }
        // </>
    );
}

export default Tournament;
