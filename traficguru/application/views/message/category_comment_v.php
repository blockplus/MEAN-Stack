<article class="module width_full">
<header>
	<h3>
	Edit Comments </h3>
</header>
<?php
	
        $category_id = array(	//id of car id
		'name'	=> 'id',
		'id'	=> 'id',
		'value' => set_value('id'),
		'title'	=> 'Car ID',
	);
         
     
        $name= array(	
		'name'	=> 'name',
		'id'	=> 'name',
		'value' => set_value('name'),
		'title'	=> 'name',
	);
        
        $image_url= array(	
		'name'	=> 'image_url',
		'id'	=> 'image_url',
		'value' => set_value('image_url'),
		'title'	=> 'image_url',
	);        
         
        $price = array(	
		'name'	=> 'price',
		'id'	=> 'price',
		'value' => set_value('price'),
		'title'	=> 'price',
	);
        
        $video_info = array(	
		'name'	=> 'video_info',
		'id'	=> 'video_info',
		'value' => set_value('video_info'),
		'title'	=> 'video_info',
	);
    	
	if(!empty($show_message)) {
		echo "<h4 class='alert_success'>".$show_message."</h4>";
	}else{
		$this->form_validation->set_error_delimiters('<h4 class="alert_error">', '</h4>');		
                echo form_error($name['name']);
		
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
    
    <input type="hidden" name="<?php echo $category_id['name']; ?>" value="<?php echo $post['id']?>" />
    
    <fieldset >
            <label>Category Name : </label><?php echo $post['name']; ?>  
    </fieldset>
     <fieldset>
            <label >Price</label> $<?php echo $post['price']; ?>            
    </fieldset>
    <fieldset >
            <label>Category Info</label>
            <textarea name="<?php echo $video_info['name']; ?>" rows="10" readonly><?php echo $post['video_info']?></textarea>
    </fieldset>
  </div>
    
    <div class="module_content">          
        <fieldset  >
            <form  id="video_form" action="<?php echo site_url()."/category/updateVideo"?>" method="post" enctype="multipart/form-data"  >
                <div style="position: relative; float: left; padding-left: 10px; text-shadow: 0 1px 0 #fff; line-height: 25px;
                     font-weight: bold;">Comments History&nbsp; &nbsp;&nbsp;&nbsp;
                    <?php 
                         $comment_list=$this->categories->list_comments($post['id']);
                         if (sizeof($comment_list)==0)
                             echo "<span style='color:red'> No comment </span>";
                    ?>
                </div> <br/>
            </form>
        </fieldset>    
        <table border="0" style="width:100%; background-color: #F6F6F6 ;">
            <?php
            $i=0;
                foreach ($comment_list as $comment){
                    $i++;
            ?>
            <tr>
                <td style="width: 30px;"><?php echo $i; ?>.</td>
                <td style="width:70%; "  >
                    <p><?php echo $comment['comment']; ?></p>
                </td>
                <td>
                    <a href="javascript:delComment('<?php echo $comment['id'];?>')">Del</a>
                </td>
            </tr>    
            <?php
                }
            ?>
        </table>
        
    </div>
 
</article>
<?php    
   echo "<script> var base_url='".site_url("category/category_edit")."/".$post['id']."/';".
           "var comment_del_url='".site_url("category/comment_del")."/';".
           "</script>";
?>
<script>
   
    function delComment(id){
        if(!confirm('Are you sure to delete?')) {
                return;
        }
        window.location.href = comment_del_url + id;
    }
    function goCategoryList(){
        window.location.href="<?php echo site_url('category'); ?>";
    }

   
    
    function viewMovie(src){
        window.location.href=base_url+src;
    }
    
    
</script> 