<!doctype html>
<html lang="en">

<head>
	<meta charset="utf-8"/>
	<title><?php echo SITE_NAME; ?></title>
	
	<link href="<?php echo CSS_DIR."/"; ?>layout.css" rel="stylesheet" type="text/css" media="screen" />
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="css/ie.css" type="text/css" media="screen" />
	<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
	<script src="<?php echo JS_DIR; ?>/jquery-1.7.1.min.js" type="text/javascript"></script>
        <script src="<?php echo JS_DIR; ?>/AC_QuickTime.js" language="JavaScript" type="text/javascript"></script>
	<script src="<?php echo JS_DIR; ?>/hideshow.js" type="text/javascript"></script>
	<script src="<?php echo JS_DIR; ?>/jquery.tablesorter.min.js" type="text/javascript"></script>
	<script type="text/javascript" src="<?php echo JS_DIR; ?>/jquery.equalHeight.js"></script>
	<script type="text/javascript">
	$(document).ready(function() 
    	 { 
          
      	   $(".tablesorter").tablesorter({
               headers: {0: { sorter: false} }
           });
       } 
	);
	$(document).ready(function() {

	//When page loads...
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content

	//On Click Event
	$("ul.tabs li").click(function() {

		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content

		var activeTab = $(this).find("a").attr("href"); //Find the href attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active ID content
		return false;
	});

});
    </script>
    

</head>

<body>

	<header id="header">
		<hgroup>
			<h1 class="site_title"><a href="<?php echo site_url("user"); ?>"><?php echo SITE_NAME; ?></a></h1>
<!-- 
			<h2 class="section_title">Dashboard</h2><div class="btn_view_site"><a href="http://www.medialoot.com">View Site</a></div>
-->
		</hgroup>
	</header> <!-- end of header bar -->
	
	<section id="secondary_bar">
		
<?php
	if($this->tank_auth->is_logged_in())  {
            
            echo "<div class='user'>";
            echo "<p>".$this->tank_auth->get_username()."</p>";
            echo "</div>";    
	}
?>
		
            <div class="breadcrumbs_container" >
            </div>
	</section><!-- end of secondary bar -->

<?php
        $str ="";
       if($this->tank_auth->is_logged_in())  {
		require ("sidebar_v.php");
	}
        else{
            $str=" style='width:100%;' ";
        }
        
       
?>

	<section id="main" class="column" <?php echo $str; ?>>
		
