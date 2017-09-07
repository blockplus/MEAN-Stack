<?php echo form_open($this->uri->uri_string()); ?>
<div class="loginDiv" style="width:500px; ">
   
    <div class="main_tabbar login_title">Contact Us</div>
    <div style="border: 1px solid #e9e9e9; width:96%; padding: 2%;">
        <table style="margin-left: auto; margin-right: auto;">
                <tr>
                        <td width="100px;">Name:</td>
                        <td><input type="text" name="name" value="" id="name" maxlength="80" size="30">
                        </td>
                        <td style="color: red;">
                            <?php echo form_error('name'); ?><?php echo isset($errors['name']) ? $errors['name']:''; ?>
                            
                        </td>
                </tr>
                
                <tr>
                        <td>Email:</td>
                        <td><input type="text" name="email" value="" id="email" maxlength="80" size="30">
                        </td>
                        <td style="color: red;">
                            <?php echo form_error('email'); ?><?php echo isset($errors['email']) ? $errors['email']:''; ?>
                        </td>
                </tr>
                <tr>
                        <td>Subject:</td>
                        <td><input type="text" name="subject" value="" id="subject" maxlength="80" size="30">
                        </td>
                        <td style="color: red;">
                            <?php echo form_error('subject'); ?><?php echo isset($errors['subject']) ? $errors['subject']:''; ?>
                        </td>
                </tr>
                <tr>
                        <td>Message:</td>
                        <td>                            
                            <textarea name="message" id="message" cols="24" rows="10"></textarea>
                        </td> 
                        <td style="color: red;">
                            <?php echo form_error('message'); ?><?php echo isset($errors['message']) ? $errors['message']:''; ?>
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
 function gotoLogin(){
        window.location.href="login";
    }
 </script>