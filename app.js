"use strict";
const socialURLs = { undefined: "", goma: "" };
document.querySelectorAll("[data-social]").forEach(button=>{
  const url=socialURLs[button.dataset.social];
  if(url){const link=document.createElement("a");link.className=button.className;link.href=url;link.target="_blank";link.rel="noopener noreferrer";link.innerHTML=button.innerHTML;button.replaceWith(link);}
  else{button.addEventListener("click",()=>{document.querySelector(".link-status").textContent="인스타그램 계정 연결을 준비하고 있습니다.";});button.querySelector("small").textContent+=" · 연결 준비 중";}
});
const clues=[...document.querySelectorAll(".clue")];
const expand=document.querySelector("#expand-all");
function syncExpand(){if(!expand)return;const visible=clues.filter(c=>!c.hidden);const all=visible.length>0&&visible.every(c=>c.open);expand.setAttribute("aria-expanded",String(all));expand.textContent=all?"모두 접기":"모두 펼치기";}
document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{
  document.querySelectorAll("[data-filter]").forEach(b=>b.setAttribute("aria-pressed",String(b===button)));
  clues.forEach(c=>c.hidden=button.dataset.filter!=="all"&&c.dataset.category!==button.dataset.filter);
  document.querySelector("#clue-count").textContent=clues.filter(c=>!c.hidden).length+"개의 단서";syncExpand();
}));
expand?.addEventListener("click",()=>{const open=expand.getAttribute("aria-expanded")!=="true";clues.filter(c=>!c.hidden).forEach(c=>c.open=open);syncExpand();});
clues.forEach(c=>c.addEventListener("toggle",syncExpand));
document.querySelectorAll(".reveal-button").forEach(button=>button.addEventListener("click",()=>{
 const box=button.closest("[data-acrostic]");const shown=box.classList.toggle("revealed");button.setAttribute("aria-pressed",String(shown));button.textContent=shown?"첫 글자 강조 숨기기":"첫 글자 강조하기";
}));
function openHash(){const target=document.getElementById(location.hash.slice(1));if(target?.matches("details")){target.hidden=false;target.open=true;}}
window.addEventListener("hashchange",openHash);openHash();
