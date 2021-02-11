const url = "https://babushka-dd8a.restdb.io/rest/menu";
const medieurl = "https://babushka-dd8a.restdb.io/media/";
const options = {
    headers: {
        'x-apikey': "600ec2fb1346a1524ff12de4"
    }
};

window.addEventListener("DOMContentLoaded", start);

let retter;
let filter = "alle";
const header = document.querySelector("#knapper h2");

//Første funktion der kaldes efter DOM er loaded
function start() {
    const filterKnapper = document.querySelectorAll("#filtre button");
    filterKnapper.forEach(knap => knap.addEventListener("click", filtrerRetter));
    document.querySelector(".sorter").addEventListener("click", toggleMenu);
    hentData();
}

//Eventlistener til burgermenu
function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#filtre").classList.toggle("show");

    let erVist = document.querySelector("#filtre").classList.contains("show");

    if (erVist == true) {
        document.querySelector(".sorter").textContent = "Sorter efter ▴";
    } else {
        document.querySelector(".sorter").textContent = "Sorter efter ▾";
    }
}

//Eventlistener knyttet til knapperne der vælger det akive filter
function filtrerRetter() {
    filter = this.dataset.kategori;
    document.querySelector(".valgt").classList.remove("valgt");
    this.classList.add("valgt");
    visRetter();
    header.textContent = this.textContent;
}


//Henter data fra restdb
async function hentData() {
    const respons = await fetch(url, options);
    retter = await respons.json();
    visRetter();
}

const dest = document.querySelector("#menu");
const template = document.querySelector("template").content;
//Funktion der viser retter i liste view
function visRetter() {
    console.log(retter);

    dest.textContent = "";

    retter.forEach(ret => {
        console.log("Kategori", ret.kategori);
        if (filter == ret.kategori || filter == "alle") {

            const klon = template.cloneNode(true);
            klon.querySelector(".billede").src = medieurl + ret.billede;
            klon.querySelector(".navn").textContent = ret.navn;
            klon.querySelector(".beskrivelse_kort").textContent = ret.kortbeskrivelse;
            klon.querySelector(".pris").textContent = `Pris: ${ret.pris},-`;
            klon.querySelector(".ret").addEventListener("click", () => visDetaljer(ret));
            dest.appendChild(klon);
        }
    })
}

function visDetaljer(hvad) {
    location.href = `detaljer.html?id=${hvad._id}`;
}

hentData();
