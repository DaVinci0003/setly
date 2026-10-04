(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const STORAGE_KEY = "setly-workout-v1";
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  };
  const shiftDate = (iso, amount) => { const d = new Date(iso+"T12:00:00"); d.setDate(d.getDate()+amount); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
  const prettyDate = iso => new Date(iso+"T12:00:00").toLocaleDateString("tr-TR",{day:"numeric",month:"long",year:"numeric"});
  const id = () => Math.random().toString(36).slice(2,10) + Date.now().toString(36).slice(-4);
  const library = [
    ["Şınav","Vücut ağırlığı","💪","strength"],["Geniş tutuş şınav","Vücut ağırlığı","💪","strength"],["Dar tutuş şınav","Vücut ağırlığı","💪","strength"],["Elmas şınav","Vücut ağırlığı","💪","strength"],["Eğimli şınav","Vücut ağırlığı","💪","strength"],["Ayak yükselterek şınav","Vücut ağırlığı","💪","strength"],
    ["Barfiks","Vücut ağırlığı","🧗","strength"],["Ters tutuş barfiks (chin-up)","Vücut ağırlığı","🧗","strength"],["Negatif barfiks","Vücut ağırlığı","🧗","strength"],["Squat","Vücut ağırlığı","🦵","strength"],["Jump squat","Vücut ağırlığı","🦵","strength"],["Lunge","Vücut ağırlığı","🦵","strength"],["Bulgarian split squat","Vücut ağırlığı","🦵","strength"],["Glute bridge","Vücut ağırlığı","🦵","strength"],["Calf raise","Vücut ağırlığı","🦵","strength"],
    ["Mekik","Vücut ağırlığı","🔥","strength"],["Crunch","Vücut ağırlığı","🔥","strength"],["Plank","Vücut ağırlığı","🔥","timed"],["Side plank","Vücut ağırlığı","🔥","timed"],["Leg raise","Vücut ağırlığı","🔥","strength"],["Mountain climber","Vücut ağırlığı","🔥","strength"],["Burpee","Vücut ağırlığı","⚡","strength"],["Şınav pozisyonunda omuz dokunuşu","Vücut ağırlığı","💪","strength"],["Dip (paralel bar)","Vücut ağırlığı","💪","strength"],["Bench dip","Vücut ağırlığı","💪","strength"],
    ["Dumbbell bench press","Dumbbell","🏋️","strength"],["Dumbbell shoulder press","Dumbbell","🏋️","strength"],["Dumbbell lateral raise","Dumbbell","🏋️","strength"],["Dumbbell front raise","Dumbbell","🏋️","strength"],["Dumbbell biceps curl","Dumbbell","💪","strength"],["Hammer curl","Dumbbell","💪","strength"],["Dumbbell row","Dumbbell","🏋️","strength"],["Tek kol dumbbell row","Dumbbell","🏋️","strength"],["Dumbbell fly","Dumbbell","🏋️","strength"],["Dumbbell pullover","Dumbbell","🏋️","strength"],["Dumbbell Romanian deadlift","Dumbbell","🦵","strength"],["Dumbbell lunge","Dumbbell","🦵","strength"],["Goblet squat","Dumbbell","🦵","strength"],["Dumbbell shrug","Dumbbell","🏋️","strength"],["Dumbbell triceps extension","Dumbbell","💪","strength"],["Dumbbell kickback","Dumbbell","💪","strength"],
    ["Bench press","Barbell","🏋️","strength"],["Incline bench press","Barbell","🏋️","strength"],["Deadlift","Barbell","🏋️","strength"],["Romanian deadlift","Barbell","🏋️","strength"],["Barbell squat","Barbell","🦵","strength"],["Front squat","Barbell","🦵","strength"],["Overhead press","Barbell","🏋️","strength"],["Barbell row","Barbell","🏋️","strength"],["Hip thrust","Barbell","🦵","strength"],["Barbell curl","Barbell","💪","strength"],["Skull crusher","Barbell","💪","strength"],
    ["Koşu","Kardiyo","🏃","cardio"],["Yürüyüş","Kardiyo","🚶","cardio"],["Bisiklet","Kardiyo","🚴","cardio"],["Kürek ergometresi","Kardiyo","🚣","cardio"],["İp atlama","Kardiyo","⚡","cardio"],["Eliptik bisiklet","Kardiyo","🚴","cardio"],["Merdiven çıkma","Kardiyo","🪜","cardio"],["Yüzme","Kardiyo","🏊","cardio"],
    ["Lat pulldown","Makine","🏋️","strength"],["Seated cable row","Makine","🏋️","strength"],["Leg press","Makine","🦵","strength"],["Leg extension","Makine","🦵","strength"],["Leg curl","Makine","🦵","strength"],["Chest press makinesi","Makine","🏋️","strength"],["Pec deck","Makine","🏋️","strength"],["Cable crossover","Makine","🏋️","strength"],["Triceps pushdown","Makine","💪","strength"],["Cable face pull","Makine","🏋️","strength"],["Smith machine squat","Makine","🦵","strength"],["Assisted pull-up","Makine","🧗","strength"]
  ].map(([name,category,icon,type])=>({name,category,icon,type}));

  let state = loadState();
  let selectedDate = todayISO();
  let activeCategory = "Tümü";
  let pendingExercise = null;
  let editingId = null;
  let toastTimer = null;

  function loadState(){
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){const parsed=JSON.parse(raw); if(parsed && parsed.days && parsed.pinned) return parsed;}
    } catch(e) {}
    return {days:{},pinned:[],completedDays:{}};
  }
  function save(){ localStorage.setItem(STORAGE_KEY,JSON.stringify(state)); }
  function dayList(date=selectedDate){ return state.days[date] || []; }
  function ensureDay(date=selectedDate){ if(!state.days[date]) state.days[date]=[]; return state.days[date]; }
  function findExercise(exId,date=selectedDate){ return dayList(date).find(e=>e.id===exId); }
  function isCardio(e){return e.type==="cardio";}
  function targetCount(e){return isCardio(e)?1:(e.sets||1);}
  function isExerciseComplete(e){
    if(isCardio(e)) return !!e.done;
    return (e.setProgress||[]).length >= (e.sets||1) && e.setProgress.every(s=>s.done);
  }
  function progress(){
    const list=dayList(); if(!list.length)return 0;
    const total=list.reduce((n,e)=>n+targetCount(e),0);
    const done=list.reduce((n,e)=>n+(isCardio(e)?(e.done?1:0):(e.setProgress||[]).filter(s=>s.done).length),0);
    return Math.round(done/Math.max(total,1)*100);
  }
  function totalReps(){
    return dayList().reduce((sum,e)=>sum+(e.type==="strength"?(e.setProgress||[]).reduce((s,p)=>s+(Number(p.actual)||0),0):0),0);
  }
  function safeText(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
  function showToast(message){
    $("toast").textContent=message;$("toast").classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("toast").classList.remove("show"),2400);
  }
  function createProgress(e){
    return Array.from({length:e.sets||1},()=>({actual:0,done:false}));
  }
  function exerciseFromTemplate(template,options={}){
    const e={id:id(),name:template.name,category:template.category,icon:template.icon,type:template.type||"strength",pinned:!!options.pinned,createdAt:selectedDate};
    if(e.type==="cardio"){e.target=Number(options.target)||4;e.unit=options.unit||"km";e.done=false;}
    else {e.sets=Number(options.sets)||3;e.reps=Number(options.reps)||10;e.setProgress=createProgress(e);}
    return e;
  }
  function addExercise(template,options={}){
    const list=ensureDay();
    if(list.some(e=>e.name.toLocaleLowerCase("tr")==template.name.toLocaleLowerCase("tr"))){showToast("Bu hareket bugünün planında zaten var.");return;}
    const e=exerciseFromTemplate(template,options);list.push(e);
    if(e.pinned && !state.pinned.some(p=>p.name.toLocaleLowerCase("tr")===e.name.toLocaleLowerCase("tr"))){
      const pin={name:e.name,category:e.category,icon:e.icon,type:e.type,pinned:true};
      if(e.type==="cardio"){pin.target=e.target;pin.unit=e.unit;}else{pin.sets=e.sets;pin.reps=e.reps;}
      state.pinned.push(pin);
    }
    save();render();$("configDialog").close();$("addDialog").close();showToast(`${e.name} plana eklendi.`);
  }
  function syncPinned(e){
    const idx=state.pinned.findIndex(p=>p.name.toLocaleLowerCase("tr")===e.name.toLocaleLowerCase("tr"));
    if(e.pinned){
      const p={name:e.name,category:e.category,icon:e.icon,type:e.type,pinned:true};
      if(e.type==="cardio"){p.target=e.target;p.unit=e.unit;}else{p.sets=e.sets;p.reps=e.reps;}
      if(idx>=0)state.pinned[idx]=p;else state.pinned.push(p);
    } else if(idx>=0)state.pinned.splice(idx,1);
  }
  function togglePin(exId){
    const e=findExercise(exId);if(!e)return;
    e.pinned=!e.pinned;syncPinned(e);save();render();showToast(e.pinned?"Hareket her gün için sabitlendi.":"Hareket günlük plana alındı.");
  }
  function removeExercise(exId){
    const e=findExercise(exId);if(!e)return;
    if(e.pinned){state.pinned=state.pinned.filter(p=>p.name.toLocaleLowerCase("tr")!==e.name.toLocaleLowerCase("tr"));}
    state.days[selectedDate]=dayList().filter(x=>x.id!==exId);save();render();showToast("Hareket bugünün planından kaldırıldı.");
  }
  function setActual(exId,index,value){
    const e=findExercise(exId);if(!e)return;
    const n=Math.max(0,Math.min(100000,Number(value)||0));
    e.setProgress[index].actual=n;save();renderStats();
  }
  function markSet(exId,index,done){
    const e=findExercise(exId);if(!e)return;
    const p=e.setProgress[index];p.done=done;
    if(done && !p.actual) p.actual=e.reps;
    save();render();if(isExerciseComplete(e))showToast(`${e.name} tamamlandı!`);
  }
  function addRep(exId,index){
    const e=findExercise(exId);if(!e)return;
    const input=$(`actual-${exId}-${index}`);
    const value=Math.max(0,Number(input?.value)||0);
    const p=e.setProgress[index];p.actual=value;p.done=true;
    save();render();showToast(`${index+1}. set: ${value} tekrar kaydedildi.`);
  }
  function toggleCardio(exId){
    const e=findExercise(exId);if(!e)return;e.done=!e.done;save();render();
    if(e.done)showToast(`${e.name} tamamlandı. Harika iş!`);
  }
  function render(){
    $("selectedDate").value=selectedDate;
    $("workoutList").innerHTML="";
    const list=dayList();
    $("emptyState").hidden=list.length>0;
    $("finishWrap").hidden=list.length===0;
    list.forEach(e=>{
      const complete=isExerciseComplete(e);
      const card=document.createElement("article");
      card.className="exercise-card"+(complete?" is-complete":"");
      card.innerHTML=`
        <div class="exercise-top">
          <div class="exercise-title-wrap">
            <div class="exercise-icon">${safeText(e.icon||"🏋️")}</div>
            <div><div class="exercise-name">${safeText(e.name)}</div>
            <div class="exercise-meta">${safeText(e.category||"Kişisel hareket")} · ${e.type==="cardio" ? `${e.target} ${e.unit==="dk"?"dk":"km"} hedef` : `${e.sets} set × ${e.reps} tekrar hedef`}${complete?' · <span style="color:var(--green)">Tamamlandı ✓</span>':""}</div></div>
          </div>
          <div class="exercise-actions">
            <button class="tiny-btn pin-btn ${e.pinned?"active":""}" data-action="pin" title="${e.pinned?"Sabitlemeyi kaldır":"Her gün sabitle"}">${e.pinned?"◆ Sabit":"◇ Sabitle"}</button>
            <button class="tiny-btn" data-action="edit" title="Düzenle">Düzenle</button>
            <button class="tiny-btn remove-btn" data-action="remove" title="Sil">×</button>
          </div>
        </div>
        ${e.type==="cardio" ? `
          <div class="cardio-row"><div class="target-pill">Hedef: <strong>${e.target} ${e.unit==="dk"?"dakika":"km"}</strong></div>
          <button class="done-toggle ${e.done?"checked":""}" data-action="cardio"><span class="check-symbol">${e.done?"✓":"○"}</span>${e.done?"Tamamlandı":"Tamamlandı olarak işaretle"}</button></div>
        ` : `
          <div class="sets-row">${(e.setProgress||[]).map((p,i)=>`
            <div class="set-box ${p.done?"done":""}">
              <span class="set-number">${i+1}. SET</span>
              <input class="rep-input" type="number" min="0" max="100000" inputmode="numeric" id="actual-${e.id}-${i}" value="${p.actual||""}" placeholder="${e.reps}" aria-label="${i+1}. set yapılan tekrar">
              <span class="rep-unit">tekrar</span>
              <button class="plus-btn" data-action="rep" data-index="${i}" aria-label="${i+1}. seti kaydet">+</button>
              <input class="set-check" type="checkbox" data-action="set" data-index="${i}" ${p.done?"checked":""} aria-label="${i+1}. set tamamlandı">
            </div>`).join("")}
          <span class="set-count-label">${(e.setProgress||[]).filter(p=>p.done).length}/${e.sets} set</span></div>
        `}
      `;
      card.querySelectorAll("[data-action]").forEach(btn=>{
        btn.addEventListener("click",ev=>{
          const action=btn.dataset.action;
          if(action==="pin")togglePin(e.id);
          if(action==="edit")openEdit(e.id);
          if(action==="remove")removeExercise(e.id);
          if(action==="cardio")toggleCardio(e.id);
          if(action==="rep")addRep(e.id,Number(btn.dataset.index));
        });
        if(btn.dataset.action==="set"){
          btn.addEventListener("change",()=>markSet(e.id,Number(btn.dataset.index),btn.checked));
        }
      });
      card.querySelectorAll(".rep-input").forEach((input,i)=>input.addEventListener("change",()=>setActual(e.id,i,input.value)));
      $("workoutList").appendChild(card);
    });
    renderStats();renderDistribution();renderWeek();
    const p=progress();
    $("finishBtn").disabled=p<100;
    $("finishNote").textContent=p===100?"Harika! Bugünkü planın tamamlandı.":"Tüm setleri ve hareketleri tamamladığında günü bitirebilirsin.";
    $("finishNote").classList.toggle("success",p===100);
  }
  function renderStats(){
    const list=dayList(), p=progress(), done=list.filter(isExerciseComplete).length;
    $("progressValue").textContent=p+"%";$("progressFill").style.width=p+"%";
    $("progressCaption").textContent=list.length?(p===100?"Bugünkü hedefini tamamladın!":`${list.reduce((n,e)=>n+(isCardio(e)?1:e.sets),0)-list.reduce((n,e)=>n+(isCardio(e)?(e.done?1:0):(e.setProgress||[]).filter(s=>s.done).length),0)} adım kaldı`):"Başlamak için ilk hareketini ekle.";
    $("completedValue").innerHTML=`${done} <span class="small-unit">/ ${list.length}</span>`;
    $("repsValue").textContent=totalReps().toLocaleString("tr-TR");
    $("pinnedValue").textContent=state.pinned.length;
  }
  function renderDistribution(){
    const map={};
    const cutoff=shiftDate(selectedDate,-29);
    Object.entries(state.days).forEach(([date,list])=>{
      if(date<cutoff||date>selectedDate)return;
      list.forEach(e=>{
        const key=e.name;
        if(!map[key])map[key]={name:key,done:0,total:0};
        map[key].total++;
        if(isExerciseComplete(e))map[key].done++;
      });
    });
    const arr=Object.values(map).filter(x=>x.total>0).sort((a,b)=>b.done-a.done||b.total-a.total).slice(0,6);
    $("distribution").innerHTML="";
    $("distributionEmpty").hidden=arr.length>0;
    arr.forEach(x=>{
      const pct=Math.round(x.done/Math.max(1,x.total)*100);
      const row=document.createElement("div");row.className="dist-row";
      row.innerHTML=`<div class="dist-name" title="${safeText(x.name)}">${safeText(x.name)}</div><div class="dist-track"><div class="dist-fill" style="width:${pct}%"></div></div><div class="dist-pct">${pct}%</div>`;
      $("distribution").appendChild(row);
    });
  }
  function renderWeek(){
    const names=["Pzt","Sal","Çar","Per","Cum","Cmt","Paz"];
    const d=new Date(selectedDate+"T12:00:00");const dow=(d.getDay()+6)%7;const monday=shiftDate(selectedDate,-dow);
    $("weekStrip").innerHTML="";
    let finished=0;
    for(let i=0;i<7;i++){
      const date=shiftDate(monday,i),list=state.days[date]||[];
      const p=list.length?list.filter(isExerciseComplete).length/list.length:0;
      const cls=p===1&&list.length?"done":p>0?"partial":"";
      if(p===1&&list.length)finished++;
      const day=document.createElement("div");day.className="week-day";
      day.innerHTML=`<div class="week-dot ${cls}" title="${prettyDate(date)}">${p===1&&list.length?"✓":p>0?"·":"—"}</div><small>${names[i]}</small>`;
      $("weekStrip").appendChild(day);
    }
    $("weekSummary").textContent=`${finished} gün tamamlandı`;
  }
  function openAdd(){
    $("exerciseSearch").value="";activeCategory="Tümü";
    document.querySelectorAll(".category-chip").forEach(b=>b.classList.toggle("active",b.dataset.category===activeCategory));
    renderLibrary();$("addDialog").showModal();setTimeout(()=>$("exerciseSearch").focus(),60);
  }
  function renderLibrary(){
    const q=$("exerciseSearch").value.trim().toLocaleLowerCase("tr");
    const list=library.filter(e=>(activeCategory==="Tümü"||e.category===activeCategory)&&(!q||e.name.toLocaleLowerCase("tr").includes(q)||e.category.toLocaleLowerCase("tr").includes(q)));
    $("exerciseResults").innerHTML="";
    if(!list.length){$("exerciseResults").innerHTML='<div class="no-results">Hareket bulunamadı. Aşağıdan kendi hareketini ekleyebilirsin.</div>';return;}
    list.forEach(e=>{
      const b=document.createElement("button");b.type="button";b.className="exercise-result";
      b.innerHTML=`<span class="result-icon">${safeText(e.icon)}</span><span class="result-copy"><span class="result-name">${safeText(e.name)}</span><span class="result-category">${safeText(e.category)}</span></span><span class="result-add">＋</span>`;
      b.addEventListener("click",()=>openConfig(e));$("exerciseResults").appendChild(b);
    });
  }
  function openConfig(template){
    pendingExercise=template;
    $("configTitle").textContent=template.name;
    $("configDescription").textContent=template.type==="cardio"?"Koşu, yürüyüş veya kardiyo hedefini mesafe ya da süre olarak belirle.":"Her sette hedeflediğin tekrar sayısını gir. Yaptığın tekrarları setlerin yanındaki + ile kaydedebilirsin.";
    const cardio=template.type==="cardio";
    $("strengthFields").hidden=cardio;$("cardioFields").hidden=!cardio;
    $("setCount").value=3;$("repCount").value=10;$("distanceCount").value=4;$("cardioType").value="km";$("pinOnAdd").checked=true;
    $("addDialog").close();$("configDialog").showModal();
  }
  function openEdit(exId){
    const e=findExercise(exId);if(!e)return;editingId=exId;
    $("editTitle").textContent=e.name;$("editName").value=e.name;
    const cardio=e.type==="cardio";$("editStrengthFields").hidden=cardio;$("editCardioFields").hidden=!cardio;
    if(cardio){$("editDistance").value=e.target;$("editCardioType").value=e.unit||"km";}
    else{$("editSets").value=e.sets;$("editReps").value=e.reps;}
    $("editDialog").showModal();
  }
  function saveEdit(){
    const e=findExercise(editingId);if(!e)return;
    const oldName=e.name;e.name=$("editName").value.trim()||e.name;
    if(e.type==="cardio"){e.target=Math.max(.1,Number($("editDistance").value)||1);e.unit=$("editCardioType").value;}
    else{
      const sets=Math.max(1,Math.min(30,Number($("editSets").value)||1));
      const reps=Math.max(1,Math.min(1000,Number($("editReps").value)||1));
      const old=e.setProgress||[];
      e.sets=sets;e.reps=reps;
      e.setProgress=Array.from({length:sets},(_,i)=>old[i]||({actual:0,done:false}));
    }
    if(e.pinned)syncPinned(e);
    if(oldName!==e.name && e.pinned)state.pinned=state.pinned.filter(p=>p.name.toLocaleLowerCase("tr")!==oldName.toLocaleLowerCase("tr"));
    save();$("editDialog").close();render();showToast("Hareket güncellendi.");
  }
  function addCustom(){
    const name=$("customName").value.trim();if(!name){showToast("Önce hareketin adını yaz.");return;}
    const template={name,category:"Kişisel",icon:"🏋️",type:"strength"};
    $("customName").value="";openConfig(template);
  }
  function finishWorkout(){
    if(progress()<100)return;
    state.completedDays[selectedDate]=true;save();
    $("finishNote").textContent="Tebrikler! Bugünkü antrenmanını tamamladın. Yarın yeniden devam!";$("finishNote").classList.add("success");
    showToast("Tebrikler! Antrenmanın tamamlandı. 🎉");renderWeek();
  }
  $("openAdd").addEventListener("click",openAdd);$("emptyAdd").addEventListener("click",openAdd);
  $("exerciseSearch").addEventListener("input",renderLibrary);
  document.querySelectorAll(".category-chip").forEach(b=>b.addEventListener("click",()=>{activeCategory=b.dataset.category;document.querySelectorAll(".category-chip").forEach(x=>x.classList.toggle("active",x===b));renderLibrary();}));
  $("addCustom").addEventListener("click",addCustom);$("customName").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();addCustom();}});
  $("confirmAdd").addEventListener("click",()=>{
    if(!pendingExercise)return;
    const cardio=pendingExercise.type==="cardio";
    const options={pinned:$("pinOnAdd").checked};
    if(cardio){options.target=Number($("distanceCount").value)||4;options.unit=$("cardioType").value;}
    else{options.sets=Number($("setCount").value)||3;options.reps=Number($("repCount").value)||10;}
    addExercise(pendingExercise,options);
  });
  $("cancelConfig").addEventListener("click",()=>$("configDialog").close());
  $("saveEdit").addEventListener("click",saveEdit);
  $("deleteExercise").addEventListener("click",()=>{if(editingId){removeExercise(editingId);$("editDialog").close();}});
  $("finishBtn").addEventListener("click",finishWorkout);
  $("selectedDate").addEventListener("change",e=>{if(e.target.value){selectedDate=e.target.value;ensurePinnedDay(selectedDate);render();}});
  $("prevDay").addEventListener("click",()=>{selectedDate=shiftDate(selectedDate,-1);ensurePinnedDay(selectedDate);render();});
  $("nextDay").addEventListener("click",()=>{selectedDate=shiftDate(selectedDate,1);ensurePinnedDay(selectedDate);render();});
  $("todayBtn").addEventListener("click",()=>{selectedDate=todayISO();ensurePinnedDay(selectedDate);render();});
  function ensurePinnedDay(date){
    if(!state.days[date])state.days[date]=[];
    const list=state.days[date];
    state.pinned.forEach(p=>{
      if(!list.some(e=>e.name.toLocaleLowerCase("tr")===p.name.toLocaleLowerCase("tr"))){
        const e={...p,id:id(),pinned:true,createdAt:date};
        if(e.type==="cardio"){e.done=false;e.target=Number(e.target)||4;e.unit=e.unit||"km";}
        else{e.sets=Number(e.sets)||3;e.reps=Number(e.reps)||10;e.setProgress=createProgress(e);}
        list.push(e);
      }
    });
    save();
  }
  // Daily plans are snapshots. Only pinned exercises are carried into another date.
  ensurePinnedDay(selectedDate);
  if("serviceWorker" in navigator && location.protocol!=="file:"){
    window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
  }
  render();
})();