<article class="module width_full">
<header>
	<h3>
	Edit Category </h3>
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
                                <label><?=$error?></label>
                        <?php endforeach;?>
                        <?php } else {?>
                                <label><?=$show_errors?></label>
                        <?php } ?>
                    </h4>
<?php 
		}
	}
        
        $clip_id = $this->uri->segment(4, 0);
        
        $clip=$this->categories->getClipById($clip_id);
        
        $video_url="";
        if ($clip!=null){
            $video_url=VIDEO_PATH."/".$post['name']."/".$clip->video_url;            
        }
        
?>

<div class="module_content">    
    
    <input type="hidden" name="<?php echo $category_id['name']; ?>" value="<?php echo $post['id']?>" />
    
    <fieldset >
            <label>Name</label>
            <input type="text" name="<?php echo $name['name']; ?>" value="<?php echo $post['name']?>" />
    </fieldset>
     <fieldset >
            <label style="width:100px;">Price</label>
            <select name="price" style="width:100px;">
                <option value="0.99" <?php echo $post['price']==0.99 ? "selected" : "" ; ?>>$0.99</option>
                <option value="1.99" <?php echo $post['price']==1.99 ? "selected" : "" ; ?>>$1.99</option>
                <option value="2.99" <?php echo $post['price']==2.99 ? "selected" : "" ; ?>>$2.99</option>
                <option value="3.99" <?php echo $post['price']==3.99 ? "selected" : "" ; ?>>$3.99</option>
                <option value="4.99" <?php echo $post['price']==4.99 ? "selected" : "" ; ?>>$4.99</option>
                <option value="5.99" <?php echo $post['price']==5.99 ? "selected" : "" ; ?>>$5.99</option>
                <option value="6.99" <?php echo $post['price']==6.99 ? "selected" : "" ; ?>>$6.99</option>
                <option value="7.99" <?php echo $post['price']==7.99 ? "selected" : "" ; ?>>$7.99</option>
                <option value="8.99" <?php echo $post['price']==8.99 ? "selected" : "" ; ?>>$8.99</option>
                <option value="9.99" <?php echo $post['price']==9.99 ? "selected" : "" ; ?>>$9.99</option>
            </select>
    </fieldset>
    <fieldset >
            <label>Video Info</label>
            <textarea name="<?php echo $video_info['name']; ?>" rows="10"><?php echo $post['video_info']?></textarea>
    </fieldset>
  </div>
    <footer>
            <div class="submit_link">
                <input type="submit" value="Update" class="alt_btn"> <input type="button" value="Cancel" class="alt_btn" onclick="javascript:goCategoryList();">            
            </div>
    </footer>
    <?php echo form_close(); ?>    
    
    
    <div class="module_content">  
        <fieldset>
            <form id="img_form" method="post" enctype="multipart/form-data"  >
                <div style="position: relative; float: left; padding-left: 10px; text-shadow: 0 1px 0 #fff; line-height: 25px;
                    font-weight: bold;">IMAGE</div> <br/><br/>
                <input type="hidden" id="category_id" name="category_id" value="<?php echo $post['id']?>" readonly="readonly"  />
                <input type="file" name="img" accept="image/*" style="vertical-align: middle; padding-left: 45px;" />
                <input type="button" name="submitBtn" value="Upload" onclick="startUpload();"  />
                <img id="f1_upload_process" src="<?php echo RESOURCE_PATH;  ?>/loader.gif" style="vertical-align: middle; visibility: hidden;" />
                
                <br/>
                <div style="position: relative; float: left; padding-left: 50px;">
                    <img id="pic" src="<?php echo IMAGE_PATH."/".$post['image_url'];?>" height="80px" width="80px"> </img>
                </div>
                <div id="f1_upload_form" style="position: relative; float: left;  padding-left: 40px;"></div> <br/>
                
            </form>
        </fieldset>

        <fieldset  >
            <form  id="video_form" action="<?php echo site_url()."/category/updateVideo"?>" method="post" enctype="multipart/form-data"  >
                <div style="position: relative; float: left; padding-left: 10px; text-shadow: 0 1px 0 #fff; line-height: 25px;
                    font-weight: bold;">Video </div> <br/><br/>
                <input type="hidden" name="category_id" value="<?php echo $post['id']?>" readonly="readonly"  />   
                <input type="file" name="video" accept="video/*" style="vertical-align: middle; padding-left: 45px;" />
                <input type="button" name="submitBtn" value="Upload" onclick="startVideoUpload();"/>                  
                <img id="f2_upload_process" src="<?php echo RESOURCE_PATH;  ?>/loader.gif" style="vertical-align: middle; visibility: hidden;" />
                <br/>
                
                <?php if ($video_url!="") {?>
                    <embed  src="<?php echo $video_url;?>" width="300" height="200" autoplay="true" 
                    controller="true" loop="false" pluginspage='http://www.apple.com/quicktime/download/' style="padding-left: 50px;">
                    </embed> 
                    
                   <!-- <script>
                                        QT_WriteOBJECT(
                            "http://surfvidz.com/Main Movie Folder/Around The World In 80 Waves/Around The World In 80 Waves_part1.mov", "640", "376", "",
                            "controller","true",
                            "name","movie1",
                            "autoplay","true",
                            "scale","TOFIT",
                            "pluginspage","http://www.apple.com/quicktime/download/"
                    );
                    </script>-->
                <?php }?>
                <div id="f2_upload_form" style="position: relative; padding-left: 40px;"></div> <br/>
            </form>
            
            <table style="width:80%; text-align: center;" >
                <thead>
                    <tr>
                        <td>No.</td>
                        <td>Movie Clips</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody name="clip_list" id="clip_list">
                    
                </tbody>
            </table>
        </fieldset>
    </div>
 
