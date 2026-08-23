const tbodyLM = document.getElementById("tbodyLM");
const evidenContainer = document.getElementById("evidenContainer");

function prosesData(){

const text = document.getElementById("inputText").value;

tbodyLM.innerHTML="";
evidenContainer.innerHTML="";

const lines=text.split("\n");

let kendalaMode=false;
let komitmenMode=false;

let kendala="";
let komitmen="";

for(let i=0;i<lines.length;i++){

const line=lines[i].trim();

if(line.startsWith("LM")){

const lm=line;

const tLine=lines[i+1] || "";
const rLine=lines[i+2] || "";
const kumLine=lines[i+3] || "";

const target=tLine.replace("T =","").trim();
const realisasi=rLine.replace("R =","").trim();
const kumawal=kumLine.replace("KUM AWAL =","").trim();

const row=document.createElement("tr");

row.innerHTML=`
<td>${lm}</td>

<td contenteditable="true">${target}</td>

<td contenteditable="true">${realisasi}</td>

<td contenteditable="true">${kumawal}</td>

<td class="status-bagus">😊</td>
`;

tbodyLM.appendChild(row);

buatEviden(lm);

}

if(line.includes("Kendala")){
kendalaMode=true;
komitmenMode=false;
continue;
}

if(line.includes("Komitmen")){
kendalaMode=false;
komitmenMode=true;
continue;
}

if(kendalaMode && line!==""){
kendala+=line+" ";
}

if(komitmenMode && line!==""){
komitmen+=line+" ";
}

}

document.getElementById("kendala").value=kendala;
document.getElementById("komitmen").value=komitmen;

simpanData();

}

function buatEviden(lm){

const div=document.createElement("div");

div.className="eviden-card";

div.innerHTML=`

<h4>${lm}</h4>

<input type="file" accept="image/*">

<img style="display:none">

`;

const input=div.querySelector("input");
const img=div.querySelector("img");

input.addEventListener("change",function(){

const file=this.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(e){

img.src=e.target.result;
img.style.display="block";

simpanData();

};

reader.readAsDataURL(file);

});

evidenContainer.appendChild(div);

}

function simpanData(){

localStorage.setItem(
"laporanK3L",
document.body.innerHTML
);

}

function previewPDF(){

window.print();

}

async function downloadPDF(){

const { jsPDF } = window.jspdf;

const pdf=new jsPDF(
'p',
'mm',
'a4'
);

const element=
document.getElementById(
"previewLaporan"
);

const canvas=
await html2canvas(
element,
{
scale:2
}
);

const imgData=
canvas.toDataURL(
'image/png'
);

const width=190;

const height=
(canvas.height*width)
/canvas.width;

pdf.addImage(
imgData,
'PNG',
10,
10,
width,
height
);

pdf.save(
'Laporan_K3L.pdf'
);

}

window.onload=function(){

const tanggal=
document.getElementById(
"tanggal"
);

const today=
new Date()
.toISOString()
.split("T")[0];

tanggal.value=today;

}

function bacaFile(input,idTarget){

const file=input.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=function(e){

document
.getElementById(idTarget)
.src=e.target.result;

};

reader.readAsDataURL(file);

}

document
.getElementById("uploadDanantara")
.addEventListener(
"change",
function(){
bacaFile(this,"logoDanantara");
}
);

document
.getElementById("uploadHSSE")
.addEventListener(
"change",
function(){
bacaFile(this,"logoHSSE");
}
);

document
.getElementById("uploadPLN")
.addEventListener(
"change",
function(){
bacaFile(this,"logoPLN");
}
);

document
.getElementById("uploadPeta")
.addEventListener(
"change",
function(){
bacaFile(this,"petaWilayah");
}
);
