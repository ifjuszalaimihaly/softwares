var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var tablesucces = function(json){
  datatable.clear();
  for(var i = 0; i < json.length; i++){
    datatable.row.add(
      [
        json[i]["software_id"],
        json[i]["software_name"],
        json[i]["realese_year"],
        json[i]["authors"]
      ]);
    }
    datatable.draw();
  }
  var selectcussess = function(json){
    var select = $("#author_id");
    select.append("<option></option>");
    for(var i = 0; i < json.length; i++){
      select.append("<option value='"+json[i]["author_id"]+"'>"+json[i]["author_name"]+"</option>")
    }
  }
  var ajaxfunc = function(url, method, mode, data){
    ajaxdata = $.ajax({
      url: url,
      type: method,
      data: data,
      success: function(result){
        console.log(result);
        var json = JSON.parse(result);
        if(mode == "table"){
          tablesucces(json);
        }
        if(mode == "select"){
          selectcussess(json);
        }
      }, error: function(){
        console.log("fail");
      }
    });
  };
  $(document).ready(function(){
    var data = {
      szerzo_id: '',
      szoftver_azonosito_eleje: '',
      megnevezes_reszlet: '',
      kiadas_eve: '',
      felvitel_napja: ''
    };
    ajaxfunc('query.php','get','select',null);
    ajaxfunc('filter.php','post','table',data);
    $("#send").on("click",function(){
      var data = {
        szerzo_id: $("#author_id").val(),
        szoftver_azonosito_eleje: $("#software_id").val(),
        megnevezes_reszlet: $("#software_name").val(),
        kiadas_eve: $("#realese_year").val(),
        felvitel_napja: $("#adding_date").val(),
      }
      ajaxfunc('filter.php','post','table',data);
    });
  });