</article>
<?php    
   echo "<script> var base_url='".site_url("category/category_edit")."/".$post['id']."/';".
           "var clip_del_url='".site_url("category/clip_del")."/';".
           "</script>";
?>
<script>
    
    function ListClips_Request(){
        var video_list_url= "<?php echo site_url()."/ajaxupload/list_clips"?>";
        var id=document.getElementById('category_id').value;
        formdata = new FormData();
        formdata.append("category_id",id);
        $.ajax({
                url: video_list_url,
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: showClipList
        });
    }
    
    function showClipList(data){       
        
        
        var result=eval("("+data+")");
        if (result.status==0){
            alert(result.error);
            return;
        }
        var clips=result.clips;
        var clip_list=document.getElementById("clip_list");
        clip_list.innerHTML="";
        
        for (var i = 0; i < clips.length; i++) {
           var a = clips[i];
           var ele = a.video_url;
           
           var id=a.id; var full_url=a.full_url;
           clip_list.innerHTML+="<tr class='clips'>";
           clip_list.innerHTML+="<td>"+(i+1)+"</td><td>"+ele+"<td> <a href=javascript:viewMovie('"
               +id+"')>View</a>&nbsp;|&nbsp;<a href=javascript:delClip('"+id+"')>Del</a>";
           clip_list.innerHTML+="</td></tr>";
        // Do something with element i.
        }
        
        var main=document.getElementById("main");
        var a=parseInt(main.style.height)+(clips.length+1)*19;
        
        main.style.height=a+'px';
        
         $(function(){
             $('.column').equalHeight();
        });
    }
    
    function delClip(id){
        if(!confirm('Are you sure to delete?')) {
                return;
        }
        window.location.href = clip_del_url + id;
    }
    function goCategoryList(){
        window.location.href="<?php echo site_url('category'); ?>";
    }

    function startUpload(){
        
       var img_file=document.getElementById('img_form').img;
       var id=document.getElementById('category_id').value;
       var img_post_url= "<?php echo site_url()."/ajaxupload/updateImg"?>";
       
       if (img_file.files.length==0){
           result = '<span class="msg">File not selected!<\/span><br/><br/>';
            document.getElementById('f1_upload_form').innerHTML = result ;
            return;
       }
       document.getElementById('f1_upload_process').style.visibility = 'visible';
        document.getElementById('f1_upload_form').style.visibility = 'hidden';
       formdata = new FormData();
       formdata.append("category_id",id);
       formdata.append("img", img_file.files[0]);
       
       
        $.ajax({
                url: img_post_url,
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: stopUpload
        });
        return true;
    }
    
    function VideoComplete(data){
        
        var result=eval("("+data+")");
        if (result.status==0){
            alert(result.error);
            return;
        }
        
        if (result.status == 1){
            txt = '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
            
        }
        else {
            txt = '<span class="emsg">'+error+'<\/span><br/><br/>';
        }
        
        document.getElementById('f2_upload_process').style.visibility = 'hidden';
        document.getElementById('f2_upload_form').innerHTML = txt ;
        document.getElementById('f2_upload_form').style.visibility = 'visible';
        
        var new_row = document.createElement('tr');
        new_row.className="clips";
        var clip_list=document.getElementById("clip_list");
        var len=clip_list.getElementsByClassName('clips').length+1;
        new_row.innerHTML="<td>"+len+"</td><td>"+result.video_url+"</td><td><a href=javascript:viewMovie('"
            +result.id +"')>View&nbsp;|&nbsp;<a href=javascript:delClip('"+result.id+"')>Del</a></td>";
         
        clip_list.appendChild(new_row);
         var main=document.getElementById("main");
        var a=parseInt(main.style.height)+35;
        
        main.style.height=a+'px';
         $(function(){
                      
             $('.column').equalHeight();
        });
    }
    
    function startVideoUpload(){
       var video_file=document.getElementById('video_form').video;
       var id=document.getElementById('category_id').value;
       var video_post_url= "<?php echo site_url()."/ajaxupload/addVideo"?>";
       
       if (video_file.files.length==0){
           result = '<span class="msg">File not selected!<\/span><br/><br/>';
            document.getElementById('f2_upload_form').innerHTML = result ;
            return;
       }
       document.getElementById('f2_upload_process').style.visibility = 'visible';
       document.getElementById('f2_upload_form').style.visibility = 'hidden';
       formdata = new FormData();
       formdata.append("category_id",id);
       formdata.append("video", video_file.files[0]);
              
        $.ajax({
                url: video_post_url,
                type: "POST",
                data: formdata,
                processData: false,
                contentType: false,
                success: VideoComplete
        });
        return true;
    }

    function stopUpload(data){
        
        var result=eval("("+data+")");
        var img_url=result.img_url;
        
        if (result.status == 1){
            result = '<span class="msg">The file was uploaded successfully!<\/span><br/><br/>';
            document.getElementById('pic').src=img_url ;
        }
        else {
            result = '<span class="emsg">'+error+'<\/span><br/><br/>';
        }
        document.getElementById('f1_upload_process').style.visibility = 'hidden';
        document.getElementById('f1_upload_form').innerHTML = result ;
        document.getElementById('f1_upload_form').style.visibility = 'visible';
        
        return true;   
    }
    
    function viewMovie(src){
        window.location.href=base_url+src;
    }
    ListClips_Request();
    
    
