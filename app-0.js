// Memastikan user sudah login dahulu dan menampilkan nama user login ke form absen
document.addEventListener("DOMContentLoaded", function () {
    LihatData();
    hitungData();

    const loginUser = localStorage.getItem("loginUser");
    const dataSiswa = JSON.parse(localStorage.getItem("dataSiswa"));

    const siswaLogin = dataSiswa.find((siswa) => siswa.nama === loginUser);
    if (!siswaLogin) {
        alert("Data siswa tidak ditemukan!");
        return;
    }

    // Isi nama dan kelas di form
    const namaElement = document.getElementById("nama");
    const kelasElement = document.getElementById("kelas");

    if (namaElement) {
        namaElement.value = siswaLogin.nama; // Isi nama
        namaElement.setAttribute("disabled", true);
    } else {
        console.error("Element dengan ID 'nama' tidak ditemukan");
    }

    if (kelasElement) {
        kelasElement.value = siswaLogin.kelas; // Isi kelas
        kelasElement.setAttribute("disabled", true);
    } else {
        console.error("Element dengan ID 'kelas' tidak ditemukan");
    }

    // Set nilai input tanggal ke tanggal hari ini
    const tanggalInput = document.getElementById("tanggal");
    if (tanggalInput) {
        tanggalInput.value = getTanggalHariIni();
    } else {
        console.error("Element dengan ID 'tanggal' tidak ditemukan");
    }
});

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
const getTanggalHariIni = () => {
    const hariIni = new Date();
    const tahun = hariIni.getFullYear();
    const bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
    const tanggal = String(hariIni.getDate()).padStart(2, "0");
    return `${tahun}-${bulan}-${tanggal}`;
};

// Menampilkan data pada tabel absen
const LihatData = () => {
    const tblAbsen = document.getElementById("tblAbsen");
    tblAbsen.innerHTML = `<tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Nama</th>
        <th>Kelas</th>
        <th>Keterangan</th>
        <th>Bukti</th>
        <th>Opsi</th>
    </tr>`;

    const absenData = JSON.parse(localStorage.getItem("absenData")) || [];
    absenData.forEach((data, index) => {
        const buktiLink = data.bukti
            ? `<a href="#">${data.bukti}</a>`
            : "Tidak Ada Bukti";

        tblAbsen.innerHTML += `<tr>
            <td>${index + 1}</td>
            <td>${data.tanggal}</td>
            <td>${data.nama}</td>
            <td>${data.kelas}</td>
            <td>${data.keterangan}</td>
            <td>${buktiLink}</td>
            <td><button type="button" class="btn btn-danger" onclick="hapusSiswa(${index})">Hapus</button></td>
        </tr>`;
    });
};

// Fungsi untuk menambahkan data absen siswa
const TambahData = () => {
// document.getElementById("btnSimpan").addEventListener("click", function () {
    
    const tanggal = document.getElementById("tanggal").value;
    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const keterangan = document.getElementById("keterangan").value;
    const buktiInput = document.getElementById("bukti");
    const file = buktiInput?.files[0];

    if (!keterangan) {
        alert("Mohon lengkapi data absen!");
        return;
    }

    if ((keterangan === "izin" || keterangan === "Sakit") && !file) {
        alert("Mohon unggah bukti ketidak hadiran!");
        return;
    }

    const dataAbsenBaru = {
        tanggal,
        nama,
        kelas,
        keterangan,
        bukti: file ? file.name : "",
    };

    const absenData = JSON.parse(localStorage.getItem("absenData")) || [];
    absenData.push(dataAbsenBaru);
    localStorage.setItem("absenData", JSON.stringify(absenData));

    alert("Absen berhasil!");
    hitungData();
    LihatData();
    

    // Reset form setelah data berhasil ditambahkan
    document.getElementById("absensi-siswa").reset();
}
//);
// }

// Fungsi untuk menghitung jumlah kehadiran
let jumlahHadir = 0;
let jumlahSakit = 0;
let jumlahIzin = 0;
let jumlahKeseluruhan = 0;

const hitungData = () => {
    const absenData = JSON.parse(localStorage.getItem("absenData")) || [];

    // Reset jumlah kehadiran
    jumlahHadir = 0;
    jumlahSakit = 0;
    jumlahIzin = 0;
    jumlahKeseluruhan = 0;

    // Hitung jumlah kehadiran berdasarkan keterangan
    absenData.forEach((data) => {
        if (data.keterangan === "Hadir") jumlahHadir += 1;
        if (data.keterangan === "Sakit") jumlahSakit += 1;
        if (data.keterangan === "Izin") jumlahIzin += 1;
    });

    // Hitung total keseluruhan
    jumlahKeseluruhan = jumlahHadir + jumlahSakit + jumlahIzin;

    // Tampilkan rekap jumlah kehadiran
    lihatJumlah();
};

// Menampilkan data jumlah ke tabel
const lihatJumlah = () => {
    const tblJumlah = document.getElementById("tblJumlah");
    tblJumlah.innerHTML = `
        <tr>
            <th>Hadir</th>
            <th>Sakit</th>
            <th>Izin</th>
            <th>Keseluruhan</th>
        </tr>
        <tr>
            <td>${jumlahHadir}</td>
            <td>${jumlahSakit}</td>
            <td>${jumlahIzin}</td>
            <td>${jumlahKeseluruhan}</td>
        </tr>`;
};

// Fungsi untuk menghapus data siswa di tabel absen
const hapusSiswa = (index) => {
    const absenData = JSON.parse(localStorage.getItem("absenData")) || [];
    absenData.splice(index, 1);
    localStorage.setItem("absenData", JSON.stringify(absenData));
    LihatData();
    hitungData();
};

LihatData();
hitungData();