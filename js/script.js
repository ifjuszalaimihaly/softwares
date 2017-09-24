var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var orderarray = [[0,'asc'],[1,'desc'],[2,'asc']];
var arrayposnull;
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
    datatable.order(orderarray);
    //arrayposnull = 0;
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
  var order = function(array, position){
    console.log("order");
    var index;
    for(var i = 0; i< array.length; i++){
      console.log(array[i][0] + " " + position);
      if(array[i][0] == position){
        index = i;
      }
    }
    console.log(index);
    var nullelement = array[index];
    if(nullelement[1] == "asc"){
      nullelement[1] = "desc";
    } else if (nullelement[1] == "desc") {
      nullelement[1] = "asc";
    }
    console.log("nullelement " + nullelement);
    if(index == 0){
      return array;
    }
    var copyarray = [];
    var j = 0;
    for(var i = 0; i< array.length; i++){
      console.log("i index " + i + " " + index);
      if(i != index){
        copyarray[j] = array[i];
        j++;
      }
    }


    console.log(copyarray);
    returnarray = [];
    returnarray[0] = nullelement;
    for(var i = 0; i < copyarray.length; i++){
      returnarray[i+1] = copyarray[i];
    }
    console.log("returnarray " + returnarray);
    return returnarray;
  }
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
    $("#th-0").on("click",function(){
      ///console.log(arrayposnull);
      //console.log(orderarray.toString());
      orderarray = order(orderarray,0);

      datatable.order(orderarray);
      datatable.draw();
    });
    $("#th-1").on("click",function(){
      //console.log(arrayposnull);
      //console.log(orderarray.toString());
      //if(arrayposnull[0] != 1){
      orderarray = order(orderarray,1);
      datatable.order(orderarray);
      datatable.draw();
    });
    $("#th-2").on("click",function(){
      //console.log(arrayposnull);
      //console.log(orderarray.toString());
      //if(arrayposnull[0] != 2){
      orderarray = order(orderarray,2);
      datatable.order(orderarray);
      datatable.draw();
    });
  });
