var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var orderarray = [[0,'asc'],[1,'desc'],[2,'asc']];
var arrayposnull;
for(var i = 0; i < orderarray.length; i++){
  console.log(orderarray[i][0] + " " + orderarray[i][1]);
}
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
  var ajaxfunc = function(url, mode, data){
    ajaxdata = $.ajax({
      url: url,
      type: 'post',
      data: data,
      success: function(result){
        var json = JSON.parse(result);
        if(mode == "table"){
          tablesucces(json);
        }
      }, error: function(){
        console.log("fail");
      }
    });
  };
  var order = function(position){
    if(orderarray[position] != arrayposnull[0]){
      console.log("if");
      var indexcurrentposition;
      for(var i = 0; i < orderarray.length; i++){
        if(orderarray[i][0] == position){
          console.log(position);
          indexcurrentposition = position;
        }
      }
      //swap here too
      var j = 0;
      var copyarray = [];
      for(var i = 0; i < orderarray.length; i++){
        if(i != indexcurrentposition){
          copyarray[j] = orderarray[i];
          j++;
        }
      }
      console.log("copyarray " + copyarray.toString());


      for(var i = 0; i < copyarray.length; i++){
        orderarray[i+1] = copyarray[i];
      }
      orderarray[0] = orderarray[indexcurrentposition];
      if(orderarray[0][1] == "asc"){
        console.log("asc");
        orderarray[0][1] = "desc";
      } else if (orderarray[0][1] =="desc") {
        orderarray[0][1] = 'asc';
        console.log("desc");
      }
      console.log(orderarray[0]);
    } else {
      console.log("else");
      /*if(orderarray[position][1] == 'asc'){
        orderarray[position][1] = 'desc';
      } else if (orderarray[position][1] == 'desc') {
        orderarray[position][1] = 'asc';
      }*/
    }
    arrayposnull = orderarray[0];
    console.log("orderarray " + orderarray.toString());
    console.log(arrayposnull);
    datatable.order(orderarray);
    datatable.draw()
  }
  $(document).ready(function(){
    var data = {
      szerzo_id: '',
      szoftver_azonosito_eleje: '',
      megnevezes_reszlet: '',
      kiadas_eve: '',
      felvitel_napja: ''
    };
    arrayposnull = orderarray[0];
    ajaxfunc('filter.php','table',data);
    $("#send").on("click",function(){
      var data = {
        szerzo_id: $("#author_id").val(),
        szoftver_azonosito_eleje: $("#software_id").val(),
        megnevezes_reszlet: $("#software_name").val(),
        kiadas_eve: $("#realese_year").val(),
        felvitel_napja: $("#adding_date").val(),
      }
      ajaxfunc('filter.php','table',data);
    });
    $("#th-0").on("click",function(){
      order(0);
    });
    $("#th-1").on("click",function(){
      order(1);
    });
    $("#th-2").on("click",function(){
      order(2);
    });

  });
