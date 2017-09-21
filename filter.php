<?php
  if(count($_POST) != 5){
    die();
  }
  include("functions.php");
  $szerzo_id = $_POST["szerzo_id"];
  $szoftver_azonosito_eleje = $_POST["szoftver_azonosito_eleje"];
  $megnevezes_reszlet = $_POST["megnevezes_reszlet"];
  $kiadas_eve = $_POST["kiadas_eve"];
  $felvitel_napja = $_POST["felvitel_napja"];
  $where = szoftver_szures($szerzo_id, $szoftver_azonosito_eleje, $megnevezes_reszlet, $kiadas_eve, $felvitel_napja);
  $sql = "SELECT DISTINCT szoftver.szoftver_azonosito, szoftver.megnevezes, szoftver.kiadas_eve, szerzo.szerzo_id FROM szoftver INNER JOIN szoftver_szerzoje LEFT JOIN szerzo ON szoftver.szoftver_azonosito = szoftver_szerzoje.szoftver_azonosito AND szoftver_szerzoje.szerzo_id = szerzo.szerzo_id ".$where;
  $stmt = $db->query($sql);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $response = array();
  $i = 0;
  foreach ($result as $row) {
    $response[$i]["software_id"] = $row["szoftver_azonosito"];
    $response[$i]["software_name"] = $row["megnevezes"];
    $response[$i]["realese_year"] = $row["kiadas_eve"];
    $software_id = $row['szoftver_azonosito'];
    $response[$i]["authors"] = query($db, "SELECT szerzo.szerzo_nev FROM szerzo INNER JOIN szoftver_szerzoje ON szerzo.szerzo_id = szoftver_szerzoje.szerzo_id WHERE szoftver_szerzoje.szoftver_azonosito ='".$software_id."' ORDER BY szerzo_nev");
    $i++;
  }
  echo(json_encode($response));
?>
