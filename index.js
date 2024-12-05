const AbsenData = JSON.parse(localStorage.getItem('absenData')) || [];


// memastikan user ssudah login dahulu dan
// menampilkan nama user login ke form absen
document.addEventListener("DOMContentLoaded", function (){
    const loginUser = localStorage.getItem('loginUser');
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'));
    
    if (!loginUser) {
        alert('Silahkan Login Dahulu');
        window.location.href = "login.html";
        return;
    }
    
    document.getElementById('nama').value = loginUser
    document.getElementById('kelas').value = dataSiswa.kelas
    document.getElementById('nama').setAttribute('disabled', true);
    document.getElementById('kelas').setAttribute('disabled', true);
    
    })

    const tanggalInput = document.getElementById('tanggal');

// Fungsi untuk mendapatkan tanggal hari ini dalam format YYYY-MM-DD
    const getTanggalHariIni = () => {

    const hariIni = new Date();
    const tahun = hariIni.getFullYear();
    const bulan = String(hariIni.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0
    const tanggal = String(hariIni.getDate()).padStart(2, '0');
    return `${tahun}-${bulan}-${tanggal}`;
};

// Set nilai input tanggal ke tanggal hari ini
tanggalInput.value = getTanggalHariIni();

    // menyimpan data absen pada local storage
    function simpanAbsen () {
        const tanggal = document.getElementById('tanggal').value;
        const nama = document.getElementById('nama').value;
        const kelas = document.getElementById('kelas').value;
        const keterangan = document.getElementById('keterangan').value;
        const bukti = document.getElementById('bukti').files[0];
        const file = bukti.files[0];
    
        if(!tanggal || !keterangan) {
            alert('Mohon lengkapi data absen!');
            return;
        }

        if((keterangan === "izin" || keterangan === "Sakit") && !file) {
            alert('Mohon unggah bukti ketidak hadiran!');
            return;
        }
    
        const AbsenData = JSON.parse(localStorage.getItem('absenData')) || [];
        console.log('Sebelum push:', AbsenData); //cek
        AbsenData.push({tanggal, nama, keterangan, kelas, bukti: file ? file.name : null});
        console.log('Setelah push:', AbsenData); // cek
        localStorage.setItem('absenData', JSON.stringify(AbsenData))
    
        LihatData();
        alert('Absen berhasil!')
    }

    // menampilkan data
    const LihatData = () => {
        const AbsenData = JSON.parse(localStorage.getItem('absenData')) || [];
        const tblAbsen = document.getElementById('tblAbsen');
        tblAbsen.innerHTML = `<tr>
        <th>NO</th>
        <th>TANGGAL</th>
        <th>NAMA</th>
        <th>KELAS</th>
        <th>KETERANGAN</th>
        <th>BUKTI</th>
        <th>OPSI</th>
      </tr>`
    
        for(let index in AbsenData) {
            
            tblAbsen.innerHTML += `<tr>
            <td>${parseInt(index) + 1}</td>
            <td>${absenData[index].tanggal}</td>
            <td>${absenData[index].nama}</td>
            <td>${absenData[index].kelas}</td>
            <td>${absenData[index].keterangan}</td>
            <td>${bukti ? `<a href="#">${bukti}</a>` : "Tidak Ada Bukti"}</td>
            <td><button type="button" class="btn btn-danger" onclick="hapusSiswa('${AbsenData[index].nama}')">Hapus</button></td>
        </tr>`
        }
    }

    LihatData();

    const TambahData = ( nama, kelas, keterangan, bukti) => {
        // Tambah data baru ke array
        absenData.push({ nama, kelas, keterangan, bukti });
    
        // Simpan dataSiswa ke Local Storage
        localStorage.setItem("absenData", JSON.stringify(absenData));

        LihatData();
    }
  

    // hapus data
    const hapusAbsen = (index) => {
        // Ambil data dari localStorage
        const AbsenData = JSON.parse(localStorage.getItem('absenData')) || [];
        
        // Hapus elemen berdasarkan indeks
        AbsenData.splice(index, 1);
        
        // Simpan kembali data ke localStorage
        localStorage.setItem('absenData', JSON.stringify(absenData));
        
        // Perbarui tampilan tabel
        LihatData();
    };
    