import React from "react";
import { 
    Container,
    Typography,
} from "@mui/material";

const AboutPage = () => {
  return (
    <Container component="main" maxWidth="md" 
        sx={{display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: '100px', 
            paddingTop: '60px'
        }} 
    >
        <h3 style={{ marginBottom: '20px', marginTop: "20px" }}>
            網站緣起
        </h3>
        <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            <strong>關於新生盃與台大盃</strong><br/>
            新生盃與台大盃分別於學年的上學期和下學期舉辦，前者為大一至大二、碩一、博一學生而設，後者則向所有在校生開放。這些賽事已經舉辦多年，每年都吸引了上百位羽球愛好者參與，成為我們校園內羽球愛好者和系隊必參加的賽事。
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            <strong>網站起源與目標</strong><br/>
            本網站於2022年7月由兩位熱愛羽球的資管系學姐創建。從設計到功能實現，都是由當時的比賽總召、賽程組成員共同努力的結果。我們知道還有許多可以改進之處，因此我們非常歡迎大家通過填寫
            <a href="https://forms.gle/nhPUWixukY54covr5" target="_blank" rel="noopener noreferrer">反饋表單</a>或通過
            <a href="https://www.facebook.com/ntubadminton2012" target="_blank" rel="noopener noreferrer">臉書</a>私訊提供寶貴的意見。
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'left', width: '100%' }}>
            <strong>貢獻者及歷屆得獎者</strong><br/>
            <iframe src="https://docs.google.com/spreadsheets/d/1B_Db9zxEqzmjkQbL1Z3sAJ-C_AXx_7tNGhoNjeYs2RU/edit?usp=sharing" width="100%" height="720" allow="autoplay"></iframe>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'left' }}>
            <strong>如何支持我們的工作</strong><br/>
            我們誠邀各位參賽者和觀眾到訪我們的
            <a href="https://github.com/d336643/NTU_badminton_system" target="_blank" rel="noopener noreferrer">Github專案頁面</a>，
            給我們點星鼓勵，這個簡單的動作對我們來說意義重大，能夠激勵我們持續改進和完善網站功能。如果你不熟悉GitHub，它是一個可以讓開發者和專案參與者交流的平台，你可以免費註冊一個帳號，並透過點擊星星圖標來表達你對平台上專案的認可，類似於社交媒體上的「點讚」。
        </Typography>
    </Container>
  );
};

export default AboutPage;
