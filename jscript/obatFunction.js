$(document).ready(function(){

    var MyURL;
    var idObat, namaObat, kategori, hargaObat, stokObat, noSupplier;
    var idSupp, namaSupp, alamat, noTelp;
    var BasicUrl = "http://localhost/myws/";

    LoadSupplier();

    function LoadSupplier() {
        MyURL = BasicUrl + "aOperator.php?act=10";
        idSupp = [], namaSupp = [], alamat = [], noTelp = [];
        $.ajax({
            url: MyURL, dataType: "json",
            beforeSend: function(){},
            success: function(Res){
                var jsonValues = Res.hasil;
                var Loop = 0;
                $.each(jsonValues,function(kie,val){
                    idSupp[Loop] = val.id_supplier;
                    namaSupp[Loop] = val.nama;
                    alamat[Loop] = val.alamat;
                    noTelp[Loop] = val.telpon;
                    Loop++;
                });
                LoadObat();
                FillComBox();
            },
            fail: function(){}
        });
    }

    function LoadObat() {
        MyURL = BasicUrl + "aOperator.php?act=20";
        idObat = [], namaObat = [], kategori = [];
        hargaObat = [], stokObat = [], noSupplier = [];
        $.ajax({
            url: MyURL, dataType: "json",
            beforeSend: function(){},
            success: function(Res){
                var jsonValues = Res.hasil;
                var Loop = 0;
                $.each(jsonValues,function(kie,val){
                    idObat[Loop] = val.id_obat;
                    namaObat[Loop] = val.nama;
                    kategori[Loop] = val.kategori;
                    hargaObat[Loop] = val.harga;
                    stokObat[Loop] = val.stok;
                    noSupplier[Loop] = val.id_supplier;
                    Loop++;
                });
                ShowTable();
            },
            fail: function(){}
        });
    }

    function ShowTable() {
        var Rows = "";
        var SupArray;
        for (let ob = 0; ob < idObat.length; ob++) {
            for (let sp = 0; sp < idSupp.length; sp++) {
                if (noSupplier[ob] == idSupp[sp]) {
                    SupArray = sp;
                }
            }
            Rows += "<tr><td class='text-center'>" + (ob + 1) + "</td>";
            Rows += "<td>" + namaObat[ob] + "</td><td>" + kategori[ob] + "</td>";
            Rows += "<td class='text-right'>" + hargaObat[ob] + "</td><td class='text-right'>" + stokObat[ob] + "</td>";
            Rows += "<td class='text-center'><a class='supz' style='color:white' href='' data-toggle='modal' ";
            Rows += "data-target='#dataSup' id='" + SupArray + "'>" + namaSupp[SupArray] + "</a></td>";
            Rows += "<td class='text-right'><button class='btn btn-sm btn-outline-warning'>Edit</button>";
            Rows += "&nbsp;<button class='btn btn-sm btn-outline-danger'>Delete</button></td></tr>";
        }
        var TabelObat = "<table class='table table-dark table-striped'><tr><th class='text-center'>No.</th>" +
            "<th>Nama Obat</th><th>Kategori</th><th class='text-right'>Harga Obat</th><th class='text-right'>Stok</th>" +
            "<th class='text-center'>Nama Supplier</th><th></th></tr>" + Rows + "</table>";
        $("#boxobat").html(TabelObat);
        $(".supz").click(function(){
            var tbSupp = InfoSupplier(this.id);
            $("#showSup").html(tbSupp);
        });
    }

    function InfoSupplier(array) {
        var TabelSupp = "<table class='table table-bordered table-dark table-striped'><tr><td><strong>Nama Supplier</strong>" +
            "</td><td>" + namaSupp[array] + "</td></tr><tr><td><strong>Alamat</strong></td><td>" + alamat[array] + "</td></tr>" +
            "<tr><td><strong>No. Telp</strong></td><td>" + noTelp[array] + "</td></tr></table>";
        return TabelSupp;
    }

    function FillComBox() {
        var Opt = "";
        for (let sp = 0; sp < namaSupp.length; sp++) {
            Opt += "<option value='" + namaSupp[sp] + "'>" + namaSupp[sp] + "</option>";
        }
        $("#namasupp").html(Opt);
    }

    $("#shows").click(function(){
        $('.trans').toggleClass('trans-active');
    });

});