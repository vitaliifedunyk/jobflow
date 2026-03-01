(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&e(u)}).observe(document,{childList:!0,subtree:!0});function o(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function e(a){if(a.ep)return;a.ep=!0;const r=o(a);fetch(a.href,r)}})();const B=["Applied","Interview","Offer","Rejected"],s={apps:[],editingId:null,searchTerm:"",selectedStatus:"",sortBy:"date_desc"};function p(t={}){const n=t.salary===""||t.salary===null||t.salary===void 0?null:Number(t.salary);return{id:t.id||crypto.randomUUID(),company:String(t.company||"").trim(),position:String(t.position||"").trim(),status:B.includes(t.status)?t.status:"Applied",appliedDate:String(t.appliedDate||""),salary:Number.isFinite(n)?n:null}}function i(t){return Object.assign(s,t),s}function A(t){const n=p(t);return s.apps.push(n),n}function L(t,n){const o=s.apps.find(e=>e.id===t);return o?(Object.assign(o,p({...o,...n,id:o.id})),o):null}function C(t){s.apps=s.apps.filter(n=>n.id!==t)}const I="jobflow.applications.v1";function O(){try{const t=localStorage.getItem(I);if(!t)return[];const n=JSON.parse(t);return Array.isArray(n)?n:[]}catch{return[]}}function y(t){try{localStorage.setItem(I,JSON.stringify(t))}catch{}}function l(t){return document.getElementById(t)}function c(t){const n=document.createElement("td");return n.className="px-3 py-2",n.textContent=t,n}function D(t){const n=l("tableBody");if(n.textContent="",t.length===0){const o=document.createElement("tr"),e=document.createElement("td");e.colSpan=6,e.className="px-3 py-3 text-gray-500",e.textContent="No applications yet.",o.appendChild(e),n.appendChild(o);return}t.forEach(o=>{const e=document.createElement("tr");e.className="border-t border-gray-100",e.appendChild(c(o.company)),e.appendChild(c(o.position)),e.appendChild(c(o.status)),e.appendChild(c(o.appliedDate)),e.appendChild(c(String(o.salary??"-")));const a=document.createElement("td");a.className="px-3 py-2",a.innerHTML=`
      <div class="flex gap-2">
        <button
          type="button"
          data-action="edit"
          data-id="${o.id}"
          class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
        >Edit</button>
        <button
          type="button"
          data-action="delete"
          data-id="${o.id}"
          class="rounded-md border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50 cursor-pointer"
        >Delete</button>
      </div>
    `,e.appendChild(a),n.appendChild(e)})}function N(t){l("companyInput").value=t.company??"",l("positionInput").value=t.position??"",l("statusInput").value=t.status??"Applied",l("dateInput").value=t.appliedDate??"",l("salaryInput").value=t.salary??""}function w(){l("applicationForm").reset()}function E(t){const n=l("appModal"),o=l("modalTitle");t?(o.textContent="Edit application",N(t)):(o.textContent="Add application",w()),n.classList.remove("hidden"),n.classList.add("flex")}function f(){const t=l("appModal");t.classList.add("hidden"),t.classList.remove("flex")}const j=document.querySelector("#app");j.innerHTML=`
  <div class="min-h-screen bg-gray-50">
    <header class="border-b bg-white">
      <div class="mx-auto max-w-6xl px-4 py-4">
        <h1 class="text-2xl font-semibold">JobFlow</h1>
        <p class="mt-1 text-sm text-gray-600">Applications</p>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-6">
      <div class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              id="searchInput"
              class="w-full sm:w-64 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gray-300"
              placeholder="Search company or position..."
            />

            <select
              id="statusFilter"
              class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="">All statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <select
              id="sortSelect"
              class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
            >
              <option value="date_desc">Date: newest</option>
              <option value="date_asc">Date: oldest</option>
              <option value="salary_desc">Salary: high → low</option>
              <option value="salary_asc">Salary: low → high</option>
            </select>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              id="addBtn"
              class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 cursor-pointer"
            >
              Add application
            </button>

            <button
              id="exportBtn"
              class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Export JSON
            </button>

            <label
              class="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
            >
              Import JSON
              <input type="file" id="importInput" accept="application/json" class="hidden" />
            </label>
          </div>
        </div>

        <div class="mt-4 overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead class="text-xs uppercase text-gray-500">
              <tr class="border-b border-gray-200">
                <th class="px-3 py-2">Company</th>
                <th class="px-3 py-2">Position</th>
                <th class="px-3 py-2">Status</th>
                <th class="px-3 py-2">Applied</th>
                <th class="px-3 py-2">Salary</th>
                <th class="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody id="tableBody"></tbody>
          </table>
        </div>
      </div>
    </main>

    <div id="appModal" class="fixed inset-0 hidden items-center justify-center bg-black/40 p-4">
      <div class="w-full max-w-lg rounded-xl bg-white p-4 shadow">
        <div class="flex items-center justify-between">
          <h2 id="modalTitle" class="text-lg font-semibold">Add application</h2>
          <button
            id="closeModalBtn"
            class="rounded-lg border border-gray-200 px-3 py-1 text-sm hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <div class="mt-4 text-sm text-gray-700">
          <form id="applicationForm">
            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Company</label>
              <input
                type="text"
                id="companyInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Position</label>
              <input
                type="text"
                id="positionInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Status</label>
              <select
                id="statusInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Applied Date</label>
              <input
                type="date"
                id="dateInput"
                min="1000-01-01"
                max="9999-12-31"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-4">
              <label class="block text-sm font-medium mb-1">Salary</label>
              <input
                type="number"
                id="salaryInput"
                class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-300"
              />
            </div>

            <div class="mt-6 flex justify-end gap-2">
              <button
                type="submit"
                class="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Save application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
`;const M=document.getElementById("tableBody"),T=document.getElementById("addBtn"),k=document.getElementById("closeModalBtn"),g=document.getElementById("appModal"),F=document.getElementById("applicationForm"),b=document.getElementById("companyInput"),x=document.getElementById("positionInput"),m=document.getElementById("dateInput"),_=document.getElementById("statusInput"),v=document.getElementById("salaryInput"),R=document.getElementById("searchInput"),J=document.getElementById("statusFilter"),S=document.getElementById("sortSelect"),P=document.getElementById("exportBtn"),U=document.getElementById("importInput");i({apps:O().map(p)});S.value=s.sortBy;function h(t,n,o){const e=t.salary===null||t.salary===void 0,a=n.salary===null||n.salary===void 0;return e&&a?0:e?1:a?-1:o==="desc"?n.salary-t.salary:t.salary-n.salary}function q(){const t=s.searchTerm.toLowerCase(),o=[...s.apps.filter(e=>{const a=e.company.toLowerCase().includes(t)||e.position.toLowerCase().includes(t),r=s.selectedStatus===""||e.status===s.selectedStatus;return a&&r})];return o.sort((e,a)=>s.sortBy==="date_desc"?a.appliedDate.localeCompare(e.appliedDate):s.sortBy==="date_asc"?e.appliedDate.localeCompare(a.appliedDate):s.sortBy==="salary_desc"?h(e,a,"desc"):s.sortBy==="salary_asc"?h(e,a,"asc"):0),o}function d(){D(q())}M.addEventListener("click",t=>{const n=t.target.closest("button[data-action]");if(!n)return;const{action:o,id:e}=n.dataset;if(o==="delete"){if(!confirm("Delete this application?"))return;C(e),y(s.apps),d();return}if(o==="edit"){const a=s.apps.find(r=>r.id===e);if(!a)return;i({editingId:e}),E(a)}});T.addEventListener("click",()=>{i({editingId:null}),E()});k.addEventListener("click",f);g.addEventListener("click",t=>{t.target===g&&f()});F.addEventListener("submit",t=>{t.preventDefault();const n=b.value.trim(),o=x.value.trim(),e=m.value;if(n.length<2){alert("Company is required (min 2 chars)"),b.focus();return}if(o.length<2){alert("Position is required (min 2 chars)"),x.focus();return}if(!e){alert("Applied date is required"),m.focus();return}if(!/^\d{4}-\d{2}-\d{2}$/.test(e)){alert("Applied date year must be 4 digits (YYYY-MM-DD)"),m.focus();return}const a={company:n,position:o,status:_.value,appliedDate:e,salary:v.value===""?null:Number(v.value)};s.editingId?(L(s.editingId,a),i({editingId:null})):A(a),y(s.apps),d(),w(),f()});R.addEventListener("input",t=>{i({searchTerm:t.target.value.trim()}),d()});J.addEventListener("change",t=>{i({selectedStatus:t.target.value}),d()});S.addEventListener("change",t=>{i({sortBy:t.target.value}),d()});P.addEventListener("click",()=>{const t=JSON.stringify(s.apps,null,2),n=new Blob([t],{type:"application/json"}),o=URL.createObjectURL(n),e=document.createElement("a");e.href=o,e.download="jobflow-applications.json",e.click(),URL.revokeObjectURL(o)});U.addEventListener("change",async t=>{const n=t.target.files?.[0];if(n)try{const o=await n.text(),e=JSON.parse(o);if(!Array.isArray(e)){alert("Invalid file: expected an array of applications.");return}i({apps:e.map(p),editingId:null}),y(s.apps),d(),t.target.value="",alert("Import successful ✅")}catch{alert("Import failed: invalid JSON file.")}});d();
