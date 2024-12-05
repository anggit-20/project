const listKelas = JSON.parse(localStorage.getItem('kelas')) || [];

// fungsi untuk menambahkan kelas
const tambahKelas = () => {
    const kelas = document.getElementById('kelas');
    if(kelas.value.trim == "") return;
    const id = listKelas[listKelas.length - 1]?.id + 1 || 1;
    listKelas.push({
        id,
        nama: kelas.value

    })
    localStorage.setItem('kelas',JSON.stringify(listKelas));
    tampilkanKelas();
}
// selesai


// fungsi menampilkan kelas pada option select
const tampilkanKelas = () => {
    const tblKelas = document.getElementById('tblKelas');
    let num = 1;
    tblKelas.innerHTML = `<tr>
    <th>Kelas</th>
    <th>Opsi</th>
</tr>`
    for(let key of listKelas)
    {
        tblKelas.innerHTML += `<tr>
        <td><option value="${key.id}">${key.nama}</option></td>
        <td><button type="button" class="btn btn-danger" onclick="hapusKelas('${key.nama}')">Hapus</button></td>
        </tr>`
        
    }
}
// selesai


// fungsi mencari index siswa
// const cariIndex = (nama) => {
//     // tampilkan index jika nama siswa === nama
//     for(let i = 0; i < listKelas.length; i++) {
//         if(listKelas[i].nama == nama){
//             return i
//         }
//     }
// }
// selesai

// fungsi menghapus kelas pada tabel
const hapusKelas = (index) => {
    const listKelas = JSON.parse(localStorage.getItem('kelas')) || []
    // const hapusIndex = cariIndex(target)
    listKelas.splice(index, 1)
    localStorage.setItem('kelas', JSON.stringify(listKelas))

    tampilkanKelas();
    
}
tampilkanKelas();
