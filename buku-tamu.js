import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import {
    getFirestore, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDI7B92j_NHtb3jq164xJVb7V2rTnuAslI",
    authDomain: "undangan-u-j.firebaseapp.com",
    projectId: "undangan-u-j",
    storageBucket: "undangan-u-j.firebasestorage.app",
    messagingSenderId: "935887061637",
    appId: "1:935887061637:web:ced5094814f17426a81fec"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const ucapanRef = collection(db, "ucapan");

const formUcapan = document.getElementById("formUcapan");
const daftarUcapan = document.getElementById("daftarUcapan");
const btnKirim = document.getElementById("btnKirimUcapan");

// Kirim ucapan baru
if (formUcapan) {
    formUcapan.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nama = document.getElementById("inputNama").value.trim();
        const email = document.getElementById("inputEmail").value.trim();
        const komentar = document.getElementById("inputKomentar").value.trim();
        const hadir = document.querySelector('input[name="hadir"]:checked').value === "hadir";

        if (!nama || !komentar) return;

        btnKirim.disabled = true;
        btnKirim.textContent = "Mengirim...";

        try {
            await addDoc(ucapanRef, { nama, email, komentar, hadir, waktu: serverTimestamp() });
            formUcapan.reset();
        } catch (err) {
            console.error("Gagal mengirim ucapan:", err);
            alert("Gagal mengirim ucapan, coba lagi ya.");
        } finally {
            btnKirim.disabled = false;
            btnKirim.textContent = "Kirim";
        }
    });
}

// Tampilkan daftar ucapan real-time
if (daftarUcapan) {
    const q = query(ucapanRef, orderBy("waktu", "desc"));

    onSnapshot(q, (snapshot) => {
        if (snapshot.empty) {
            daftarUcapan.innerHTML = '<p class="kosong-ucapan">Belum ada ucapan. Jadilah yang pertama!</p>';
            return;
        }
        daftarUcapan.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            const badgeClass = data.hadir ? "ya" : "tidak";
            const badgeText = data.hadir ? "Hadir" : "Tidak Hadir";

            const item = document.createElement("div");
            item.className = "item-ucapan";
            item.innerHTML = `
                <div class="item-ucapan-header">
                    <span class="item-ucapan-nama">${escapeHtml(data.nama)}</span>
                    <span class="badge-hadir ${badgeClass}">${badgeText}</span>
                </div>
                <p class="item-ucapan-komentar">${escapeHtml(data.komentar)}</p>
            `;
            daftarUcapan.appendChild(item);
        });
    }, (err) => {
        console.error("Gagal memuat ucapan:", err);
        daftarUcapan.innerHTML = '<p class="kosong-ucapan">Gagal memuat ucapan.</p>';
    });
}

// Cegah tampilan HTML mentah dari input user (XSS)
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}