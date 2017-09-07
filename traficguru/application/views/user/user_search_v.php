<?php
$f_search = array(	//text field
		'name'	=> 'f_search',
		'id'	=> 'f_search',
		'value' => $s_search,
		'title'	=> 'Search',
	); 
$f_title = array(	//check field
		'name'	=> 'f_title',
		'id'	=> 'f_title',
		'value' => 1,
		'checked' => ($s_title==1? TRUE:FALSE),
		'title'	=> 'Name',
	); 
	
$f_city = array(	//check field
		'name'	=> 'f_city',
		'id'	=> 'f_city',
		'value' => 1,
		'checked'=> ($s_city==1? TRUE:FALSE),
		'title'	=> 'City',
	); 
$f_duration = array(	//dropdown field
		'name'	=> 'f_duration',
		'id'	=> 'f_duration',
		'value' => $s_duration,
		'title'	=> 'Duration',
	);	
?>
<form name="frmSearch" class="quick_search" method="post" action="<?php  echo site_url("admin/media/search") ?>" >
<article class="module width_full">
	<header>
		<h3> Search </h3>
	</header>
	<div class="module_content">
		<?php
			echo form_input($f_search,'',"onfocus=\"if(!this._haschanged){this.value=''};this._haschanged=true;\"");
			echo "<br />";
			echo form_checkbox($f_title['name'], $f_title['value'], $f_title['checked']); 
			echo "&nbsp;<b>".$f_title['title']."</b> &nbsp;&nbsp;&nbsp;";

			echo form_checkbox($f_city['name'], $f_city['value'], $f_city['checked']); 
			echo "&nbsp;<b>".$f_city['title']."</b> &nbsp;&nbsp;&nbsp;";
			
		?>
	</div>
		<footer>
			<div class="submit_link">
<?php 
				$duration_arr = array(
					0	=>	"-----",
					30	=>	"30 min",
					60	=>	"1 hour",
					120	=>	"2 hour",
					180	=>	"3 hour",
					240	=>	"4 hour",
					300	=>	"5 hour",
					360	=>	"6 hour",
					420	=>	"7 hour",
					480	=>	"8 hour",
				);
				echo "&nbsp;<b>".$f_duration['title']."</b> &nbsp;&nbsp;&nbsp;";
				echo form_dropdown($f_duration['name'], $duration_arr, $f_duration['value'],"style='width:100px;'"); 
				echo "&nbsp;&nbsp;&nbsp;";
?>
				<input type="submit" name="fsubmit" value="Search" class="alt_btn">
			</div>
		</footer>
</article>
</form>

<script type="text/javascript">
<!--
	function post_add() {
		window.location.href = "<?php echo site_url("admin/media/".$post_key."_add"); ?>";
		return false;
	}
	function confirm_del(pid) {
		if(!confirm('Are you sure to delete?')) {
			return;
		}
		window.location.href = "<?php echo site_url("admin/media/".$post_key."_del"); ?>/" + pid;
	}
	function goedit(pid) {
		window.location.href = "<?php echo site_url("admin/media/".$post_key."_edit"); ?>/" + pid;
	}
//-->
</script>

<article class="module width_full">
<header>
	<h3 class="tabs_involved"> Search Result</h3>
	<div class="submit_link">
		<input type="submit" value="Add" class="alt_btn" onclick="return post_add()" />
	</div>
</header>
<div class="tab_container">
		<table class="tablesorter" cellspacing="0">
			<thead>
				<tr>
					<th width="30">No.</th>
					<th width="100">Thumb</th>
					<th>Activity</th>
					<th width="100">Region</th>
					<th width="80">Length <br /> ( Km )</th>
					<th width="60">Duration <br /> ( Hours )</th>
					<th width="40">Stat</th>
					<th width="80">Actions</th>
				</tr>
			</thead>
			<tbody>
<?php
		$i = 0;
		foreach($posts as $post) {
			$link = site_url("admin/media/".$post_key."_edit/".$post['idx']);
			$banned = $post['banned'];
?>
			<tr>
				<td><?php echo $post['idx'];?></td>
				<td><img src="<?php echo $this->admin_m->get_upload_path(1,"users",$post['idx'])."/".$post['act_thumb']; ?>" /></td>
				<td><a href="javascript:goedit(<?php echo $post['idx']; ?>)"><?php echo $post['title_name'];?></a></td>
				<td><?php echo $post['region_name'];?></td>
				<td><?php echo $post['act_length'];?></td>
				<td><?php echo $post['act_duration'];?></td>
				<td><?php echo ($banned==1)? "OFF":"ON"; ?></td>
				<td>
					<input type="image" title="Edit" src="<?php echo IMG_DIR; ?>/icn_edit.png" onclick="goedit(<?php echo $post['idx'];?>)">
					<input type="image" title="Trash" src="<?php echo IMG_DIR; ?>/icn_trash.png" onclick="confirm_del(<?php echo $post['idx'];?>)">
				</td>
			</tr>
<?php
			$i++;
		}
		if($i==0) {
			echo "<tr><td colspan='8' align='center'>Nothing </td></tr>";
		}
?>
			</tbody>
		</table>
	</div>
	<footer>
		<?php echo $pagenation; ?>
	</footer>
</article>
