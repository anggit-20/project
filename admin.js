const admin = JSON.parse(localStorage.getItem('admin')) || [];

// fungsi menyimpan data pembuatan password admin
const dataAdmin = () => {
    const nama = document.getElementById('nama').value;
    const password = document.getElementById('password').value;

    const adminBaru = {
        nama: nama,
        password: password,
        
    }
    admin.push(adminBaru);

    localStorage.setItem('admin', JSON.stringify(admin));

    alert("Data admin berhasil disimpan!");

    // (Opsional) Mengosongkan input setelah penyimpanan
    document.getElementById('nama').value = '';
    document.getElementById('password').value = '';
}

document.getElementById('btnSimpan').addEventListener('click', function (e){
    e.preventDefault();
    dataAdmin() 
})