"use strict";
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
function openHash(){const target=document.getElementById(location.hash.slice(1));if(target?.matches("details")){target.hidden=false;target.open=true;}}
window.addEventListener("hashchange",openHash);openHash();
