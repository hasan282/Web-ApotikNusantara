<?php

class DatabaseConnect {
    var $Connect, $Server, $Database, $Username, $Password;

    public function __construct( $serv, $dbase, $user, $pass ) {
        $this->Server = $serv;
        $this->Database = $dbase;
        $this->Username = $user;
        $this->Password = $pass;
    }

    public function DatabaseOpen() {
        $this->Connect = mysqli_connect( $this->Server, $this->Username, $this->Password, $this->Database )
        or die( mysqli_error() );
    }

    public function ExecuteQuery( $sqlQuery ) {
        mysqli_query( $this->Connect, $sqlQuery ) or die( mysqli_error( $this->Connect ) );
    }

    public function GetAll( $sqlAll ) {
        $AllData = array();
        $Query = mysqli_query( $this->Connect, $sqlAll ) or die( mysqli_error( $this->Connect ) );
        while( $row = mysqli_fetch_assoc($Query) ) {
            $AllData[] = $row;
        }
        return $AllData;
    }
}

?>