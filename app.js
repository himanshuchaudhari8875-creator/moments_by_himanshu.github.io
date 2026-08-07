const SUPABASE_URL = "https://woepwbdzovjetezvfqmp.supabase.co";

const SUPABASE_KEY = "sb_publishable_rc_mCK9Gh9H7GBme761Jcw_Uba9A0IU";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

console.log("MoodShutter Connected 🚀");

async function uploadPhoto() {

    const files = document.getElementById("fileInput").files;
const folderName =
document.getElementById("folderName").value;

    if(files.length === 0){
        alert("Please select files");
        return;
    }

    for(let i = 0; i < files.length; i++){

        const file = files[i];

        const fileName =
Date.now() + "_" + i + "_" + file.name;

const filePath =
folderName + "/" + fileName;

const { error } =
await supabaseClient.storage
.from("portfolio")
.upload(filePath, file);

        if(error){
            console.log(error);
            alert("Error: " + error.message);
            return;
        }
    }

    alert(files.length + " Photos Uploaded Successfully 🚀");
}

function generateLink(){

    const folder =
    document.getElementById("folderLink").value;

    if(!folder){
        alert("Enter Folder Name");
        return;
    }

    const link =
    `http://127.0.0.1:5500/gallery.html?folder=${folder}`;

    document.getElementById("galleryLink").innerHTML =

    `<a href="${link}" target="_blank">${link}</a>`;
}
async function bookNow(){

try{

const name =
document.getElementById("clientName").value;

const phone =
document.getElementById("clientPhone").value;

const date =
document.getElementById("bookingDate").value;

const type =
document.getElementById("shootType").value;

const message =
document.getElementById("clientMessage").value;

const { data,error } =
await supabaseClient
.from("bookings")
.insert([
{
client_name:name,
client_phone:phone,
booking_date:date,
shoot_type:type,
message:message
}
])
.select();

console.log("DATA:",data);
console.log("ERROR:",error);

if(error){
alert(error.message);
return;
}

alert("Booking Saved");

}catch(err){

console.log(err);
alert(err.message);

}

}
function adminLogin(){

const pass =
prompt("Admin Password");

if(pass === "Himanshu@2026"){

window.location.href =
"admin.html";

}else{

alert("Wrong Password");

}

}