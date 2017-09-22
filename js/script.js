var page = 1;
var minlimimit = (page - 1) * 10;
var maxlimit = page * 10;
var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var pagediv = $("#page-div");
var countresults;
var software_id_order = $("th.software_id").data("order");
var software_name_order = $("th.software_name").data("order");
var realese_year_order = $("th.realese_year").data("order");
var ajaxdata;
var tablesucces = function(json){
  var tbody = $("tbody");
  tbody.empty();
  if(json.length > 0){
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
  }
}
var ajaxfunc = function(url, mode, data){
  ajaxdata = $.ajax({
    url: url,
    type: 'post',
    data: data,
    success: function(result){
      if(mode == "table"){
        var json = JSON.parse(result);
        if(json.length > 0){
          tablesucces(json);
        }
        //return json.length;
      }
    }, error: function(){
      console.log("fail");
    }
  });
};
var paginate = function (currentpage){
  console.log("paginate");
  minlimimit = (currentpage - 1) * 10;
  maxlimit = currentpage * 10;
  var data = {
    szerzo_id: $("#author_id").val(),
    szoftver_azonosito_eleje: $("#software_id").val(),
    megnevezes_reszlet: $("#software_name").val(),
    kiadas_eve: $("#realese_year").val(),
    felvitel_napja: $("#adding_date").val(),
  }
  data["minlimimit"] = minlimimit;
  data["maxlimit"] = maxlimit;
  var count = ajaxfunc('filter.php','table',data);
  console.log(ajaxdata);
  console.log("paginate countresults " + countresults)
  if(count > 0){
    page = currentpage;
    pagediv.text(page + ". oldal");
  }
}
var order = function(column, direction){
  console.log(column + " " + direction);
};
$(document).ready(function(){
  $("#software_id_asc").css("color","red");
  $("#software_name_desc").css("color","red");
  $("#realese_year_asc").css("color","red");
  var data = {
    szerzo_id: '',
    szoftver_azonosito_eleje: '',
    megnevezes_reszlet: '',
    kiadas_eve: '',
    felvitel_napja: '',
    minlimimit: minlimimit,
    maxlimit: maxlimit
  };
  ajaxfunc('filter.php','table',data);
  pagediv.text(page + ". oldal");
  $("#send").on("click",function(){
    var data = {
      szerzo_id: $("#author_id").val(),
      szoftver_azonosito_eleje: $("#software_id").val(),
      megnevezes_reszlet: $("#software_name").val(),
      kiadas_eve: $("#realese_year").val(),
      felvitel_napja: $("#adding_date").val(),
    }
    data["minlimimit"] = minlimimit;
    data["maxlimit"] = maxlimit;
    ajaxfunc('filter.php','table',data);
  });
  $("#right-arrow").on("click",function(){
    paginate(page + 1);
  });
  $("#left-arrow").on("click",function(){
    if(page > 1){
      paginate(page - 1);
    }
  });
  $("#software_id_asc").on("click",function(){
    $(this).css("color","red");
    $("#software_id_desc").css("color","");
    order("software_id","asc");
  });
  $("#software_id_desc").on("click",function(){
    $(this).css("color","red");
    $("#software_id_asc").css("color","");
    order("software_id","desc");
  });
  $("#software_name_asc").on("click",function(){
    $(this).css("color","red");
    $("#software_name_desc").css("color","");
    order("software_name","asc");
  });
  $("#software_name_desc").on("click",function(){
    $(this).css("color","red");
    $("#software_name_asc").css("color","");
    order("software_name","desc");
  });
  $("#realese_year_asc").on("click",function(){
    $(this).css("color","red");
    $("#realese_year_desc").css("color","");
    order("realese_year","asc");
  });
  $("#realese_year_desc").on("click",function(){
    $(this).css("color","red");
    $("#realese_year_asc").css("color","");
    order("realese_year","desc");
  });

});
