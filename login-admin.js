
// function cariAdmin() {

//     // Ambil nilai dari input
//     const nama = document.getElementById('nama').value.trim();
//     const password = document.getElementById('password').value.trim();
    
//     if(!nama && !password) {
//         alert("Isi nama dan password terlebih dahulu!")
//     }
//     // Validasi nama
//     if (!nama) {
//         alert("Isi nama terlebih dahulu");
//         return;
//     }

//     // Validasi NIS
//     if (!password) {
//         alert("Isi password terlebih dahulu");
//         return;
//     }

//     const admin = JSON.parse(localStorage.getItem('admin')) || []
//     if (admin.length === 0) {
//         alert("Data admin tidak ditemukan");
//         return;
//     }

//     let namaValid = false;
//     let passwordValid = false;
    

//     // Loop melalui setiap kelas di dalam objek siswa
//     for (const admin of admin) {
//         if (admin.nama === nama && admin.password === password){
//             alert("Login Berhasil!");
//             localStorage.setItem('loginAdmin', nama, password);
//             window.location.href = "index.html";
//             return;
//         }

//     }

//     // Jika nama dan NIS tidak terdeteksi
//     if (!namaValid && !passwordValid) {
//         alert("Maaf, nama dan password Anda tidak terdeteksi");
//         return;
//     }

//     // Jika hanya nama yang tidak valid
//     if (!namaValid) {
//         alert("Maaf, nama Anda tidak terdeteksi");
//         return;
//     }

//     // Jika hanya NIS yang tidak valid
//     if (!passwordValid) {
//         alert("Maaf, password Anda tidak terdeteksi");
//         return;
//     }


// }

function cariAdmin() {
    // Ambil nilai dari input
    const nama = document.getElementById('nama').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validasi input
    if (!nama || !password) {
        alert("Harap isi nama dan password terlebih dahulu!");
        return;
    }

    // Ambil data admin dari localStorage
    const adminData = JSON.parse(localStorage.getItem('admin')) || [];
    if (adminData.length === 0) {
        alert("Data admin tidak ditemukan");
        return;
    }

    // Cari admin dalam data
    const admin = adminData.find((dataAdmin) => dataAdmin.nama === nama && dataAdmin.password === password);

    if (admin) {
        // Jika data ditemukan, simpan login admin ke localStorage dan redirect
        localStorage.setItem('loginAdmin', JSON.stringify({ nama, password }));
        alert("Login Berhasil!");
        window.location.href = "siswa.html";
    } else {
        // Jika data tidak ditemukan
        alert("Nama atau password Anda tidak terdeteksi");
    }
}
