<!DOCTYPE html>
<html lang="hu">
<head>
  <title>Szoftverek</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">
  <link href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css" rel="stylesheet">
</head>
<body>
  <div class="container-fluid">
    <h1>Szoftverek szűrése</h1>
    <div class="row">
      <div class="col-md-3">
        <form class="form">
          <div class="form-group">
            <label>Szerző</label>
            <select id="author_id" class="form-control">
            </select>
          </div>
          <div class="form-group">
            <label>Szoftver azonosító</label>
            <input id="software_id" class="form-control" type="text"/>
          </div>
          <div class="form-group">
            <label>Szoftver megnevezés</label>
            <input id="software_name" class="form-control" type="text"/>
          </div>
          <div class="form-group">
            <label>Kiadás éve</label>
            <input id="realese_year" class="form-control" type="text"/>
          </div>
          <div class="form-group">
            <label>Felvitel napja</label>
            <input id="adding_date" class="form-control" type="text"/>
          </div>
          <a id="send" class="btn btn-primary">Adatok betöltése</a>
        </form>
      </div>
      <div class="col-md-9">
        <table class="table table-striped disp">
          <thead>
            <tr>
              <th class="order" id="th-0">Szoftver azonosító</th>
              <th class="order" id="th-1">Szoftver megnevezés</th>
              <th class="order" id="th-2">Kiadás éve</th>
              <th>Szerzők</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
        <div style="font-size: 24px; line-height: 1.5em;">
          <div class="col-xs-1">
            <i  id="left-arrow" class="fa fa-arrow-left" aria-hidden="true"></i>
          </div>
          <div class="col-xs-10" id="pagediv" style="text-align: center;"></div>
          <div class="col-xs-1" style="float: right;">
            <i id="right-arrow" class="fa fa-arrow-right" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- Optional JavaScript -->
<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="https://cdn.datatables.net/1.10.9/js/jquery.dataTables.min.js"></script>
<script src="https://cdn.datatables.net/1.10.9/js/dataTables.bootstrap.min.js"></script>
<script>
window.datatable = $("table").DataTable({
  searching: false,
  paginate: false,
  info: false,
  columns:
  [
    {"orderable": true},
    {"orderable": true},
    {"orderable": true},
    {"orderable": false}
  ],
  language: {
    "lengthMenu": "_MENU_ sor megjelenítése oldalanként",
    "infoEmpty": "Nincs elérhető adat a táblázatban",
    "info":  "_START_ és _END_ közötti elemek megejelíntése, összesen: _TOTAL_ elem",
    "zeroRecords": "Nincs megjeleníthető adat"
  }
});
</script>
<script src="js/script.js"></script>
</body>
</html>
