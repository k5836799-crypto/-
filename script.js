const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";});
document.querySelectorAll(".magnetic").forEach(el=>{
 el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)*.18;const y=(e.clientY-r.top-r.height/2)*.18;el.style.transform=`translate(${x}px,${y}px)`;});
 el.addEventListener("pointerleave",()=>el.style.transform="translate(0,0)");
});
const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.animate([{opacity:0,transform:"translateY(35px)"},{opacity:1,transform:"translateY(0)"}],{duration:800,easing:"cubic-bezier(.2,.7,.2,1)",fill:"forwards"});reveal.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".section,.project").forEach(el=>{el.style.opacity="0";reveal.observe(el)});
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{const target=document.querySelector(a.getAttribute("href"));if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}}));