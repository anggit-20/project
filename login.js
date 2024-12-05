function cariSiswa() {
    // Ambil nilai dari input
    const nama = document.getElementById('nama').value.trim();
    const nis = document.getElementById('NIS').value.trim();
    
    if(!nama && !nis) {
        alert("Isi nama dan NIS terlebih dahulu!")
    }
    // Validasi nama
    if (!nama) {
        alert("Isi nama terlebih dahulu");
        return;
    }

    // Validasi NIS
    if (!nis) {
        alert("Isi NIS terlebih dahulu");
        return;
    }

    const siswaData = JSON.parse(localStorage.getItem('dataSiswa')) || []
    if (siswaData.length === 0) {
        alert("Data siswa tidak ditemukan");
        return;
    }

    let namaValid = false;
    let nisValid = false;
    

    // Loop melalui setiap kelas di dalam objek siswa
    for (const dataSiswa of siswaData) {
        if (dataSiswa.nama === nama && dataSiswa.nis === nis){
            alert("Login Berhasil!");
            localStorage.setItem('loginUser', nama, nis);
            window.location.href = "index.html";
            return;
        }
      
    }

    // Jika nama dan NIS tidak terdeteksi
    if (!namaValid && !nisValid) {
        alert("Maaf, nama dan NIS Anda tidak terdeteksi");
        return;
    }

    // Jika hanya nama yang tidak valid
    if (!namaValid) {
        alert("Maaf, nama Anda tidak terdeteksi");
        return;
    }

    // Jika hanya NIS yang tidak valid
    if (!nisValid) {
        alert("Maaf, NIS Anda tidak terdeteksi");
        return;
    }


}
