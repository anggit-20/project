
const listKelas = JSON.parse(localStorage.getItem('kelas')) || [];

// menampilkan list kelas pada option select
const tampilkanKelas = () => 
{
    const elKelas = document.getElementById('kelas');
    for(let item of listKelas)
    {
        elKelas.innerHTML += `<option value="${item.nama}">${item.nama}</option>`
    }
}
tampilkanKelas();
// selesai

let mode = 'tambah'

const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];

// menampilkan data pada tabel
const LihatData = () => {
    const tblSiswa = document.getElementById('tblSiswa');
    tblSiswa.innerHTML = ` <tr>
    <th>No</th>
    <th>Nama</th>
    <th>NIS</th>
    <th>No.Telp</th>
    <th>Kelas</th>
    <th>Opsi</th>
</tr>`

    for(let index in dataSiswa) {
        console.log(`${parseInt(index) + 1}. ${dataSiswa[index].nama} dengan NIS ${dataSiswa[index].nis}`)

        tblSiswa.innerHTML += `<tr>
        <td>${parseInt(index) + 1}</td>
        <td>${dataSiswa[index].nama} </td>
        <td>${dataSiswa[index].nis}</td>
        <td>${dataSiswa[index].nomor}</td>
        <td>${dataSiswa[index].kelas}</td>
        <td><button type="button" class="btn btn-danger" onclick="hapusSiswa('${dataSiswa[index].nama}')">Hapus</button></td>
        <td><button type="button" class="btn btn-warning" onclick="editSiswa('${dataSiswa[index].nama}')">Edit</button></td>
    </tr>`
    }
  
}
LihatData();
// selesai

    // mengambil nilai dari form
    document.getElementById("btnSimpan").addEventListener("click", function () {
        // Ambil nilai dari form
        const nama = document.getElementById("nama").value;
        const nis = document.getElementById("nis").value;
        const noTelp = document.getElementById("nomor").value;
        const kelas = document.getElementById("kelas").value;
      
        // Validasi input
        if (!nama || !nis || !noTelp || !kelas) {
          alert("Harap isi semua data!");
          return;
        }

        TambahData(nama, nis, noTelp, kelas);
        LihatData();

    // Reset form
        
    })

    // menambahkan data absen
    const TambahData = () => {
        const nama = document.getElementById("nama").value 
        const nis = document.getElementById("nis").value
        const nomor = document.getElementById("nomor").value 
        const kelas = document.getElementById("kelas").value 
       
    
        const dataBaru = {
            nama: nama,
            nis: nis,
            nomor: nomor,
            kelas: kelas,
           
        }
    
        if(mode == 'tambah'){
            dataSiswa.push(dataBaru)
        } else {
            dataSiswa[mode] = dataBaru
        }

        localStorage.setItem("dataSiswa", JSON.stringify(dataSiswa));

    
        document.getElementById("nama").value = ""
        document.getElementById("nis").value = ""
        document.getElementById("nomor").value = ""
        document.getElementById("kelas").value = ""
    
         mode = 'tambah'
    
        LihatData();
    } 
        
    // mencari index
        const cariIndex = (nama) => {
            // tampilkan index jika nama siswa === nama
            for(let i = 0; i < dataSiswa.length; i++) {
                if(dataSiswa[i].nama == nama){
                    return i
                }
            }
        }
        // selesai

        // fungsi edit siswa
        const editSiswa = (target) => {
            const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa'))
            const indexEdit = cariIndex(target)
        
            const siswaDiedit = dataSiswa[indexEdit]
        
                document.getElementById("nama").value = siswaDiedit.nama;
                document.getElementById("nis").value = siswaDiedit.nis;
                document.getElementById("nomor").value = siswaDiedit.nomor;
                document.getElementById("kelas").value = siswaDiedit.kelas;
        
            mode = indexEdit

            localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa))   
            
        }
        // selesai
        
        // fungsi menghapus data siswa pada tabel
        const hapusSiswa = (target) => {
            const dataSiswa = JSON.parse(localStorage.getItem('dataSiswa')) || [];

            const hapusIndex = cariIndex(target)
            dataSiswa.splice(hapusIndex, 1)

            localStorage.setItem('dataSiswa', JSON.stringify(dataSiswa))
            window.location.reload();
            LihatData();
        }
        // selesai
        
        
        
    
