<?php
$host = "localhost";
$name = "root";
$pass = "";
$dbname= "quizil";

$conn = mysqli_connect($host,$name,$pass,$dbname);
mysqli_set_charset($conn, 'UTF8');
if(isset($conn)){
  mysqli_select_db($conn,$dbname);
}else{
  echo "Ket noi CSDL that bai";
}


?> 


