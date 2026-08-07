const SUPABASE_URL =
"https://woepwbdzovjetezvfqmp.supabase.co";

const SUPABASE_KEY =
"sb_publishable_rc_mCK9Gh9H7GBme761Jcw_Uba9A0IU";

const supabaseClient =
supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

let allPhotos = [];

async function loadFavorites(){

const { data, error } =
await supabaseClient
.from("favorites")
.select("*")
.order("id",{ascending:false});

if(error){
console.log(error);
return;
}

allPhotos = data;

displayPhotos(allPhotos);
updateStats(allPhotos);
}

function displayPhotos(photos){

const container =
document.getElementById("selectedPhotos");

container.innerHTML = "";

photos.forEach(photo=>{

container.innerHTML += `

<div class="card">

<img src="${photo.photo_url}">

<h3>${photo.photo_name}</h3>

<p class="folder">
📁 ${photo.folder_name}
</p>

<button
onclick="deletePhoto(${photo.id})"
style="
background:red;
color:white;
border:none;
padding:10px;
border-radius:8px;
cursor:pointer;
margin-top:10px;
">
🗑 Delete
</button>

</div>

`;

});

}

function filterPhotos(){

const selectedFolder =
document.getElementById("folderFilter").value;

if(selectedFolder === "all"){

displayPhotos(allPhotos);

return;

}

const filteredPhotos =
allPhotos.filter(photo =>
photo.folder_name === selectedFolder
);

displayPhotos(filteredPhotos);

}

loadFavorites();

function updateStats(data){

const statsDiv =
document.getElementById("stats");

const folders = {};

data.forEach(photo=>{

if(!folders[photo.folder_name]){
folders[photo.folder_name] = 0;
}

folders[photo.folder_name]++;

});

let html = `
<h2>
❤️ Total Selected :
${data.length} Photos
</h2>
`;

for(let folder in folders){

html += `
<p>
📁 ${folder} :
${folders[folder]} Photos
</p>
`;

}

statsDiv.innerHTML = html;

}
function exportCSV(){

let csv =
"Folder,Photo Name,Photo URL\n";

allPhotos.forEach(photo=>{

csv +=
`${photo.folder_name},
${photo.photo_name},
${photo.photo_url}\n`;

});

const blob =
new Blob([csv],
{type:"text/csv"});

const url =
window.URL.createObjectURL(blob);

const a =
document.createElement("a");

a.href = url;

a.download =
"moodshutter-selections.csv";

a.click();

}

async function loadBookings(){

const { data,error } =
await supabaseClient
.from("bookings")
.select("*")
.order("id",{ascending:false});

if(error){
console.log(error);
return;
}

const bookingList =
document.getElementById("bookingList");

bookingList.innerHTML = "";

data.forEach(booking=>{

bookingList.innerHTML += `

<div class="card">

<h3>${booking.client_name}</h3>

<p>📞 ${booking.client_phone}</p>

<p>📅 ${booking.booking_date}</p>

<p>📸 ${booking.shoot_type}</p>

<p>${booking.message}</p>

</div>

`;

});

}

loadBookings();
