<?php
if(count($_POST) != 5){
  echo "die";
  die();
}
include("functions.php");
$szerzo_id = $_POST["szerzo_id"];
$szoftver_azonosito_eleje = $_POST["szoftver_azonosito_eleje"];
$megnevezes_reszlet = $_POST["megnevezes_reszlet"];
$kiadas_eve = $_POST["kiadas_eve"];
$felvitel_napja = $_POST["felvitel_napja"];
$szerzo_nev="";
$szerzo_nev_help ="";
if($szerzo_id != ''){
  $szerzo_nev_help = query($db,"SELECT szerzo.szerzo_nev FROM szerzo WHERE szerzo.szerzo_id =".$szerzo_id);
  $szerzo_nev = $szerzo_nev_help[0]["szerzo_nev"];
}
$where = szoftver_szures($szerzo_id, $szoftver_azonosito_eleje, $megnevezes_reszlet, $kiadas_eve, $felvitel_napja);
$sql = '';
if($szerzo_nev_help != ''){
  $sql = "SELECT szoftver.szoftver_azonosito, szoftver.megnevezes, szoftver.kiadas_eve, group_concat(szerzo_nev SEPARATOR ',<br>') as szerzok FROM szoftver LEFT JOIN szoftver_szerzoje ON szoftver.szoftver_azonosito = szoftver_szerzoje.szoftver_azonosito LEFT JOIN szerzo ON szoftver_szerzoje.szerzo_id = szerzo.szerzo_id ".$where
  ." GROUP by szoftver.szoftver_azonosito, szoftver.megnevezes, szoftver.kiadas_eve HAVING szerzok LIKE '%".$szerzo_nev."%'";
} else {
  $sql = "SELECT szoftver.szoftver_azonosito, szoftver.megnevezes, szoftver.kiadas_eve, group_concat(szerzo_nev SEPARATOR ',<br>') as szerzok FROM szoftver LEFT JOIN szoftver_szerzoje ON szoftver.szoftver_azonosito = szoftver_szerzoje.szoftver_azonosito LEFT JOIN szerzo ON szoftver_szerzoje.szerzo_id = szerzo.szerzo_id ".$where
  ." GROUP by szoftver.szoftver_azonosito, szoftver.megnevezes, szoftver.kiadas_eve";
}
$stmt = $db->query($sql);
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response = array();
$i = 0;
foreach ($result as $row) {
  $response[$i]["software_id"] = $row["szoftver_azonosito"];
  $response[$i]["software_name"] = $row["megnevezes"];
  $response[$i]["realese_year"] = $row["kiadas_eve"];
  $software_id = $row['szoftver_azonosito'];
  $response[$i]["authors"] = $row["szerzok"];
  $i++;
}
echo(json_encode($response));
?>
