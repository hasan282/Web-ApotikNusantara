$(document).ready(function(){

    var MyUrl, idSup, namaSup, alamat, noPhone;
    var BasicUrl = "http://localhost/myws/";

    LoadData();

    function LoadData() {
        MyUrl = BasicUrl + "Operator.php?act=10";
        idSup = [], namaSup = [], alamat = [], noPhone = [];
        $.ajax({
            url: MyUrl, dataType: "json",
            beforeSend: function(){
                $("#kotak").html(MyUrl);
            },
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
            Rows += "<tr><td class='text-center'>" + idSup[tb] + "</td>";
            Rows += "<td>" + namaSup[tb] + "</td><td>" + alamat[tb];
            Rows += "</td><td>" + noPhone[tb] + "</td>";
            Rows += "<td style='width:13%' class='text-center'><button class='edtz btn btn-sm btn-outline-warning' id='" + tb + "'>Edit</button>";
            Rows += "&nbsp;<button class='delz btn btn-sm btn-outline-danger' id='" + tb + "'>Delete</button></td></tr>";
        }
        var tabelSup = "<table class='table table-dark table-sm table-striped'><tr><th class='text-center'>ID</th><th>Nama Supplier</th>" +
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

    $("#savesupp").click(function(){
        var Nama = $("#namasupp").val();
        var Alamat = $("#alamatsup").val();
        var Telpon = $("#notelp").val();
        if ( Nama.length == 0 || Alamat.length == 0 || Telpon.length == 0 ) {
            alert("Lengkapi Data");
            return;
        }
        MyUrl = BasicUrl + "Operator.php?act=11&nam=" + Nama + "&alm=" + Alamat + "&tlp=" + Telpon;
        console.log(MyUrl);
        $.ajax({
            url: MyUrl, dataType: "json",
            beforeSend: function(){},
            success: function(){
                LoadData();
                $("#namasupp").val("");
                $("#alamatsup").val("");
                $("#notelp").val("");
            },
            fail: function(){}
        });
    });

    function DeleteSupplier($pos) {
        MyUrl = BasicUrl + "Operator.php?act=12&id=" + idSup[$pos];
        alert("delete "+namaSup[$pos]+" => "+MyUrl);
    }

    function EditSupplier($edt) {
        MyUrl = BasicUrl + "Operator.php?act=13&id=" + idSup[$edt] + "&nam=" +
            namaSup[$edt] + "&alm=" + alamat[$edt] + "&tlp=" + noPhone[$edt];
        alert("edit "+namaSup[$edt]+" => "+MyUrl);
    }

});