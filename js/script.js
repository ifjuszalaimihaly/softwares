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
var th_software_id_order = $("th.software_id");
var th_software_name_order = $("th.software_name");
var th_realese_year_order = $("th.realese_year");
var orderarray = [];
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
  /*orderarray["order"]["software_id"] = th_software_id_order.data("order");
  orderarray["order"]["software_name"]= th_software_id_order.data("order");
  orderarray["order"]["realese_year"] = th_software_id_order.data("order");
  orderarray["position"]["software_id"] = th_software_id_order.data("position");
  orderarray["position"]["software_name"] = th_software_id_order.data("position");
  orderarray["position"]["realese_year"] = th_software_id_order.data("position");*/
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
    order("software_id","ASC");
  });
  $("#software_id_desc").on("click",function(){
    $(this).css("color","red");
    $("#software_id_asc").css("color","");
    order("software_id","DESC");
  });
  $("#software_name_asc").on("click",function(){
    $(this).css("color","red");
    $("#software_name_desc").css("color","");
    order("software_name","ASC");
  });
  $("#software_name_desc").on("click",function(){
    $(this).css("color","red");
    $("#software_name_asc").css("color","");
    order("software_name","DESC");
  });
  $("#realese_year_asc").on("click",function(){
    $(this).css("color","red");
    $("#realese_year_desc").css("color","");
    order("realese_year","ASC");
  });
  $("#realese_year_desc").on("click",function(){
    $(this).css("color","red");
    $("#realese_year_asc").css("color","");
    order("realese_year","DESC");
  });

});
