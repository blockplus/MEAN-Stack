<article class="module width_full">
<header>
	<h3 class="tabs_involved"> Add Category </h3>        
</header>
<?php	
         
        $name = array(	//id of user id
		'name'	=> 'name',
		'id'	=> 'name',
		'value' => set_value('name'),
		'title'	=> 'User ID',
	);
        
        $price = array(	//activated
		'name'	=> 'price',
		'id'	=> 'price',
		'value' => set_value('price'),
		'title'	=> 'Price',
	);
    
           
        $video_info= array(	//car
		'name'	=> 'video_info',
		'id'	=> 'video_info',
		'value' => set_value('video_info'),
		'title'	=> 'Video Info',
	);
        
        $image_url= array(	//car
		'name'	=> 'img',
		'id'	=> 'image_url',		
		'title'	=> 'Image URL',
	);
                      
	
	echo form_open_multipart($this->uri->uri_string());
	
	if(!empty($show_message)) {
		echo "<h4 class='alert_success'>".$show_message."</h4>";
	}else{
		$this->form_validation->set_error_delimiters('<h4 class="alert_error">', '</h4>');
		echo form_error($name['name']);
	
                
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
		<label>Name</label>
		<input type="text" name="<?php echo $name['name']; ?>" />		
	</fieldset>
	<fieldset >
		<label style="width:100px;">Price</label>
                <select name="price" style="width:100px;">
                    <option value="0.99">$0.99</option>
                    <option value="1.99">$1.99</option>
                    <option value="2.99">$2.99</option>
                    <option value="3.99">$3.99</option>
                    <option value="4.99" selected>$4.99</option>
                    <option value="5.99">$5.99</option>
                    <option value="6.99">$6.99</option>
                    <option value="7.99">$7.99</option>
                    <option value="8.99">$8.99</option>
                    <option value="9.99">$9.99</option>
                </select>
	</fieldset>         
        <fieldset >
		<label>Video Info</label>
		<textarea name="<?php echo $video_info['name']; ?>" rows="10"></textarea>
	</fieldset>
</div>

<footer>
	<div class="submit_link">
	<input type="submit" value="  Add  " class="alt_btn"><input type="button" value="Cancel" class="alt_btn" onclick="javascript:goCategoryList();">
        
	</div>
</footer>

<?php echo form_close();

?>

</article>

<script>
    function goCategoryList(){
        window.location.href="<?php echo site_url('category'); ?>";
    }
</script>
