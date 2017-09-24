<?php
  include("functions.php");
  $authors = query($db,"SELECT szerzo_id as author_id ,szerzo.szerzo_nev as author_name FROM szerzo ORDER BY author_name ASC");
  echo(json_encode($authors));
?>
