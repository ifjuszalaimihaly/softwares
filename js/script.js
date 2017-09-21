var page = 1;
var minlimimit = (page - 1) * 10;
var maxlimit = page * 10;
var author_id = $("#author_id").val();
var software_id = $("#software_id").val();
var software_name = $("#software_name").val();
var realese_year = $("#realese_year").val();
var adding_date = $("#adding_date").val();
var pagediv = $("#page-div");
var results;
var ajaxfunc = function(szerzo_id, szoftver_azonosito_eleje, megnevezes_reszlet, kiadas_eve, felvitel_napja, minlimimit, maxlimit){
  //alert("minlimimit " + minlimimit + " maxlimit " + maxlimit);
  $.ajax({
    url: 'filter.php',
    type: 'post',
    data: {
      szerzo_id: szerzo_id,
      szoftver_azonosito_eleje: szoftver_azonosito_eleje,
      megnevezes_reszlet: megnevezes_reszlet,
      kiadas_eve: kiadas_eve,
      felvitel_napja: felvitel_napja,
      minlimimit: minlimimit,
      maxlimit: maxlimit},
      success: function(result){
        var tbody = $("tbody");
        tbody.empty();
        console.log(result);
        var json = JSON.parse(result);
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
        results = json.length;
      }, error: function(){
        alert('fail');
      }
    });
  };
    var paginate = function (currentpage){
      //alert("currentpage " + currentpage);
      minlimimit = (currentpage - 1) * 10;
      maxlimit = currentpage * 10;
      author_id = $("#author_id").val();
      software_id = $("#software_id").val();
      software_name = $("#software_name").val();
      realese_year = $("#realese_year").val();
      adding_date = $("#adding_date").val();
      ajaxfunc(author_id,software_id,software_name,realese_year,adding_date,minlimimit,maxlimit);
      if(results > 0){
        page = currentpage;
        //alert("results " + results);
        //alert("page " + page);
        pagediv.text(page + ". oldal");
      }
    }
    $(document).ready(function(){
      ajaxfunc('','','','','',minlimimit,maxlimit);
      pagediv.text(page + ". oldal");
      $("#send").on("click",function(){var author_id = $("#author_id").val();
      author_id = $("#author_id").val();
      software_id = $("#software_id").val();
      software_name = $("#software_name").val();
      realese_year = $("#realese_year").val();
      adding_date = $("#adding_date").val();
      ajaxfunc(author_id,software_id,software_name,realese_year,adding_date,minlimimit,maxlimit);
    });
    $("#right-arrow").on("click",function(){
      paginate(page + 1);
    });
    $("#left-arrow").on("click",function(){
      paginate(page - 1);
    });
  });
