// ===== HIEN THI SU KIEN =====
let list=document.getElementById("list");
function render(data){
if(!list) return;
list.innerHTML="";
data.forEach(e=>{
list.innerHTML+=`
<div class="col-md-4 mb-4">
<div class="card event-card h-100">
<img src="${e.img}" class="card-img-top">
<div class="card-body d-flex flex-column">
<h5 class="card-title">${e.title}</h5>
<p>
<b>Danh mục:</b> ${e.category}
</p>
<p>
<b>Cấp độ:</b> ${e.level}
</p>
<p>
<b>Ngày:</b> ${e.date}
</p>
<button
class="btn btn-primary mt-auto"
onclick="showDetail(${e.id})">
Xem chi tiết
</button>
</div>
</div>
</div>
`;
});
}
if(list){
render(events);
}
// ===== TIM KIEM =====
let search=document.getElementById("search");
search?.addEventListener("keyup",()=>{
let keyword=search.value.toLowerCase();
let result=events.filter(e=>
e.title.toLowerCase().includes(keyword)
);
render(result);
});
// ===== LOC DANH MUC =====
let filter=document.getElementById("filter");
filter?.addEventListener("change",applyFilter);
// ===== LOC CAP DO =====
let levelFilter=document.getElementById("levelFilter");
levelFilter?.addEventListener("change",applyFilter);
function applyFilter(){
let category=filter?.value || "";
let level=levelFilter?.value || "";
let result=events.filter(e=>{
let ok1=!category || e.category===category;
let ok2=!level || e.level===level;
return ok1 && ok2;
});
render(result);
}
// ===== MODAL =====
function showDetail(id){
let e=events.find(x=>x.id===id);
document.getElementById("title").innerHTML=e.title;
document.getElementById("img").src=e.img;
document.getElementById("detail").innerHTML=
`
<b>Danh mục:</b> ${e.category}<br>
<b>Cấp độ:</b> ${e.level}<br>
<b>Ngày:</b> ${e.date}<br><br>
${e.detail}
`;
new bootstrap.Modal(
document.getElementById("modal")
).show();
}
// ===== DANG KY =====
let form=document.getElementById("form");
form?.addEventListener("submit",function(e){
e.preventDefault();
let name=document.getElementById("name").value.trim();
let email=document.getElementById("email").value.trim();
let phone=document.getElementById("phone").value.trim();
let lop=document.getElementById("class").value.trim();
let event=document.getElementById("event").value;
let note=document.getElementById("note").value.trim();
let msg=document.getElementById("msg");
// Validation
if(name.length<3){
msg.innerHTML=
"<span class='text-danger'>Họ tên phải từ 3 ký tự trở lên</span>";
return;
}
if(!email.includes("@")){
msg.innerHTML=
"<span class='text-danger'>Email không hợp lệ</span>";
return;
}
if(phone.length<9){
msg.innerHTML=
"<span class='text-danger'>Số điện thoại không hợp lệ</span>";
return;
}
if(event===""){
msg.innerHTML=
"<span class='text-danger'>Vui lòng chọn sự kiện</span>";
return;
}
// Luu LocalStorage
let registrations=
JSON.parse(localStorage.getItem("registrations"))
|| [];
registrations.push({
name,
email,
phone,
lop,
event,
note
});
localStorage.setItem(
"registrations",
JSON.stringify(registrations)
);
msg.innerHTML=
"<span class='text-success'>Đăng ký thành công!</span>";
form.reset();
});
// ===== DANH SACH DANG KY =====
let table=document.getElementById("data");
if(table){
let registrations=
JSON.parse(localStorage.getItem("registrations"))
|| [];
registrations.forEach((x,index)=>{
table.innerHTML+=`
<tr>
<td>${index+1}</td>
<td>${x.name}</td>
<td>${x.email}</td>
<td>${x.phone}</td>
<td>${x.lop}</td>
<td>${x.event}</td>
<td>${x.note}</td>
<td>
<button
class="btn btn-danger btn-sm"
onclick="deleteItem(${index})">
Xóa
</button>
</td>
</tr>
`;
});
}
// ===== XOA TUNG DONG =====
function deleteItem(index){
let registrations=
JSON.parse(localStorage.getItem("registrations"));
registrations.splice(index,1);
localStorage.setItem(
"registrations",
JSON.stringify(registrations)
);
location.reload();
}
// ===== XOA TAT CA =====
function clearAll(){
if(confirm("Bạn có chắc muốn xóa toàn bộ dữ liệu?")){
localStorage.removeItem("registrations");
location.reload();
}
}