var panels = document.getElementsByClassName("panel");

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
    panels[0].style.visibility = "hidden";
    panels[1].style.visibility = "visible";
    quizLoad(0);
}

function resultPanel(){
    panels[1].style.visibility = "hidden";
    panels[2].style.visibility = "visible";
    var resultText = "";
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

function quizLoad(quiznum){
    ansScore = quizList[quiznum].score;
    var innertext = quiznum+1 + ". " + quizList[quiznum].q;
    if(ansScore%2 == 1){
        innertext += " (" + ansScore + "점)"
    }
    question.innerHTML = innertext;
    ansNum = randBetween(0, 3);
    for(var i=0; i<4; i++){
        if(i<ansNum){
            ssss[i].innerHTML = quizList[quiznum].wrong[i];
        }else if(i==ansNum){
            ssss[i].innerHTML = quizList[quiznum].answer;
        }else{
            ssss[i].innerHTML = quizList[quiznum].wrong[i-1];
        }
    }
    if(quizList[quiznum].isImg){
        if(img.classList.contains("hidden")){
            img.classList.remove("hidden");
        }
        img.src = quizList[quiznum].imgsrc;
    }else if(!img.classList.contains("hidden")){
        img.classList.add("hidden");
    }
    selected = -1;
    nowQuiz = quiznum;
}

function randBetween(minnum, maxnum){
    return Math.floor(Math.random() * (maxnum - minnum + 1)) + minnum;
}

function select(){
    var t = this.id[3] * 1;
    if(selected == t) return;
    if(selected != -1) selections[selected].classList.remove("on");
    this.classList.add("on");
    selected = t;
}

function nextQuiz(){
    if(selected == -1) return;
    selections[selected].classList.remove("on");
    if(ansNum == selected){
        score += ansScore;
    }
    nowQuiz++;
    if(nowQuiz >= quizList.length) resultPanel();
    else quizLoad(nowQuiz);
}

for(var i=0; i<4; i++){
    selections[i].addEventListener("mousedown", select);
}

function shareTwitter() {
    var sendText = "2022학년도 도겸최애능력시험 결과는"; // 전달할 텍스트
    var sendUrl = "devpad.tistory.com/"; // 전달할 URL
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
            description: "개발새발 블로그입니다", // 보여질 설명
            imageUrl: "2022dkloverstest.com/", // 콘텐츠 URL
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
//9679 검정 동그라미
//9312 ~ 숫자 동그라미
