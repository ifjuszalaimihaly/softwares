var ajaxfunc = function(szerzo_id, szoftver_azonosito_eleje, megnevezes_reszlet, kiadas_eve, felvitel_napja){
  $.ajax({
    url: 'filter.php',
    type: 'post',
    data: {szerzo_id: szerzo_id, szoftver_azonosito_eleje: szoftver_azonosito_eleje, megnevezes_reszlet: megnevezes_reszlet, kiadas_eve: kiadas_eve, felvitel_napja: felvitel_napja}
  }).done(function(result){
    var tbody = $("tbody");
    tbody.empty();
    console.log(result);
    var json = JSON.parse(result);
    //alert(json.length);
    for(var i = 0; i < json.length; i++){
      tbody.append("<tr id=tr-" + i + ">");
      var tr = $("#tr-"+i);
      tr.append("<th>" + json[i]["software_id"] + "</th>");
      tr.append("<td>" + json[i]["software_name"] + "</td>");
      tr.append("<td>" + json[i]["realese_year"] + "</td>");
      tr.append("<td id=td-" + i + ">");
      for(var j = 0; j < json[i]["authors"].length; j++){
        $("#td-" + i).append(json[i]["authors"][j]["szerzo_nev"]+"<br/>");
      }
      tr.append("</td>");
    }
  }).fail(function(){
    alert('fail');
  });
}
$(document).ready(function(){
  ajaxfunc('','','','','');
$("#send").on("click",function(){
  var author_id = $("#author_id").val();
  var software_id = $("#software_id").val();
  //console.log(software_id);
  var software_name = $("#software_name").val();
  var realese_year = $("#realese_year").val();
  var adding_date = $("#adding_date").val();
  ajaxfunc(author_id,software_id,software_name,realese_year,adding_date);
});
});
