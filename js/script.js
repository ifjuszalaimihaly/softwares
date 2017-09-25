var page = 1;
var minlimit = (page - 1) * 10;
var maxlimit = 10;
var currentpage;
var pagediv = $("#pagediv");
var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var orderarray = [[0,'asc'],[1,'desc'],[2,'asc']];
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
          console.log(result)
          tablesucces(json);
          console.log("page " + page);
          pagediv.text(page + ". oldal");
        }
        if(mode ==  "paginate"){
          console.log(json.length);
          if(json.length != 0){
            tablesucces(json);
            page = currentpage;
            console.log(minlimit + " " + maxlimit);
            pagediv.text(page + ". oldal");
        }
        }
        if(mode == "select"){
          selectcussess(json);
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
    maxlimit = 10;
    var data = {
      szerzo_id: $("#author_id").val(),
      szoftver_azonosito_eleje: $("#software_id").val(),
      megnevezes_reszlet: $("#software_name").val(),
      kiadas_eve: $("#realese_year").val(),
      felvitel_napja: $("#adding_date").val(),
      minlimit: minlimit,
      maxlimit: maxlimit,
    }
    ajaxfunc('filter.php','post','paginate',data);
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
      felvitel_napja: '',
      minlimit: minlimit,
      maxlimit: maxlimit,
    };
    ajaxfunc('query.php','get','select',null);
    ajaxfunc('filter.php','post','table',data);
    page = 1;
    minlimit = (page - 1) * 10;
    maxlimit = 10;
    $("#send").on("click",function(){
      var data = {
        szerzo_id: $("#author_id").val(),
        szoftver_azonosito_eleje: $("#software_id").val(),
        megnevezes_reszlet: $("#software_name").val(),
        kiadas_eve: $("#realese_year").val(),
        felvitel_napja: $("#adding_date").val(),
        minlimit: minlimit,
        maxlimit: maxlimit,
      }
      ajaxfunc('filter.php','post','table',data);
    });
    $("#th-0").on("click",function(){
      orderarray = order(orderarray,0);
      datatable.order(orderarray);
      datatable.draw();
    });
    $("#th-1").on("click",function(){
      orderarray = order(orderarray,1);
      datatable.order(orderarray);
      datatable.draw();
    });
    $("#th-2").on("click",function(){
      orderarray = order(orderarray,2);
      datatable.order(orderarray);
      datatable.draw();
    });
    $("#right-arrow").on("click",function(){
      paginate(1);
    });
    $("#left-arrow").on("click",function(){
      if(page>1){
        paginate(-1);
      }
    });
  });
