const tombolBuka = document.getElementById("bukaUndangan");
const halamanCover = document.getElementById("halamanCover");
const halamanUtama = document.getElementById("halamanUtama");
const musik = document.getElementById("musik");

const playlist = [
    "musik/musik1.mp3",
    "musik/musik2.mp3",
    "musik/musik3.mp3"
];

let indexLagu = 0;

function putarLagu(index) {
    musik.src = playlist[index];
    musik.play().catch(err => console.log("Autoplay diblokir browser:", err));
}

// SAAT TOMBOL "BUKA UNDANGAN" DIKLIK
if (tombolBuka) {
    tombolBuka.addEventListener("click", () => {
        // 1. Sembunyikan Halaman Cover
        setTimeout(() => {
        if (halamanCover) halamanCover.style.display = "none";
        
        // 2. MUNCULKAN ISI UNDANGAN (halamanUtama)
        if (halamanUtama) halamanUtama.style.display = "block";

        // 3. Putar Musik
        putarLagu(indexLagu);
    }, 800);
});
}

// Otomatis lanjut ke lagu berikutnya saat lagu selesai
musik.addEventListener("ended", () => {
    indexLagu = (indexLagu + 1) % playlist.length;
    putarLagu(indexLagu);
});

// Fitur Tombol Back (Kembali ke Cover)
const btnBack = document.getElementById("btnBack");
if (btnBack) {
    btnBack.addEventListener("click", () => {
        btnBack.disabled = true; // cegah diklik berkali-kali saat delay

        setTimeout(() => {
            if (halamanCover) halamanCover.style.display = "block";
            if (halamanUtama) halamanUtama.style.display = "none";
            musik.pause();
            btnBack.disabled = false;
        }, 800); // delay 1000ms = 1 detik, ganti sesuai kebutuhan
    });
}

const targetDateAkad = new Date("Sep 20, 2026 08:00:00").getTime();

const timerAkad = setInterval(() => {
    const now = new Date().getTime();
    const gap = targetDateAkad - now;

    if (gap < 0) {
        clearInterval(timerAkad);
        document.querySelector(".countdown-container").innerHTML = "Akad Telah Dimulai!";
        return;
    }

    document.getElementById("hari-akad").innerText = Math.floor(gap / (1000 * 60 * 60 * 24));
    document.getElementById("jam-akad").innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("menit-akad").innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("detik-akad").innerText = Math.floor((gap % (1000 * 60)) / 1000);
}, 1000);

const targetDateResepsi = new Date("Sep 20, 2026 10:00:00").getTime();

const timerResepsi = setInterval(() => {
    const now = new Date().getTime();
    const gap = targetDateResepsi - now;

    if (gap < 0) {
        clearInterval(timerResepsi);
        document.querySelector(".countdown-container").innerHTML = "Resepsi Telah Dimulai!";
        return;
    }

    document.getElementById("hari-resepsi").innerText = Math.floor(gap / (1000 * 60 * 60 * 24));
    document.getElementById("jam-resepsi").innerText = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById("menit-resepsi").innerText = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById("detik-resepsi").innerText = Math.floor((gap % (1000 * 60)) / (1000));
}, 1000);

// Ambil nama tamu dari URL (?to=NamaTamu)
const paramUrl = new URLSearchParams(window.location.search);
const namaTamuUrl = paramUrl.get("to");
const elNamaTamu = document.getElementById("namaTamu");

if (namaTamuUrl && elNamaTamu) {
    elNamaTamu.textContent = namaTamuUrl;
}

// Salin nomor rekening
document.querySelectorAll(".btn-salin").forEach((tombol) => {
    tombol.addEventListener("click", () => {
        const targetId = tombol.getAttribute("data-target");
        const nomorRek = document.getElementById(targetId).textContent;

        navigator.clipboard.writeText(nomorRek).then(() => {
            const notif = document.getElementById("notifSalin");
            notif.classList.add("tampil");
            setTimeout(() => notif.classList.remove("tampil"), 2000);
        }).catch(() => {
            alert("Gagal menyalin, silakan salin manual: " + nomorRek);
        });
    });
});