
// memastikan user ssudah login dahulu dan
// menampilkan nama user login ke form absen
document.addEventListener("DOMContentLoaded", function (){
    LihatData();
    const loginUser = localStorage.getItem('loginUser');
    const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'));
    
    if (!loginUser) {
        alert('Silahkan Login Dahulu');
        window.location.href = "login.html";
        return;
    }

    const siswaLogin = dataSiswa.find(siswa => siswa.nama === loginUser);
    if (!siswaLogin) {
        alert('Data siswa tidak ditemukan!');
        return;
    }

    // Isi nama dan kelas di form
    const namaElement = document.getElementById('nama');
    const kelasElement = document.getElementById('kelas');

    if (namaElement) {
        namaElement.value = siswaLogin.nama; // Isi nama
        namaElement.setAttribute('disabled', true);
    } else {
        console.error("Element dengan ID 'nama' tidak ditemukan");
    }

    if (kelasElement) {
        kelasElement.value = siswaLogin.kelas; // Isi kelas
        kelasElement.setAttribute('disabled', true);
    } else {
        console.error("Element dengan ID 'kelas' tidak ditemukan");
    }
    
    // document.getElementById('nama').value = loginUser
    // document.getElementById('kelas').value = dataSiswa?.kelas ||''
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
    
    // menampilkan data pada tabel absen
    
    const LihatData = () => {
        
        const tblAbsen = document.getElementById('tblAbsen');
        tblAbsen.innerHTML = `<tr>
        <th>No</th>
        <th>Tanggal</th>
        <th>Nama</th>
        <th>Kelas</th>
        <th>Keterangan</th>
        <th>Bukti</th>
        <th>Opsi</th>
    </tr>`

        const absenData = JSON.parse(localStorage.getItem('absenData')) || [];
        absenData.forEach((data, index) => {
            const buktiLink = data.bukti
            ? `<a href="#">${data.bukti}</a>`
            : "Tidak Ada Bukti";

            tblAbsen.innerHTML += `<tr>
            <td>${parseInt(index) + 1}</td>
            <td>${data.tanggal}</td>
            <td>${data.nama}</td>
            <td>${data.kelas}</td>
            <td>${data.keterangan}</td>
            <td>${buktiLink}</td>
            <td><button type="button" class="btn btn-danger" onclick="hapusSiswa('${index}')">Hapus</button></td>
        </tr>`
        })

        
    }
    // selesai


    // function untuk menambahkan data absen siswa
    const TambahData = () => {
    
        document.getElementById('btnSimpan').addEventListener("click", function () {

            const tanggal = document.getElementById('tanggal').value;
            const nama = document.getElementById('nama').value;
            const kelas = document.getElementById('kelas').value;
            const keterangan = document.getElementById('keterangan').value;
            const buktiInput = document.getElementById('bukti');
            const file = buktiInput?.files[0];
        
            if(!tanggal || !keterangan) {
                alert('Mohon lengkapi data absen!');
                return;
            }
    
            if((keterangan === "izin" || keterangan === "Sakit") && !file) {
                alert('Mohon unggah bukti ketidak hadiran!');
                return;
            }
            
            const dataAbsenBaru = {
                tanggal,
                nama,
                kelas,
                keterangan,
                bukti: file? file.name : ''
            }
        
            const absenData = JSON.parse(localStorage.getItem('absenData')) || [];
            
            absenData.push(dataAbsenBaru);
      
            localStorage.setItem('absenData', JSON.stringify(absenData));

            hitungData();
    
            alert('Absen berhasil!')
            LihatData();

           document.getElementById('absensi-siswa').reset();
        })
    }
    // selesai
     
    //hapus data siswa di tabel absen
    const hapusSiswa = (index) => {
        const absenData = JSON.parse(localStorage.getItem('absenData')) || []
        absenData.splice(index, 1)
        localStorage.setItem('absenData', JSON.stringify(absenData))
        window.location.reload();
        LihatData();    
    }

    //menghitung kehadiran
    const hitungKehadiran = JSON.parse(localStorage.getItem('hitungKehadiran')) || [];

    // menampilkan data jumlah ke tabel
    const lihatJumlah = () => {
        const tblJumlah = document.getElementById('tblJumlah');
        tblJumlah.innerHTML = `
            <tr>
                <th>Hadir</th>
                <th>Sakit</th>
                <th>Izin</th>
                <th>Keseluruhan</th>
                
            </tr>
            <tr>
                <td id="jumlahHadir">${jumlahHadir}</td>
                <td id="jumlahSakit">${jumlahSakit}</td>
                <td id="jumlahIzin">${jumlahIzin}</td>
                <td id="jumlahKeseluruhan">${jumlahKeseluruhan}</td>
            </tr>
        `;
    };
    // selesai
    
    // fungsi menghitung data status kehadiran
    const hitungData = () => {

        const absenData = JSON.parse(localStorage.getItem('absenData'))
        // Reset jumlah kehadiran
        jumlahHadir = 0;
        jumlahSakit = 0;
        jumlahIzin = 0;
        jumlahKeseluruhan = 0;
    
        // Hitung jumlah kehadiran berdasarkan keterangan
        for (let data of absenData) {
            if (data.keterangan === 'Hadir') jumlahHadir += 1;
            if (data.keterangan === 'Sakit') jumlahSakit += 1;
            if (data.keterangan === 'Izin') jumlahIzin += 1;
        }
    
        // Hitung total keseluruhan
        jumlahKeseluruhan = jumlahHadir + jumlahSakit + jumlahIzin;
    
        // Tampilkan rekap jumlah kehadiran
        lihatJumlah();
    };    
    // selesai

    const tambahData = (data) => {
        const absenData = JSON.parse(localStorage.getItem('absenData')) || [];
        absenData.push(data);
    
        // Simpan ke localStorage
        localStorage.setItem('absenData', JSON.stringify(absenData));
    
        // Perbarui tabel absen (jika ada fungsi terkait)
        tampilkanAbsen();
    
        // Hitung ulang jumlah kehadiran
        hitungData();
    };
    

    const hapusData = (index) => {
        const absenData = JSON.parse(localStorage.getItem('absenData')) || [];
        absenData.splice(index, 1);
    
        // Simpan ke localStorage
        localStorage.setItem('absenData', JSON.stringify(absenData));
    
        // Perbarui tabel absen (jika ada fungsi terkait)
        tampilkanAbsen();
    
        // Hitung ulang jumlah kehadiran
        hitungData();
    };

    
    document.addEventListener('DOMContentLoaded', () => {
        hitungData();
    });
    
    

        
        

        
   