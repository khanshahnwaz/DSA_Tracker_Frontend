(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{4953:(e,t,l)=>{Promise.resolve().then(l.bind(l,9319))},9319:(e,t,l)=>{"use strict";l.r(t),l.d(t,{default:()=>o});var a=l(5155),r=l(2115);function o(){let[e,t]=(0,r.useState)([]),[l,o]=(0,r.useState)({title:"",topic:"",bruteForce:"",optimal:"",level:"Easy"});(0,r.useEffect)(()=>{fetch("".concat("http://localhost:5000","/api/dsa")).then(e=>e.json()).then(e=>t(e))},[]);let s=async a=>{a.preventDefault();let r=await fetch("".concat("http://localhost:5000","/api/dsa"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(l)});t([...e,await r.json()]),o({title:"",topic:"",bruteForce:"",optimal:"",level:"Easy"})},n=async l=>{await fetch("".concat("http://localhost:5000","/api/dsa/").concat(l),{method:"DELETE"}),t(e.filter(e=>e._id!==l))};return(0,a.jsxs)("div",{className:"container mx-auto p-8 max-w-3xl",children:[(0,a.jsx)("h1",{className:"text-4xl font-bold mb-4 text-center",children:"DSA Tracker"}),(0,a.jsxs)("form",{onSubmit:s,className:"space-y-4 bg-white p-6 shadow rounded",children:[(0,a.jsx)("input",{type:"text",placeholder:"Title",value:l.title,onChange:e=>o({...l,title:e.target.value}),className:"w-full p-3 border rounded"}),(0,a.jsx)("input",{type:"text",placeholder:"Topic",value:l.topic,onChange:e=>o({...l,topic:e.target.value}),className:"w-full p-3 border rounded"}),(0,a.jsx)("textarea",{placeholder:"Brute Force Solution",value:l.bruteForce,onChange:e=>o({...l,bruteForce:e.target.value}),className:"w-full p-3 border rounded"}),(0,a.jsx)("textarea",{placeholder:"Optimal Solution",value:l.optimal,onChange:e=>o({...l,optimal:e.target.value}),className:"w-full p-3 border rounded"}),(0,a.jsxs)("select",{value:l.level,onChange:e=>o({...l,level:e.target.value}),className:"w-full p-3 border rounded",children:[(0,a.jsx)("option",{value:"Easy",children:"Easy"}),(0,a.jsx)("option",{value:"Medium",children:"Medium"}),(0,a.jsx)("option",{value:"Hard",children:"Hard"})]}),(0,a.jsx)("button",{type:"submit",className:"bg-blue-500 text-white p-3 rounded w-full",children:"Add"})]}),(0,a.jsx)("div",{className:"mt-8",children:e.map((e,t)=>(0,a.jsxs)("div",{className:"p-6 bg-white shadow mb-4 rounded border-l-4 ".concat("Easy"===e.level?"border-green-500":"Medium"===e.level?"border-yellow-500":"border-red-500"),children:[(0,a.jsx)("h3",{className:"text-2xl font-bold",children:e.title}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Topic:"})," ",e.topic]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Brute Force:"})," ",e.bruteForce]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Optimal:"})," ",e.optimal]}),(0,a.jsxs)("p",{children:[(0,a.jsx)("strong",{children:"Level:"})," ",e.level]}),(0,a.jsx)("button",{onClick:()=>n(e._id),className:"bg-red-500 text-white p-2 rounded mt-4",children:"Delete"})]},t))})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[441,517,358],()=>t(4953)),_N_E=e.O()}]);