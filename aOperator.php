<?php

include "aConnector.php";

$Action = null;

if ( !isset($_REQUEST['act']) ) {
    $Action = null;
} else {
    $Action = $_REQUEST['act'];
}

$Nusantara = new DatabaseConnect("localhost", "nusantara", "root", "");
$Nusantara->DatabaseOpen();

$Result = array();

if ($Action == null) {
    $MyArray = array( "Response" => "0" );
    $Result = array( "Result" => $MyArray );
    print json_encode( $Result );
}
elseif ($Action == 10) {
    $sqlGet = "SELECT * FROM supplier";
    $Result = array( "hasil" => $Nusantara->GetAll($sqlGet) );
    print json_encode( $Result );
}
elseif ($Action == 11) {
    $sqlAdd = "INSERT INTO supplier (nama, alamat, telpon) VALUES ('".
        $_REQUEST['nam']."','".$_REQUEST['alm']."','".$_REQUEST['tlp']."')";
    $Nusantara->ExecuteQuery( $sqlAdd );
    $MyArray[] = array( "message" => $_REQUEST['nam']." has been saved" );
    $Result = array( "hasil" => $MyArray );
    print json_encode( $Result );
}
elseif ($Action == 12) {
    $sqlDel = "DELETE FROM supplier WHERE id_supplier=".$_REQUEST['id'];
    $Nusantara->ExecuteQuery( $sqlDel );
    $MyArray[] = array( "message" => "id ".$_REQUEST['id']." has been deleted" );
    $Result = array( "hasil" => $MyArray );
    print json_encode( $Result );
}
elseif ($Action == 13) {
    $sqlEdit = "UPDATE supplier SET nama='".$_REQUEST['nam']."', alamat='".
        $_REQUEST['alm']."', telpon='".$_REQUEST['tlp']."' WHERE id_supplier=".
        $_REQUEST['id'];
    $Nusantara->ExecuteQuery( $sqlEdit );
    $MyArray[] = array( "message" => "id ".$_REQUEST['id']." has been edited" );
    $Result = array( "hasil" => $MyArray );
    print json_encode( $Result );
}
elseif ($Action == 20) {
    $sqlGet = "SELECT * FROM obat";
    $Result = array( "hasil" => $Nusantara->GetAll($sqlGet) );
    print json_encode( $Result );
}

?>