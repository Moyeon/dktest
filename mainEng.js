var panels = document.getElementsByClassName("panel");
var myname = 'DK';
var fastmode = false;
var nnn;

var tabnum = 0;
panels[0].style.visibility = "visible";
panels[1].style.visibility = "hidden";
panels[2].style.visibility = "hidden";

function nextpanel(){
    panels[tabnum].style.visibility = "hidden";
    tabnum = (tabnum+1)%3;
    panels[tabnum].style.visibility = "visible";
}

function start(){
    nnn = document.getElementById("nnn").value;
    if(nnn) myname = nnn;
    panels[0].style.visibility = "hidden";
    panels[1].style.visibility = "visible";
    panels[2].style.visibility = "hidden";
    quizLoad(0);
}

function resultPanel(){
    document.getElementById("body").classList.add("respage");
    panels[0].style.visibility = "hidden";
    panels[1].style.visibility = "hidden";
    panels[2].style.visibility = "visible";
    nnn = document.getElementById("nnn").value;
    printResult();
}

function fast(){
    fastmode = !fastmode;
}

var question = document.getElementById("question");
var selections = document.getElementsByClassName("sel");
var ssss = document.getElementsByClassName("ssss");
var img = document.getElementById("imgg");
var ansNum = -1;
var selected = -1;
var score = 0;
var ansScore = 0;
var nowQuiz = 0;
var copyy = document.getElementById("copied");
var nowTheme = -1;
var theme = document.getElementById("theme");
var themeScore = [0, 0, 0, 0];
var fakeimg = document.getElementById("fakeimg");
var ps = document.getElementsByClassName("ps");
var dg = document.getElementsByClassName("dg");
var pagenum = document.getElementById("pagenum");

function quizLoad(quiznum){
    pagenum.innerHTML = 1 + Math.floor(quiznum/5);

    //IMG
    if(quizList[quiznum].isImg){
        if(img.classList.contains("hidden")){
            img.classList.remove("hidden");
        }
        img.src = quizList[quiznum].imgsrc;
    }else if(!img.classList.contains("hidden")){
        img.classList.add("hidden");
    }

    if(nowTheme < quizList[quiznum].theme){
        nowTheme = quizList[quiznum].theme;
        if(nowTheme == 0){
            theme.innerHTML = "GOING";
        }else if(nowTheme == 1){
            theme.innerHTML = "MUSIC";
        }else if(nowTheme == 2){
            theme.innerHTML = "SEOKMIN";
        }else {
            theme.innerHTML = "SOCIAL";
        }
        
    }

    //Q
    ansScore = quizList[quiznum].score;
    var innertext = quiznum+1 + ". " + quizList[quiznum].q;
    if(ansScore%2 == 1){
        innertext += " (" + ansScore + " points)"
    }
    question.innerHTML = innertext;

    //A
    ansArr = generateRand();
    for(var i=0; i<4; i++){
        if(ansArr[i]==3){
            ssss[i].innerHTML = quizList[quiznum].answer;
            ansNum = i * 1;
        }
        else{
            ssss[i].innerHTML = quizList[quiznum].wrong[ansArr[i]];
        }
    }
    
    selected = -1;
    nowQuiz = quiznum;
}

function randBetween(minnum, maxnum){
    return Math.floor(Math.random() * (maxnum - minnum + 1)) + minnum;
}

function generateRand(){
    var arr = [-1, -1, -1, -1];
    var k;
    for(var j=0; j<4; j++){
        k = randBetween(0,4);
        while(arr[k]!=-1) k = (k+1) % 4;
        arr[k] = j;
    }
    return arr;
}

function select(){
    var t = this.id[3] * 1;
    if(selected == t) return;
    if(selected != -1) selections[selected].classList.remove("on");
    this.classList.add("on");
    selected = t;
    //t
    if(fastmode) nextQuiz();
}

function nextQuiz(){
    if(selected == -1) return;
    selections[selected].classList.remove("on");
    if(ansNum == selected){
        score += ansScore;
        themeScore[nowTheme] += ansScore;
    }
    nowQuiz++;
    if(nowQuiz >= quizList.length) resultPanel();
    else quizLoad(nowQuiz);
}

for(var i=0; i<4; i++){
    selections[i].addEventListener("mousedown", select);
}

function shareTwitter() {
    var sendText = `[2022학년도 %23도겸최애능력시험 결과]`+"%0a%0a";
    if (nnn){
        sendText += nnn + "'s score is ";
    }else{
        sendText += "Your score is ";
    }
    sendText += score + " points.%0a"; // 전달할 텍스트
    var sendUrl = "2022dkloverstest.com/"; // 전달할 URL
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl);
}

function shareKakao() {
 
    // 사용할 앱의 JavaScript 키 설정
    Kakao.init('038423eb9944211213f6f7cf312a2567');
   
    // 카카오링크 버튼 생성
    Kakao.Link.createDefaultButton({
        container: '#btnKakao', // 카카오공유버튼ID
        objectType: 'feed',
        content: {
            title: "2022학년도 도겸최애능력시험 결과는", // 보여질 제목
            description: score + "점 입니다.", // 보여질 설명
            imageUrl: "http://2022dkloverstest.com/img/dkthumb.png", // 콘텐츠 URL
            link: {
            mobileWebUrl: "2022dkloverstest.com/",
            webUrl: "2022dkloverstest.com/"
            }
        }
    });
}

function copyToClipboard(val) {
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}

function shareCopy(){
    var sendText = "[2022학년도 #도겸최애능력시험 결과]\n";
    if (nnn){
        sendText += nnn + "님의 점수는 ";
    }else{
        sendText += "당신의 점수는 ";
    }
    sendText += score + "점입니다.\n\n2022dkloverstest.com";

    copyToClipboard(sendText);
    console.log('Copied!');
    copyy.classList.add("copied2");
    copyy.addEventListener("animationend", ()=>{
        copyy.classList.remove("copied2");
    });
}
//9679 검정 동그라미
//9312 ~ 숫자 동그라미


function printResult(){
    document.getElementById("rstscore").innerHTML = score;
    document.getElementById("name").innerHTML = myname;
    for(var i = 0; i<4; i++){
        ps[i].innerHTML = themeScore[i];
        dg[i].innerHTML = Math.floor(6 - themeScore[i]/5);
    }
}

function retest(){
    ansNum = -1;
    selected = -1;
    score = 0;
    ansScore = 0;
    nowQuiz = 0;
    nowTheme = -1;
    themeScore = [0, 0, 0, 0];
    start();
}

function eng(){
    location.href = "english.html";
}
function kor(){
    location.href = "index.html";
}