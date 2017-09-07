
	<div class="spacer"></div>
	</section>

	<section id="bottom">
		<p>
                    <strong>Copyright &copy; 2013 <?php echo SITE_NAME; ?></strong>&nbsp;&nbsp;&nbsp;
                        <?php 
                            if(!$this->tank_auth->is_logged_in()) {
                            echo "<a href='contact' style='color : #ffffff'>Contact us</a>";
                            }
                        ?>
		</p>
	</section>
</body>
    <script type="text/javascript">
        $(function(){
            $('.column').equalHeight();
        });
    </script>
</html>