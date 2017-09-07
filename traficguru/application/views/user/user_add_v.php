<article class="module width_full">
<header>
	<h3 class="tabs_involved"> Add User </h3>        
</header>
<?php	
     $fpassword = array(	//input field
		'name'	=> 'fpassword',
		'id'	=> 'fpassword',
		'value' => set_value('fpassword'),
		'title'	=> 'Password',
	);
        $fconfirm = array(	//input field
		'name'	=> 'fconfirm',
		'id'	=> 'fconfirm',
		'value' => set_value('fconfirm'),
		'title'	=> 'Confirm Password',
	);
	$femail = array(	//input field
		'name'	=> 'femail',
		'id'	=> 'femail',
		'value' => set_value('femail'),
		'title'	=> 'Email',		
	);	
	
	echo form_open_multipart($this->uri->uri_string());
	
	if(!empty($show_message)) {
		echo "<h4 class='alert_success'>".$show_message."</h4>";
	}else{
		$this->form_validation->set_error_delimiters('<h4 class="alert_error">', '</h4>');
		echo form_error($femail['name']);
		echo form_error($fpassword['name']);
                
		if (isset($show_errors)) {?>
                    <h4 class="alert_error">
                        <?php if (is_array($show_errors)) {?>
                        <?php foreach ($show_errors as $error) :?>
                                <label><?php echo $error?></label>
                        <?php endforeach;?>
                        <?php } else {?>
                                <label><?=$show_errors?></label>
                        <?php } ?>
                    </h4>
<?php 
		}
	}
?>
<div class="module_content">
	 <fieldset >
                    <label>Email</label>
                    <input type="text" name="<?php echo $femail['name']; ?>" value=""/>		
            </fieldset>
        <fieldset >
                <label>Password</label>
                <input type="password" name="<?php echo $fpassword['name']; ?>" value=""/>		
        </fieldset>
        <fieldset>
                <label>Confirm Password</label>
                <input type="password" name="<?php echo $fconfirm['name']; ?>" value=""/>		
        </fieldset>
</div>

<footer>
	<div class="submit_link">
	<input type="submit" value="  Add  " class="alt_btn"><input type="button" value="Cancel" class="alt_btn" onclick="javascript:goUserList();">
        
	</div>
</footer>

<?php echo form_close();

?>

</article>

<script>
    function goUserList(){
        window.location.href="<?php echo site_url('user'); ?>";
    }
</script>