</script>
<script>
<!--
var count=11;
var timecodedivlayer;
function countdown(){
 //count--; 
changelayer_content(count);
if (count>0){
 Id = window.setTimeout("countdown()",1000); 
} 
else{
window.close();
}
}	

function hhmmss (timeinseconds) {

hh = Math.floor(timeinseconds/(60*60));
mm = Math.floor( (timeinseconds - (hh*(60*60)))/60)
if (mm < 10) {mm = "0" + mm;}

ss = timeinseconds - (hh*(60*60) + mm*60);
if (ss < 10) {ss = "0" + ss;}

return hh + ":" + mm + ":" + ss;


}

function changelayer_content(counter){

doit="no";
if (document.movie1.GetPluginStatus() == "Complete") {doit="yes";}
if (document.movie1.GetPluginStatus() == "Playable") {doit="yes";}


if (doit == "yes")
	{
	curtime = hhmmss(Math.round(document.movie1.GetTime() / document.movie1.GetTimeScale()));
	tottime = hhmmss(Math.round(document.movie1.GetDuration() / document.movie1.GetTimeScale()));

	msgstring = curtime + " of " + tottime;
	
	}
	else
	{
	msgstring = "Loading...";
	}


if(document.layers){
//thisbrowser="NN4";
timecodedivlayer = document.layers[0];
timecodedivlayer.document.open();
timecodedivlayer.document.write(msgstring);
timecodedivlayer.document.close();
                     }
 if(document.all){
//thisbrowser="ie"
timecodedivlayer = document.all["timecodediv"];
timecodedivlayer.innerHTML=msgstring;
                      }
if(!document.all && document.getElementById){
//thisbrowser="NN6";
timecodedivlayer = document.getElementById("timecodediv");
timecodedivlayer.innerHTML =msgstring;
 }
}
// -->
</script>