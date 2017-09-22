var page = 1;
var minlimit = (page - 1) * 10;
var maxlimit = page * 10;
var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var pagediv = $("#page-div");
var currentpage;
var software_id_order = $("th.software_id").data("order");
var software_name_order = $("th.software_name").data("order");
var realese_year_order = $("th.realese_year").data("order");
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
      if(json[i]["authors"] == null){
        tr.append("<td></td>");
      } else {
        tr.append("<td>" + json[i]["authors"] + "</td>");
      }
    }
  }
}
var ajaxfunc = function(url, mode, data){
  ajaxdata = $.ajax({
    url: url,
    type: 'post',
    data: data,
    success: function(result){
      var json = JSON.parse(result);
      if(mode == "table"){
          tablesucces(json);
          pagediv.text(page + ". oldal");
      }
      if(mode == "paginate"){
        if(json.length > 0){
          tablesucces(json);
          page = currentpage;
          pagediv.text(page + ". oldal");
        }
      }
    }, error: function(){
      console.log("fail");
    }
  });
};
var paginate = function (distance){
  console.log("paginate");
  currentpage = page;
  currentpage += distance;
  console.log(currentpage);
  minlimit = (currentpage - 1) * 10;
  maxlimit = currentpage * 10;
  var data = {
    szerzo_id: $("#author_id").val(),
    szoftver_azonosito_eleje: $("#software_id").val(),
    megnevezes_reszlet: $("#software_name").val(),
    kiadas_eve: $("#realese_year").val(),
    felvitel_napja: $("#adding_date").val(),
  }
  data["minlimit"] = minlimit;
  data["maxlimit"] = maxlimit;
  count = ajaxfunc('filter.php','paginate',data);
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
    minlimit: minlimit,
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
    page = 1;
    minlimit = (page - 1) * 10;
    maxlimit = page * 10;
    data["minlimit"] = minlimit;
    data["maxlimit"] = maxlimit;
    ajaxfunc('filter.php','table',data);
  });
  $("#right-arrow").on("click",function(){
    paginate(1);
  });
  $("#left-arrow").on("click",function(){
    if(page>1){
      paginate(-1);
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
