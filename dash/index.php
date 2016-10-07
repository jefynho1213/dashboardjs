<!DOCTYPE html>
<html>
<head>
	<!-- HighStock chart -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<script src="/dash/highstock/js/highstock.js"></script>
	<!-- AngularJS -->
	<script src="/dash/angular/angular.min.js"></script>
	<!-- Module Dash -->
	<script src="/dash/js/module.js"></script>
	<!-- Chart Directive -->
	<script src="/dash/components/simpleChart.js"></script>
	<!-- NavBar Directive -->
	<script src="/dash/components/navbar.js"></script>
	<!-- Bootstrap -->
	<script src="/dash/bootstrap/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/dash/bootstrap/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="/dash/bootstrap/css/bootstrap-theme.min.css">
	<link rel="stylesheet" type="text/css" href="style/main.css">
	<title>DsJS</title>
</head>
<body ng-app="dash">
 	<navbar title="Dashboard" buttons='[{"name":"Home", "link" : "#/home"}, {"name":"about", "link": "#/about"}]'></navbar>
<div class="jumbotron text-center">
  <h1>DashboardJS</h1>
  <p>Easy Programming</p> 
</div>
<div class="container">
  <div class="row">
    <div class="col-sm-6">
    	<chart json="/dash/components/jsonExample.json" title="chart1" namecounter="AAPL"></chart>
    </div>
    <div class="col-sm-6">
    	<chart json="/dash/components/jsonExample.json" title="chart2" namecounter="AAPL"></chart>
  </div>
</div>

</body>
</html>
