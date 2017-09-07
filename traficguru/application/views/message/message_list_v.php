<?php
$f_search = array(	//text field			
		'name'	=> 'f_search',			
	);
        if (!isset($_REQUEST['per_page']))
            $per_page=0;
        else
            $per_page=$_REQUEST['per_page'];
?>
<form action="<?php echo site_url("$post_key"."/".$post_key."_bulk_del"); ?>" method="get" name="delForm" onsubmit="return false;">
    <article class="module width_full">
        <header>
            <h3 class="tabs_involved"> Message List </h3>
            <div class="submit_link">
               <input type="submit" value="Export" class="alt_btn" onclick="return message_export(<?php echo $per_page ?>)" />
               <input type="submit" value="Delete" class="alt_btn" onclick="return bulk_del()" />
            </div>
        </header>

        <div class="tab_container">
            <table class="tablesorter" cellspacing="0">
                <thead>
                    <tr align="center">
                        <th width="30" class=""><input type="checkbox" name="allId" id="allId" /></th>
                        <th width="30">No.</th>
                        <th style="width : 130px;">Name</th>
                        <th >Email</th>                    
                        <th >Address</th>
                        <th >City</th>
                        <th >Postal Code</th>
                        <th >Phone</th>
                        <th >Message</th>
                        <th style="width : 120px; ">Actions</th>
                    </tr>
                </thead> 
                <tbody> 
                <?php
                $i = 1;


                foreach($message_list as $row) {                

                ?>
                    <tr >		
                        <td> <input type="checkbox" name="id[]" value="<?php echo $row['id'] ?>"  /> </td>
                        <td><?php echo $i+$start_no ; ?></td>
                        <td><?php echo $row['name'];?></td>
                        <td><?php echo $row['email'];?></td>
                        <td><?php echo $row['address'];?></td>
                        <td><?php echo $row['city'];?></td>
                        <td><?php echo $row['postalcode'];?></td>
                        <td><?php echo $row['phone'];?></td>
                        <td><?php echo $row['message'];?></td>

                        <td style="width : 120px; ">
                            <input type="image" title="Trash" style="vertical-align: middle;" src="<?php echo IMG_DIR; ?>/icn_trash.png" onclick="confirm_del(<?php echo $row['id'];?>)">
                        </td>			
                    </tr>
                <?php
                    $i++;
                }
                if($i==0) {
                        echo "<tr><td colspan='7' align='center'>Nothing </td></tr>";
                }
                ?>
                </tbody>

            </table>
        </div>

        <script type="text/javascript">
                function message_export(per_page){
                    per_page = per_page || 0;
                    window.location.href = "<?php echo site_url("$post_key"."/".$post_key."_export"); ?>/" + per_page;
                        return false;
                }
                
                function confirm_del(pid) {
                        if(!confirm('Are you sure to delete?', "Modified title")) {
                                return;
                        }
                        window.location.href = "<?php echo site_url("$post_key"."/".$post_key."_del"); ?>/" + pid;
                        return false;
                }
                
                function bulk_del() {
                    if ($( "input:checkbox:checked").length==0){
                        alert('Select checkbox');
                        return false;
                    }
                    if(!confirm('Are you sure to delete selected records?', "Modified title")) {
                            return false;
                    }
                  
                   delForm.submit();
                }
        </script>

        <footer>
            <?php echo $pagenation; ?>
        </footer>
    </article>
</form>
<script>
   $( "#allId").click(function() {
       if ($( "#allId").is(':checked'))
           value=true;
       else
           value=false;
       $( "input:checkbox" ).prop('checked', value);
  });
</script>