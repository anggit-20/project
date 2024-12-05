const dataAbsen = JSON.parse(localStorage.getItem('dataAbsen')) || [];

const tampilkanDataAbsen = () => {
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

    for(let index in dataAbsen) {
        
        tblAbsen.innerHTML += `<tr>
        <td>${parseInt(index) + 1}</td>
        <td>${dataAbsen[index].tanggal}</td>
        <td>${dataAbsen[index].nama}</td>
        <td>${dataAbsen[index].kelas}</td>
        <td>${dataAbsen[index].keterangan}</td>
        <td>${dataAbsen[index].bukti ? `<a href="#">${dataAbsen[index].bukti}</a>` : "Tidak Ada Bukti"}</td>
        <td><button type="button" class="btn btn-danger" onclick="hapusSiswa('${dataAbsen[index].nama}')">Hapus</button></td>
    </tr>`
    }
}

document.getElementById("btnSimpan").addEventListener("click", function () {
    const nama = document.getElementById('nama').value;
    const kelas = document.getElementById('kelas').value;
    const tanggal = document.getElementById('tanggal').value;
    const keterangan = document.getElementById('keterangan').value;
    const bukti = document.getElementById('bukti').files[0];
    
    if(keterangan === "Hadir") {
        alert('Absen Terkirim!')
        return;
    }

    if(!nama || !kelas || !tanggal || !keterangan || !bukti) {
        alert('Harap isi semua data absen!')
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        const bukti = reader.result;
        tambahData(nama, kelas, tanggal, keterangan, bukti);
        console.log("Data Absen setelah tambah:", dataAbsen);
        console.log("LocalStorage setelah tambah:", localStorage.getItem('dataAbsen'));
    };
    reader.readAsDataURL(buktiFile);
})

const tambahData = (nama, kelas, tanggal, keterangan, bukti) => {
    dataAbsen.push({nama, kelas, tanggal, keterangan, bukti})

    localStorage.setItem("dataAbsen", JSON.stringify(dataAbsen))

    tampilkanDataAbsen();
}



const cariIndex = (nama) => {
    // tampilkan index jika nama siswa === nama
    for(let i = 0; i < dataAbsen.length; i++) {
        if(dataAbsen[i].nama == nama){
            return i
        }
    }
}

const hapusSiswa = (target) => {
    const dataAbsen = JSON.parse(localStorage.getItem('dataAbsen')) || []
    const hapusIndex = cariIndex(target)
    dataAbsen.splice(hapusIndex, 1)
    localStorage.setItem('dataAbsen', JSON.stringify(dataAbsen))

    tampilkanDataAbsen();

}