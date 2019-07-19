$(document).ready(function(){

    var MyUrl, idSup, namaSup, alamat, noPhone;
    var BasicUrl = "http://localhost/myws/";
    var editSup = false;
    var editID = null;

    LoadData();

    function LoadData() {
        MyUrl = BasicUrl + "aOperator.php?act=10";
        idSup = [], namaSup = [], alamat = [], noPhone = [];
        $.ajax({
            url: MyUrl, dataType: "json",
            beforeSend: function(){},
            success: function(Res){
                var jsonValues = Res.hasil;
                var Loop = 0;
                $.each(jsonValues,function(kie,val){
                    idSup[Loop] = val.id_supplier;
                    namaSup[Loop] = val.nama;
                    alamat[Loop] = val.alamat;
                    noPhone[Loop] = val.telpon;
                    Loop++;
                });
                ShowTable();
            },
            fail: function(){}
        });
    }

    function ShowTable() {
        var Rows = "";
        for (let tb = 0; tb < idSup.length; tb++) {
            Rows += "<tr><td class='text-center'>" + (tb + 1) + "</td>";
            Rows += "<td>" + namaSup[tb] + "</td><td>" + alamat[tb];
            Rows += "</td><td>" + noPhone[tb] + "</td>";
            Rows += "<td style='width:13%' class='text-right'><button class='edtz btn btn-sm btn-outline-warning' id='" + tb + "'>Edit</button>";
            Rows += "&nbsp;<button class='delz btn btn-sm btn-outline-danger' id='" + tb + "'>Delete</button></td></tr>";
        }
        var tabelSup = "<table class='table table-dark table-striped'><tr><th class='text-center'>No.</th><th>Nama Supplier</th>" +
            "<th>Alamat</th><th>No. Telpon</th><th></th></tr>" + Rows + "</table>";
        $("#kotak").html(tabelSup);
        $(".delz").click(function(){
            var ArrayPos = this.id;
            DeleteSupplier(ArrayPos);
        });
        $(".edtz").click(function(){
            var ArrayEdt = this.id;
            EditSupplier(ArrayEdt);
        });
    }

    $("#newSupp").click(function(){
        editSup = false;
        $("#namasupp").val("");
        $("#alamatsup").val("");
        $("#notelp").val("");
        $("#addtitle").text('Tambahkan Supplier Baru');
        $("#savesupp").attr('class','btn btn-primary');
    });

    $("#savesupp").click(function(){
        var Nama = $("#namasupp").val();
        var Alamat = $("#alamatsup").val();
        var Telpon = $("#notelp").val();
        var Message;
        if ( Nama.length == 0 || Alamat.length == 0 || Telpon.length == 0 ) {
            Swal.fire({
                type: 'info',
                title: 'Data Belum Lengkap',
                text: 'Lengkapi data terlebih dahulu!'
            });
            return;
        }
        if (editSup == true) {
            MyUrl = BasicUrl + "aOperator.php?act=13&id=" + editID + "&nam=" + Nama + "&alm=" + Alamat + "&tlp=" + Telpon;
            Message = "Data telah diubah";
        } else {
            MyUrl = BasicUrl + "aOperator.php?act=11&nam=" + Nama + "&alm=" + Alamat + "&tlp=" + Telpon;
            Message = Nama + " telah ditambahkan";
        }
        console.log(MyUrl);
        $.ajax({
            url: MyUrl, dataType: "json",
            beforeSend: function(){},
            success: function(){
                LoadData();
                $("#namasupp").val("");
                $("#alamatsup").val("");
                $("#notelp").val("");
                $("#addModal").modal('hide');
                Swal.fire({
                    position: 'top-end',
                    type: 'success',
                    title: Message,
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            fail: function(){}
        });
    });

    function DeleteSupplier($pos) {
        MyUrl = BasicUrl + "aOperator.php?act=12&id=" + idSup[$pos];
        Swal.fire({
            type: 'warning',
            title: 'Hapus ' + namaSup[$pos] + '?',
            text: 'Data yang dihapus tidak dapat dikembalikan',
            showCancelButton: true,
            confirmButtonColor: '#d9534f',
            confirmButtonText: 'Delete ' + namaSup[$pos]
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: MyUrl, dataType: "json",
                    beforeSend: function(){},
                    success: function(){
                        Swal.fire({
                            position: 'top-end',
                            type: 'success',
                            title: namaSup[$pos] + ' telah dihapus',
                            showConfirmButton: false,
                            timer: 1500
                        });
                        LoadData();
                    },
                    fail: function(){}
                });
            }
        });
    }

    function EditSupplier($edt) {
        editSup = true;
        editID = idSup[$edt];
        $("#addModal").modal('show');
        $("#addtitle").text('Ubah Data Supplier');
        $("#namasupp").val(namaSup[$edt]);
        $("#alamatsup").val(alamat[$edt]);
        $("#notelp").val(noPhone[$edt]);
        $("#savesupp").attr('class','btn btn-warning');
    }

});