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
class Messages extends CI_Model
{
	private $table_name			= 'messages';			// cars
        private $tbl_name='messages';	
        
              

	function __construct()
	{
            parent::__construct();

            $ci =& get_instance();
            $this->table_name			= $ci->config->item('db_table_prefix', 'tank_auth').$this->table_name;
            
            $this->load->helper('url');
            
	}

     
       
        /**
	 * Create new item into comment_car table
	 *
	 * @cid :car id
         * @uid : user_id
         * @comment : comment text
	 * @return	array
	 */
	 function insert($qry)
	{
             
            $this->db->set('cid', $cid);
            $this->db->set('uid', $uid);
            $this->db->set('comment', $comment);
            
            
             if ($this->db->insert($this->comment_car_table_name)) {
                   $comm_id = $this->db->insert_id();                          
                   return $comm_id;
            }
            
            return "-1"; //false
            
	}
        
       
         function &get_object_list( $start=0, $count=1000, $search_option='') {
                
		$strSql = "SELECT COUNT(*) AS cnt FROM $this->tbl_name";
		$query = $this->db->query($strSql);		
		$row = $query->row_array();
		$return_arr['total'] = $row['cnt'];
                $strSql = "SELECT * FROM $this->tbl_name WHERE 1=1 order by id asc LIMIT $start, $count";
                

                $query = $this->db->query($strSql);
		$return_arr['rows'] = $query->result_array();
		
		return $return_arr;
	}
	
	function &get_specific_data($idx) {
            
            $strSql = "SELECT * FROM $this->tbl_name WHERE id='$idx'";
            
            $query = $this->db->query($strSql);
            $row = $query->row_array();
            return $row;
	}
	
	function get_next_insert_idx($tbl_name) {

		$next_increment = 0;
		$strSql = "SHOW TABLE STATUS WHERE Name='$this->tbl_name'";
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
    
     /*
         * list products_attributes
         * @param	int
	 * @return	array of array
         */
	function list_messages() {                        
            
            $this->db->order_by('name');
            $query = $this->db->get("messages");
            
            $list=array(); $i=0;
            foreach ($query->result() as $row)
            {
                
                if ($row->image_url!=""){
                    $list[$i] = array( 'id' => $row->id, 
                            'image_url' => IMAGE_PATH."/".$row->image_url,
                            'price' => $row->price ,
                            'video_info' => $row->video_info ,
                            'name' => $row->name ,
                            'purchase_id' => $row->purchase_id ,
                    );
                    $i++;
                }
            }
            return $list;  
	}
     
        
        /**
	 * Create new item into comment_car table
	 *
	 * @cid :car id
         * @uid : user_id
         * @comment : comment text
	 * @return	array
	 */
	 function add_contact($name,$email,$subject,$message)
	 {
             
            $this->db->set('name', $name);
            $this->db->set('email', $email);
            $this->db->set('subject', $subject);
            $this->db->set('message', $message);
            $date = new DateTime();
            $datetime = $date->format('Y-m-d H:i:s');
            $this->db->set('created', $datetime );
            
             if ($this->db->insert("contacts")) {
                   $id = $this->db->insert_id();                   
                   return $id;
            }            
            return 0; //false
	}
        
}

/* End of file users.php */
/* Location: ./application/models/auth/users.php */