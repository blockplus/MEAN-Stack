<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Users
 *
 * This model represents user authentication data. It operates the following tables:
 * - user account data,
 * - user profiles
 *
 * @package	Tank_auth
 * @author	Ilya Konyukhov (http://konyukhov.com/soft/)
 */
class Users extends CI_Model
{
	private $table_name			= 'users';			// user accounts
	private $profile_table_name	= 'user_profiles';	// user profiles

	function __construct()
	{
		parent::__construct();

		$ci =& get_instance();
		$this->table_name			= $ci->config->item('db_table_prefix', 'tank_auth').$this->table_name;
		$this->profile_table_name	= $ci->config->item('db_table_prefix', 'tank_auth').$this->profile_table_name;
	}

	/**
	 * Get user record by Id
	 *
	 * @param	int
	 * @param	bool
	 * @return	object
	 */
	function get_user_by_id($user_id, $activated)
	{
		$this->db->where('id', $user_id);
		$this->db->where('activated', $activated ? 1 : 0);

		$query = $this->db->get($this->table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}

	/**
	 * Get user record by login (username or email)
	 *
	 * @param	string
	 * @return	object
	 */ 
	function get_user_by_login($login)
	{
		$this->db->where('LOWER(username)=', strtolower($login));
		$this->db->or_where('LOWER(email)=', strtolower($login));

		$query = $this->db->get($this->table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}

	/**
	 * Get user record by username
	 *
	 * @param	string
	 * @return	object
	 */
	function get_user_by_username($username)
	{
            
		$this->db->where('LOWER(username)=', strtolower($username));

		$query = $this->db->get($this->table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}
        
        /**
	 * Get user record by face book name
	 *
	 * @param	string
	 * @return	object
	 */
	function get_user_by_fname($fname)
	{
            
		$this->db->where('LOWER(fname)=', strtolower($fname));

		$query = $this->db->get($this->table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}

	/**
	 * Get user record by email
	 *
	 * @param	string
	 * @return	object
	 */
	function get_user_by_email($email)
	{
            
            $this->db->where('LOWER(email)=', strtolower($email));

            $query = $this->db->get($this->table_name);
            if ($query->num_rows() == 1) return $query->row();
            return NULL;
        }

	/**
	 * Check if username available for registering
	 *
	 * @param	string
	 * @return	bool
	 */
	function is_username_available($username)
	{
		$this->db->select('1', FALSE);
		$this->db->where('LOWER(username)=', strtolower($username));

		$query = $this->db->get($this->table_name);
		return $query->num_rows() == 0;
	}

	/**
	 * Check if email available for registering
	 *
	 * @param	string
	 * @return	bool
	 */
	function is_email_available($email)
	{
		$this->db->select('1', FALSE);
		$this->db->where('LOWER(email)=', strtolower($email));
		$this->db->or_where('LOWER(new_email)=', strtolower($email));

		$query = $this->db->get($this->table_name);
		return $query->num_rows() == 0;
	}
        
        /**
	 * Check if FaceBook ID available for registering
	 *
	 * @param	string
	 * @return	bool
	 */
	function is_fname_available($fname)
	{
            if ($fname=="")
                return true;
            $this->db->select('1', FALSE);
            $this->db->where('LOWER(fname)=', strtolower($fname));
            
            $query = $this->db->get($this->table_name);
            return $query->num_rows() == 0;
	}

	/**
	 * Create new user record
	 *
	 * @param	array
	 * @param	bool
	 * @return	array
	 */
	function create_user($data, $activated = TRUE)
	{
		$data['created'] = date('Y-m-d H:i:s');
		$data['activated'] = $activated ? 1 : 0;

		if ($this->db->insert($this->table_name, $data)) {
			$user_id = $this->db->insert_id();
			if ($activated)	$this->create_profile($user_id);
			return array('user_id' => $user_id);
		}
		return NULL;
	}

	/**
	 * Activate user if activation key is valid.
	 * Can be called for not activated users only.
	 *
	 * @param	int
	 * @param	string
	 * @param	bool
	 * @return	bool
	 */
	function activate_user($user_id, $activation_key, $activate_by_email)
	{
		$this->db->select('1', FALSE);
		$this->db->where('id', $user_id);
		if ($activate_by_email) {
			$this->db->where('new_email_key', $activation_key);
		} else {
			$this->db->where('new_password_key', $activation_key);
		}
		$this->db->where('activated', 0);
		$query = $this->db->get($this->table_name);

		if ($query->num_rows() == 1) {

			$this->db->set('activated', 1);
			$this->db->set('new_email_key', NULL);
			$this->db->where('id', $user_id);
			$this->db->update($this->table_name);

			$this->create_profile($user_id);
			return TRUE;
		}
		return FALSE;
	}

	/**
	 * Purge table of non-activated users
	 *
	 * @param	int
	 * @return	void
	 */
	function purge_na($expire_period = 172800)
	{
		$this->db->where('activated', 0);
		$this->db->where('UNIX_TIMESTAMP(created) <', time() - $expire_period);
		$this->db->delete($this->table_name);
	}

	/**
	 * Delete user record
	 *
	 * @param	int
	 * @return	bool
	 */
	function delete_user($user_id)
	{
		$this->db->where('id', $user_id);
		$this->db->delete($this->table_name);
		if ($this->db->affected_rows() > 0) {
			$this->delete_profile($user_id);
			return TRUE;
		}
		return FALSE;
	}

	/**
	 * Set new password key for user.
	 * This key can be used for authentication when resetting user's password.
	 *
	 * @param	int
	 * @param	string
	 * @return	bool
	 */
	function set_password_key($user_id, $new_pass_key)
	{
		$this->db->set('new_password_key', $new_pass_key);
		$this->db->set('new_password_requested', date('Y-m-d H:i:s'));
		$this->db->where('id', $user_id);

		$this->db->update($this->table_name);
		return $this->db->affected_rows() > 0;
	}

	/**
	 * Check if given password key is valid and user is authenticated.
	 *
	 * @param	int
	 * @param	string
	 * @param	int
	 * @return	void
	 */
	function can_reset_password($user_id, $new_pass_key, $expire_period = 900)
	{
		$this->db->select('1', FALSE);
		$this->db->where('id', $user_id);
		$this->db->where('new_password_key', $new_pass_key);
		$this->db->where('UNIX_TIMESTAMP(new_password_requested) >', time() - $expire_period);

		$query = $this->db->get($this->table_name);
		return $query->num_rows() == 1;
	}

	/**
	 * Change user password if password key is valid and user is authenticated.
	 *
	 * @param	int
	 * @param	string
	 * @param	string
	 * @param	int
	 * @return	bool
	 */
	function reset_password($user_id, $new_pass, $new_pass_key, $expire_period = 900)
	{
		$this->db->set('password', $new_pass);
		$this->db->set('new_password_key', NULL);
		$this->db->set('new_password_requested', NULL);
		$this->db->where('id', $user_id);
		$this->db->where('new_password_key', $new_pass_key);
		$this->db->where('UNIX_TIMESTAMP(new_password_requested) >=', time() - $expire_period);

		$this->db->update($this->table_name);
		return $this->db->affected_rows() > 0;
	}

	/**
	 * Change user password
	 *
	 * @param	int
	 * @param	string
	 * @return	bool
	 */
	function change_password($user_id, $new_pass)
	{
		$this->db->set('password', $new_pass);
		$this->db->where('id', $user_id);

		$this->db->update($this->table_name);
		return $this->db->affected_rows() > 0;
	}

	/**
	 * Set new email for user (may be activated or not).
	 * The new email cannot be used for login or notification before it is activated.
	 *
	 * @param	int
	 * @param	string
	 * @param	string
	 * @param	bool
	 * @return	bool
	 */
	function set_new_email($user_id, $new_email, $new_email_key, $activated)
	{
		$this->db->set($activated ? 'new_email' : 'email', $new_email);
		$this->db->set('new_email_key', $new_email_key);
		$this->db->where('id', $user_id);
		$this->db->where('activated', $activated ? 1 : 0);

		$this->db->update($this->table_name);
		return $this->db->affected_rows() > 0;
	}

	/**
	 * Activate new email (replace old email with new one) if activation key is valid.
	 *
	 * @param	int
	 * @param	string
	 * @return	bool
	 */
	function activate_new_email($user_id, $new_email_key)
	{
		$this->db->set('email', 'new_email', FALSE);
		$this->db->set('new_email', NULL);
		$this->db->set('new_email_key', NULL);
		$this->db->where('id', $user_id);
		$this->db->where('new_email_key', $new_email_key);

		$this->db->update($this->table_name);
		return $this->db->affected_rows() > 0;
	}

	
     
        /**
	 * Update user facebook info
	 *
	 * @param	string
	 * @param	string	 
         * @param	string	 
         * @param	string	 
         * @param	string
         * @param	img_loc	 
	 * @return	void
	 */
        
	function update_user_profile($uid,$ufuname,$c_car,$a_me,$loc,$img_loc,$username)
	{
            if (!$this->get_profile_by_userid($uid))
                $this->create_profile ($uid);
            
            $aprofile=$this->get_profile_by_userid($uid);
            
            $pfid=$aprofile->id; //get profileid;
            
            $this->db->set('user_id', $uid);
            $this->db->set('ufuname', $ufuname);
            
            //check whether delete the image file or not
            if ($aprofile->image_loc){                
                unlink($this->config->item('upload_path')."//".$aprofile->image_loc);
            }
            
            $this->db->set('image_loc', $username."//profile//".$img_loc);
            
            $this->db->set('current_car', $c_car);
            $this->db->set('about_me', $a_me);
            $this->db->set('loc', $loc);

            $this->db->where('id', $pfid);
            $this->db->update($this->profile_table_name);
	}
        /**
	 * Update user login info, such as IP-address or login time, and
	 * clear previously generated (but not activated) passwords.
	 *
	 * @param	int
	 * @param	bool
	 * @param	bool
	 * @return	void
	 */
	function update_session_info($user_id, $session_id,$d_token)
	{
		$this->db->set('session_id', $session_id);
                $this->db->set('device_token', $d_token);
		
		$this->db->where('id', $user_id);
		$this->db->update($this->table_name);
	}
        
       
        
	/**
	 * Ban user
	 *
	 * @param	int
	 * @param	string
	 * @return	void
	 */
	function ban_user($user_id, $reason = NULL)
	{
		$this->db->where('id', $user_id);
		$this->db->update($this->table_name, array(
			'banned'		=> 1,
			'ban_reason'	=> $reason,
		));
	}

	/**
	 * Unban user
	 *
	 * @param	int
	 * @return	void
	 */
	function unban_user($user_id)
	{
		$this->db->where('id', $user_id);
		$this->db->update($this->table_name, array(
			'banned'		=> 0,
			'ban_reason'	=> NULL,
		));
	}

	/**
	 * Create an empty profile for a new user
	 *
	 * @param	int
	 * @return	bool
	 */
	 private function create_profile($user_id)
	{
		$this->db->set('user_id', $user_id);
		return $this->db->insert($this->profile_table_name);
	}

        /**
	 * Find profile by userid
	 *
	 * @param	int
	 * @return	bool
	 */
	 public function get_profile_by_userid($uid)
	{		
                $this->db->where('user_id', $uid);	
		$query = $this->db->get($this->profile_table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
                
	}
	function &get_object_list($tbl_name, $banned=-1, $start=0, $count=1000, $search_option='') {

		$strSql = "SELECT COUNT(*) AS cnt FROM $tbl_name";
		$query = $this->db->query($strSql);		
		$row = $query->row_array();
		$return_arr['total'] = $row['cnt'];
		
		if ($tbl_name != "users")
			$strSql = "SELECT * FROM $tbl_name WHERE 1=1 ORDER BY nID DESC LIMIT $start, $count";
		else
			$strSql = "SELECT * FROM $tbl_name WHERE 1=1 ORDER BY id DESC LIMIT $start, $count";
		$query = $this->db->query($strSql);
		$return_arr['rows'] = $query->result_array();
		
		return $return_arr;
	}
	
	function &get_specific_data($idx, $tbl_name) {
            if ($tbl_name != "users") 
                    $strSql = "SELECT * FROM $tbl_name WHERE nID='$idx'";
            else 
                    $strSql = "SELECT * FROM $tbl_name WHERE id='$idx'";
            $query = $this->db->query($strSql);
            $row = $query->row_array();
            return $row;
	}
	
	function confrim_email( $email, $suffix='') {
            $strSql = "SELECT * FROM users WHERE email='$email'".$suffix;

            $query = $this->db->query($strSql);

            if ($query->num_rows() == 1) return FALSE;
            return TRUE;		
	}
	
	function confirm_barcode( $barcode ) {
		$strSql = "SELECT * FROM product WHERE barcode='$barcode'";
		$query = $this->db->query($strSql);
		
		if ($query->num_rows() == 1) return FALSE;
		return TRUE;
	}
	
	function get_next_insert_idx($tbl_name) {

		$next_increment = 0;
		$strSql = "SHOW TABLE STATUS WHERE Name='$tbl_name'";
		$query = $this->db->query($strSql);
		$row = $query->row_array();
		$next_increment = $row['Auto_increment'];
		
		return $next_increment;
	}
	
	function &_create_pagenation($per_page,$total,$base_url) {
    	
    	$this->load->library('pagination');
		$config['base_url'] = $base_url;
		$config['page_query_string'] = TRUE;
		$config['total_rows'] = $total;
		$config['per_page'] = $per_page;
		$config['full_tag_open'] = "<div style='padding:8px;'>";
		$config['full_tag_close'] = "</div>";
		
		$this->pagination->initialize($config); 
		$pagenation = $this->pagination->create_links();
			
		return $pagenation;
    }
	
	function get_user_info($userID)
    {
		$strSql = "SELECT username,email,password,phone,country,type FROM users WHERE id=".$userID;
		$query = $this->db->query($strSql);
		if ($query->num_rows() == 1) return $query->row();
		
		return NULL;
	}    
	
	function update_user_info($userID, $name, $password, $phone, $country)
	{	
		if ($password != "")
			$strSql = "UPDATE users SET username='$name', password='$password', phone='$phone', 
				country='$country' WHERE id=".$userID;
		else
			$strSql = "UPDATE users SET username='$name', phone='$phone', 
				country='$country' WHERE id=".$userID;
	
		$query = $this->db->query($strSql);
		return TRUE;
	}
	
	function login_user($session_id, $user_id) {
		$strSql = "UPDATE users SET session_id='$session_id' WHERE id=".$user_id;
		$this->db->query($strSql);
	}
	
	function logout($session_id) {
		$this->db->query("DELETE FROM ci_sessions WHERE session_id='$session_id'");
	}
	
	function generate_password($pw_length = 8, $use_caps = true, $use_numeric = true, $use_specials = true) {
		$caps = array();
		$numbers = array();
		$num_specials = 0;
		$reg_length = $pw_length;
		$pws = array();
		for ($ch = 97; $ch <= 122; $ch++) $chars[] = $ch; // create a-z
		if ($use_caps) for ($ca = 65; $ca <= 90; $ca++) $caps[] = $ca; // create A-Z
		if ($use_numeric) for ($nu = 48; $nu <= 57; $nu++) $numbers[] = $nu; // create 0-9
		$all = array_merge($chars, $caps, $numbers);
		if ($use_specials) {
			$reg_length =  ceil($pw_length*0.75);
			$num_specials = $pw_length - $reg_length;
			if ($num_specials > 5) $num_specials = 5;
			for ($si = 33; $si <= 47; $si++) $signs[] = $si;
			$rs_keys = array_rand($signs, $num_specials);
			foreach ($rs_keys as $rs) {
				$pws[] = chr($signs[$rs]);
			}
		}
		$rand_keys = array_rand($all, $reg_length);
		foreach ($rand_keys as $rand) {
			$pw[] = chr($all[$rand]);
		}
		$compl = array_merge($pw, $pws);
		shuffle($compl);
		return implode('', $compl);
	}
	
/*	function change_password($password, $email) {
		$this->db->query("UPDATE users SET password='$password' WHERE email='$email'");		
	}*/
	
	function productInfo($barcode) {
		$strSql = "SELECT * FROM product WHERE barcode='$barcode'";
		$query = $this->db->query($strSql);
		
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}
	
	function recLocationList($sessionID) {
		$strSql = "SELECT name, latitude as lat, longitude as 'long' FROM recycle_loc";
		$query = $this->db->query($strSql);
		
		if ($query->num_rows() == 0) return NULL;
		return $query->result();
	}
	
	function getUserSettings($userID) {
		$strSql = "SELECT verified_pt, donated_pt, scan_lat, scan_long FROM users WHERE id=".$userID;
		$query = $this->db->query($strSql);
		return $query->result();
	}
	
	function updateScanLoc($userID, $lat, $long) {
		$strSql = "UPDATE users SET scan_lat='$lat', scan_long='$long' WHERE id=".$userID;
		$this->db->query($strSql);
		return TRUE;
	}
	
	function plugPoint($userID, $point) {
		$strSql = "UPDATE users SET verified_pt=verified_pt + $point WHERE id=".$userID;
		$this->db->query($strSql);
		return TRUE;
	}
	
	function foundationList($sessionID) {
		$strSql = "SELECT nID as identity, name, `desc`, `unit`, `point_cost`, `donated_user`, `goal`, donated, `loc_name`, `image_link`, `status` FROM foundation";
		$query = $this->db->query($strSql);
		
		if ($query->num_rows() == 0) return NULL;
		return $query->result();
	}
	
	function donatePoint($userID, $fID, $dCount) {
		$strSql = "SELECT point_cost FROM foundation WHERE nID=$fID";
		$query = $this->db->query($strSql);
		if ($query->num_rows() == 0) return NULL;
		$point_cost = $query->result();
		$point_cost = $point_cost[0]->point_cost;
		
		$point = $point_cost * $dCount;
		
		$strSql = "UPDATE users SET verified_pt=verified_pt-$point, donated_pt=donated_pt+$point WHERE id=".$userID;
		$this->db->query($strSql);
		
		$time = date('Y-m-d H:i:s');			
		$strSql = "INSERT INTO donation(nID, user, foundation, time, point) VALUES ('', '$userID', '$fID', '$time', '$dCount')";
		$this->db->query($strSql);
		
		$strSql = "SELECT COUNT(DISTINCT(USER)) AS donated_count FROM donation WHERE foundation = $fID";
		$query = $this->db->query($strSql);
		$donated_count = $query->result();
		$donated_count = $donated_count[0]->donated_count;

		$strSql = "UPDATE foundation SET donated_user=$donated_count, donated=donated+$dCount WHERE nID=".$fID;
		$this->db->query($strSql);
		return TRUE;
	}
	
	function donationList($userID) {
		$strSql = "SELECT foundation, time, point FROM donation WHERE user='$userID'";
		$query = $this->db->query($strSql);
	
		if ($query->num_rows() == 0) return NULL;
		return $query->result();
	}
}

/* End of file users.php */
/* Location: ./application/models/auth/users.php */