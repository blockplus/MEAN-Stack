<script type="text/javascript">
<!--
    function confirm_logout() {
        if(confirm("Do you want to logout?")) { 
            window.location.href = "<?php echo site_url("auth/logout");?>";
        }
    }
//-->
</script>

	<aside id="sidebar" class="column" >
<?php
	if($this->tank_auth->is_logged_in()) : 
?>
		<!--form class="quick_search" method="post" action="<?php echo site_url("admin/media/search");?>" >
			<?php
				$f_search = array(	//text field
					'name'	=> 'f_search',
					'id'	=> 'f_search',
					'value' => "Quick Search",
					'title'	=> 'Search',
				); 
			//	echo form_input($f_search,'',"onfocus=\"if(!this._haschanged){this.value=''};this._haschanged=true;\"");
				echo "<input type='text' name='f_search' value='Quick Search' onfocus=\"if(!this._haschanged){this.value=''};this._haschanged=true;\" />"; 
			?>
		</form-->
		<hr />		
		<h3>Manage</h3>
		<ul class="toggle">
<?php
	$main_arr = $this->config->item("main_category");
	foreach($main_arr as $key => $val) {
                
		$link = site_url($key);
		$class = "class='icn_folder'";
		echo "<li $class ><a href='$link'>$val</a></li>";
	} 
?>
		</ul>
		<h3>Admin</h3>
		<ul class="toggle">
                    <li class="icn_settings"><a href="<?php echo site_url('user');?>/user_edit/1">Admin</a></li>
			<li class="icn_jump_back"><a href="javascript:confirm_logout()">Logout</a></li>
		</ul>
<?php   
            
	endif; 
?>		
		
	</aside>

<!-- end of sidebar -->

