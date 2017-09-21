<?php
include_once("db_config.php");
function query($db,$sql){
  $stmt = $db->query($sql);
  $response = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $stmt = null;
  $db = null;
  return $response;
}
function szoftver_szures($szerzo_id='', $szoftver_azonosito_eleje='', $megnevezes_reszlet='', $kiadas_eve='', $felvitel_napja='') {
  $and = " AND ";
  $where = "";
  $is_first = true;
  if($szerzo_id != ''){
      $where .= "szerzo.szerzo_id=".$szerzo_id;
      $is_first = false;
  }
  if($szoftver_azonosito_eleje != ''){
      if($is_first){
        $where .= "szoftver.szoftver_azonosito LIKE '".$szoftver_azonosito_eleje."%'";
      }
      //$where .= $and."szoftver.szoftver_azonosito LIKE '".$szoftver_azonosito_eleje."%'";
  }
  if($megnevezes_reszlet != ''){
      $where .= $and."szoftver.megnevezes LIKE '%".$megnevezes_reszlet."%'";
  }
  if($kiadas_eve != ''){
    if(strlen($kiadas_eve) == 4) {
      $where .= $and."szoftver.kiadas_eve=".$kiadas_eve;
    }
    if(strlen($kiadas_eve) == 9) {
      $begin = substr($kiadas_eve,0,4);
      $end = substr($kiadas_eve,5,4);
      $where .= $and."szoftver.kiadas_eve".$begin." BETWEEN ".$and.$end;
    }
  }
  if($felvitel_napja != ''){
    $where .= $and."szoftver.felvitel_idopontja LIKE '".$felvitel_napja."%'";
  }
  if(strlen($where) != 0){
    $where = " WHERE ".$where;
  }
  return $where;
}
?>
