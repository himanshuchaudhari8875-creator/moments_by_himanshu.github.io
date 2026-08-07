const SUPABASE_URL = "https://woepwbdzovjetezvfqmp.supabase.co";

const SUPABASE_KEY = "sb_publishable_rc_mCK9Gh9H7GBme761Jcw_Uba9A0IU";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

async function saveFavorite(folderName,fileName,imageUrl){

    const { data: existing } =
    await supabaseClient
    .from("favorites")
    .select("*")
    .eq("folder_name", folderName)
    .eq("photo_name", fileName);

    if(existing && existing.length > 0){
        alert("Already Selected ❤️");
        return;
    }

    const { error } =
    await supabaseClient
    .from("favorites")
    .insert([
        {
            folder_name: folderName,
            photo_name: fileName,
            photo_url: imageUrl
        }
    ]);

    if(error){
        console.log(error);
        alert(error.message);
        return;
    }

    alert("Photo Selected ❤️");

    loadSelectedPhotos();
}

async function loadSelectedPhotos(){

    const { data,error } =
    await supabaseClient
    .from("favorites")
    .select("*");

    if(error){
        console.log(error);
        return;
    }

    const selectedGallery =
    document.getElementById("selectedGallery");

    selectedGallery.innerHTML = "";

    document.getElementById("selectedCount")
    .innerText = data.length;

    data.forEach(photo => {

        selectedGallery.innerHTML += `

        <div class="gallery-card">

            <img src="${photo.photo_url}">

            <div class="card-content">

                <h3>${photo.photo_name}</h3>

            </div>

        </div>

        `;

    });

}

async function loadGallery(){

    const params =
    new URLSearchParams(window.location.search);

    const folderName =
    params.get("folder");

    if(!folderName){

        document.getElementById("gallery").innerHTML =
        "<h2 style='text-align:center'>No Folder Selected</h2>";

        return;
    }

    const { data,error } =
    await supabaseClient.storage
    .from("portfolio")
    .list(folderName);

    if(error){
        console.log(error);
        return;
    }

    const gallery =
    document.getElementById("gallery");

    gallery.innerHTML = "";

    document.getElementById("totalPhotos")
.innerText = data.length;

    data.forEach(file => {

        const imageUrl =
`${SUPABASE_URL}/storage/v1/object/public/portfolio/${folderName}/${file.name}`;

        gallery.innerHTML += `

        <div class="gallery-card">

            <img
src="${imageUrl}"
onclick="openLightbox('${imageUrl}')"
style="cursor:pointer">

            <div class="card-content">

                <h3>${file.name}</h3>

                <div class="actions">

                    <button
                    class="btn favorite"
                    onclick="saveFavorite('${folderName}','${file.name}','${imageUrl}')">
                    ❤️ Select
                    </button>

                    <a href="${imageUrl}" target="_blank">

                        <button class="btn download">
                        ⬇ Download
                        </button>

                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

const params =
new URLSearchParams(window.location.search);

const clientName =
params.get("client");

if(clientName){

document.getElementById("clientTitle")
.innerText = clientName;

}

loadGallery();
loadSelectedPhotos();

async function showSelectedOnly(){

    const { data,error } =
    await supabaseClient
    .from("favorites")
    .select("*");

    if(error){
        console.log(error);
        return;
    }

    const gallery =
    document.getElementById("gallery");

    gallery.innerHTML = "";

    data.forEach(photo => {

        gallery.innerHTML += `

        <div class="gallery-card">

            <img src="${photo.photo_url}">

            <div class="card-content">

                <h3>${photo.photo_name}</h3>

            </div>

        </div>

        `;

    });

}

async function deletePhoto(id){

const confirmDelete =
confirm("Delete this selected photo?");

if(!confirmDelete) return;

const { error } =
await supabaseClient
.from("favorites")
.delete()
.eq("id", id);

if(error){
console.log(error);
alert("Delete Failed");
return;
}

alert("Photo Deleted ✅");

loadFavorites();

}

function openLightbox(imageUrl){

document.getElementById("lightbox")
.style.display = "flex";

document.getElementById("lightboxImg")
.src = imageUrl;

}

function closeLightbox(){

document.getElementById("lightbox")
.style.display = "none";

}