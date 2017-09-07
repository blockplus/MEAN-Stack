<article class="module width_full">
<header>
	<h3>
	Edit ( Admin Info ) </h3>
</header>
<?php
	$fusername = array(	//input field
		'name'	=> 'fusername',
		'id'	=> 'fusername',
		'value' => set_value('fusername'),
		'title'	=> 'UserName',
	);
        $fid = array(	//id of user table
		'name'	=> 'fid',
		'id'	=> 'fid',
		'value' => set_value('fid'),
		'title'	=> 'fid',
	);
	
	
	$fpassword = array(	//input field
		'name'	=> 'fpassword',
		'id'	=> 'fpassword',
		'value' => set_value('fpassword'),
		'title'	=> 'Password',
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
                echo form_error($fusername['name']);
                
		if (isset($show_errors)) {?>
                    <h4 class="alert_error">
                        <?php if (is_array($show_errors)) {?>
                        <?php foreach ($show_errors as $error) :?>
                                <label><?=$error?></label>
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
        <input type="hidden" name="<?php echo $fid['name']; ?>" value="<?php echo $post['id'] ?>"/>
        <fieldset >
                <label>Username</label>
                <input type="text" name="<?php echo $fusername['name']; ?>" value="<?php echo $post['username'] ?>" readonly="1"/>
        </fieldset>
        <fieldset >
                    <label>Email</label>
                    <input type="text" name="<?php echo $femail['name']; ?>" value="<?php echo $post['email'] ?>"/>		
            </fieldset>
        <fieldset >
                <label>Password</label>
                <input type="password" name="<?php echo $fpassword['name']; ?>" value=""/>		
        </fieldset>
    </div>
    <?php 
        $user_list=site_url("user");
    ?>
    <footer>
            <div class="submit_link">
                <input type="submit" value="Update" class="alt_btn"> 
            </div>
    </footer>
    <?php echo form_close(); ?>

</article>


