const reveal=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");reveal.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll(".section,.problem-grid article,.revenue-grid article,.timeline article,.quote-section,.contact-card").forEach(el=>{el.classList.add("reveal");reveal.observe(el)});document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const t=document.querySelector(a.getAttribute("href"));if(t){e.preventDefault();t.scrollIntoView({behavior:"smooth"})}}));const header=document.querySelector(".header");let last=0;window.addEventListener("scroll",()=>{const y=window.scrollY;header.style.transform=y>last&&y>120?"translateY(-100%)":"translateY(0)";last=y},{passive:true});
const diagnosticForm=document.querySelector("#diagnosticForm");
const diagnosticResult=document.querySelector("#diagnosticResult");
if(diagnosticForm&&diagnosticResult){
  const scoreEl=document.querySelector("#needScore");
  const labelEl=document.querySelector("#needLabel");
  const titleEl=document.querySelector("#needTitle");
  const descEl=document.querySelector("#needDescription");
  const reasonsEl=document.querySelector("#needReasons");
  const retry=document.querySelector("#diagnosticRetry");
  diagnosticForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const data=new FormData(diagnosticForm);
    const safety=Number(data.get("safety")||0);
    const nutrition=Number(data.get("nutrition")||0);
    const dataNeed=Number(data.get("data")||0);
    const family=Number(data.get("family")||0);
    const target=data.get("target");
    const targetBonus=target==="parent"||target==="self"?5:2;
    const raw=safety*6+nutrition*5+dataNeed*5+family*4+targetBonus;
    const score=Math.max(18,Math.min(98,Math.round(18+(raw/83)*80)));
    let label="낮은 편",title="지금은 선택 사항에 가깝습니다.",desc="현재 답변에서는 실버핏이 꼭 필요한 상황은 아니지만, 운동·영양·건강 데이터를 한곳에서 관리하고 싶다면 활용할 수 있습니다.";
    if(score>=70){label="높음";title="실버핏이 꽤 필요한 편입니다.";desc="운동 중 안전 확인과 운동 후 영양관리, 건강데이터 연결, 가족과의 관리까지 한 번에 필요한 상황에 가깝습니다."}
    else if(score>=45){label="보통";title="실버핏을 활용하면 도움이 될 가능성이 높습니다.";desc="일부 관리에 어려움이 있어 운동·영양·건강 데이터를 연결해 보는 것이 의미 있습니다."}
    const reasons=[];
    if(safety>=3) reasons.push("운동 안전 확인");
    if(nutrition>=3) reasons.push("운동 후 영양관리");
    if(dataNeed>=3) reasons.push("건강데이터 통합");
    if(family>=3) reasons.push("보호자 관리");
    if(!reasons.length) reasons.push("기본 건강관리");
    scoreEl.textContent=score+"%";
    labelEl.textContent="실버핏 필요도 · "+label;
    titleEl.textContent=title;
    descEl.textContent=desc;
    reasonsEl.innerHTML=reasons.map(r=>"<span>"+r+"</span>").join("");
    diagnosticResult.hidden=false;
    diagnosticResult.scrollIntoView({behavior:"smooth",block:"center"});
  });
  retry.addEventListener("click",()=>{
    diagnosticResult.hidden=true;
    diagnosticForm.reset();
    diagnosticForm.scrollIntoView({behavior:"smooth",block:"start"});
  });
}
