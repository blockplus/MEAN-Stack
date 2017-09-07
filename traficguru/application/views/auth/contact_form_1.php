<?php echo form_open($this->uri->uri_string()); ?>
<div class="loginDiv" style="width:300px;">
    <?php 

    if (isset($errors['contact_error'])) {
        echo "<p>".$errors['contact_error']."</p>";
    }
     if (isset($errors['contains_error'])) {
     
    ?>
    <table class="errorDiv" style="width:100%;">
        <tr>
            <td width="100px">
                <img src="<?php echo base_url()?>include/images/nocheck.png" width="20px"/>
            </td>
            <td>
            <?php echo form_error('name'); ?>
            <?php echo form_error('email'); ?>
            <?php echo form_error('subject'); ?>
            <?php echo form_error('message'); ?>
            </td>
        </tr>
    </table>
    <?php
        }
    ?>
    <div class="main_tabbar login_title">Contact Us</div>
    <div style="border: 1px solid #e9e9e9; width:96%; padding: 2%;">
        <table>
                <tr>
                        <td width="100px;">Name:</td>
                        <td><input type="text" name="name" value="" id="name" maxlength="80" size="30">
                        </td>
                </tr>
                
                <tr>
                        <td>Email:</td>
                        <td><input type="text" name="email" value="" id="email" maxlength="80" size="30">
                        </td>                        
                </tr>
                <tr>
                        <td>Subject:</td>
                        <td><input type="text" name="subject" value="" id="subject" maxlength="80" size="30">
                        </td>                        
                </tr>
                <tr>
                        <td>Message:</td>
                        <td>                            
                            <textarea name="message" id="message" cols="24" rows="10"></textarea>
                        </td>                        
                </tr>
                
	<tr>
		<td colspan="1">
			<?php echo form_submit('submit', 'Send'); ?>                        
		</td>
                <td colspan="1">
                    <input type="button" name="Login" value="Login" onclick="javascript:gotoLogin();">
                        
		</td>
                
	</tr>
        </table>
        
    </div>
</div>
<?php echo form_close(); ?>
<script>
 function goCategoryList(){
        window.location.href="login";
    }
 </script>