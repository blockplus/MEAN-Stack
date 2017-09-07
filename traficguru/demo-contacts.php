<?php
mb_internal_encoding("UTF-8"); 
if( isset($_POST['name']) )
{   
        //Send to admin email
	$to = 'info@montvert.com'; // Replace with your email
	//$to = 'georgi.kovachev2014@gmail.com'; 
	$subject = 'Demande de soumission - Montvert.com'; // Replace with your subject if you need
        if ($_POST['newsletter'] == 'on'){
            $newsletter="OUI je veux m'abonné au conseil par courriel";
        }
        else{
            $newsletter="NON ne pas m'abonné au conseil par courriel";
        }
        
	$message = 
	
		'Nom: ' . $_POST['name'] . "<br/>".
		'Courriel: ' . $_POST['email'] . "<br/>".
                 $newsletter . "<br/>".
	'Adresse: ' . $_POST['address'] . "<br/>" . 
				'Ville: ' . $_POST['ville'] . "<br/>" . 
		'Code postal: ' . $_POST['code'] . "<br/>" . 
				mb_convert_encoding('Téléphone: ','UTF-8') . $_POST['phone'] . "<br/>" .
	'Message: '.$_POST['message'] . "<br/><br/>" ; 
	

	
	$headers = 'From: ' . $_POST['name'] . "\r\n" . 
		'Reply-To: ' . $_POST['email'] . "\r\n" .
		'Content-Type: text/html; charset=UTF-8';
		 
	
	mail($to, $subject, $message, $headers);
	
	if( $_POST['copy'] == 'on' )
	{
            //User Email and newsletter message will be different
            if ($_POST['newsletter'] == 'on'){
                $newsletter=" OUI Je désir recevoir des conseils par courriels";
            }
            else{
                $newsletter="";
            }

            
		$message= "Bonjour ".$_POST['name']. ","."<br/>" .
		mb_convert_encoding("Nous avons bien reçu votre demande de soumission. Nous passerons d'ici 48 heures à la résidence pour compléter la demande."
		. "<br/><br/>".

		"Merci de votre intérêt pour Montvert"."<br/><br/>".
		"L'équipe Montvert"."<br/><br/>".


		"Montvert.com"."<br/>".
		"8900 Industriel"."<br/>".
		"Chambly, Qc"."<br/>".
		"J3L 4X3"."<br/>".
		"514-666-8837"."<br/>".
		"info@montvert.com"."<br/>".
                $newsletter."<br/>".
		"www.montvert.com","UTF-8");
		mail($_POST['email'], $subject, $message, $headers);
	}
        
        
        //push details into database
        $name=str_replace("'","\'",$_POST['name']);
        $email=str_replace("'","\'",$_POST['email']);
        $address=str_replace("'","\'",$_POST['address']);
        $city=str_replace("'","\'",$_POST['ville']);
        $postalcode=str_replace("'","\'",$_POST['code']);
        $phone=str_replace("'","\'",$_POST['phone']);
        $message=str_replace("'","\'",$_POST['message']);
        
        //mysql_query("SET character_set_results = 'utf8', character_set_client = 'utf8', character_set_connection = 'utf8', character_set_database = 'utf8', character_set_server = 'utf8'");
       
        $query = "INSERT INTO messages(name,email,address,city,postalcode,phone,message) VALUES ('".$name."','".$email.
                "','".$address."','".$city."','".$postalcode."','".$phone.
                "','".$message."')";
        
            echo $query;
        $host="localhost";
        $user="root";
        $password="";
        $database="traficguru";
        mysql_connect($host,$user,$password);
         mysql_query("SET NAMES utf8");
        @mysql_select_db($database) or die( "Unable to select database");
        
        mysql_query($query);
        mysql_close();
}
?>