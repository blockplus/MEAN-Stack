<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Message extends CI_Controller
{
	function __construct()
	{
		parent::__construct();

		$this->load->library('security');
		$this->load->library('tank_auth');
		$this->load->model('messages'); // a little different
                $this->load->helper('url');
                $this->load->helper('file');
                $this->load->library('form_validation');
                
	}
	
        function _remap($method) {
            if(!$this->tank_auth->is_logged_in()) {
                redirect('auth/login');
                return;
            }
            
            if ($method!="message_export")
                $this->load->view('header_v');
            $this->{$method}();
            if ($method!="message_export")
                $this->load->view('footer_v');
	}
        
	function index()
	{
            $start_no = empty($_REQUEST['per_page'])? 0:$_REQUEST['per_page'];		
            $per_page = $this->config->item('max_count_per_page');

            $result = $this->messages->get_object_list($start_no,$per_page);
            $total_page = $result['total'];
            
            $data['message_list'] = $result['rows'];

            $base_url = site_url("message?a=1");
            $data['pagenation'] = $this->messages->_create_pagenation($per_page, $total_page, $base_url);
            $data['post_key'] = "message";
            $data['start_no'] =$start_no;
            
            $this->load->view('message/message_list_v',$data);	
	}
        
        function message_del() {
		$post_id = $this->uri->segment(3, 0);
		if (empty($post_id)) {
			echo "select task!";
			return;
		}
                $prev=$this->messages->get_specific_data($post_id);                
                
                       
		$this->_proc_post_del($post_id);
		redirect("message");
        }
        
         function message_bulk_del() {
             
             $ids=$_REQUEST['id'];
             if (sizeof($ids)==0){
                    echo "Select the checkboxes";
                    return;
            }
            
            foreach ($ids as $post_id){
                $this->_proc_post_del($post_id);
            }
            
            redirect("message");
        }
        
        function message_export() {
            $start_no = empty($_REQUEST['per_page'])? 0:$_REQUEST['per_page'];		
            $per_page = $this->config->item('max_count_per_page');

            $result = $this->messages->get_object_list($start_no,$per_page);
            
            $total_page = $result['total'];
            
            $data['message_list'] = $result['rows'];

            $base_url = site_url("message?a=1");
            $data['pagenation'] = $this->messages->_create_pagenation($per_page, $total_page, $base_url);
            $data['post_key'] = "message";
            $data['start_no'] =$start_no;
            
            $filename = tempnam(sys_get_temp_dir(), "csv");

            $file = fopen($filename,"w");
            
            $fieldArray=array("id","name","email","address","city","postal code","phone","message");
                // Write column names
            fputs($file, $bom =( chr(0xEF) . chr(0xBB) . chr(0xBF) ));
             fputcsv($file,$fieldArray);

                // Write data rows
            
                foreach ($result['rows'] as $line) {
                   // var_dump($line);
                    
                    fputcsv($file,$line);
                    
                }
               // die();
                fclose($file);

                header("Content-Type: application/csv;charset=UTF-8");
                header("Content-Disposition: attachment;Filename=message.csv");

                // send file to browser
                readfile($filename);
                unlink($filename);
	}
        
       function message_edit() {		
		$post_id = $this->uri->segment(3, 0);
		if (empty($post_id)) {
			echo "select message!";
			return;
		}
		
		$data = $this->_proc_post_edit($post_id);
		$data['post_key'] = "message";	
		$data['post'] = $this->messages->get_specific_data($post_id);
		$this->load->view('message/message_edit_v', $data);
	}
        
        function message_comment() {
		$post_id = $this->uri->segment(3, 0);
		if (empty($post_id)) {
			echo "select message!";
			return;
		}
		
		$data = $this->_proc_post_edit($post_id);
		$data['post_key'] = "message";	
		$data['post'] = $this->messages->get_specific_data($post_id);
		$this->load->view('message/message_comment_v', $data);
	}
        
      
        private function &_proc_post_edit($new_idx) { 
    
                $this->form_validation->set_rules('name', 'Name', 'trim|required');
             
                $qry = array();
		$data = array();
		
		if ($this->form_validation->run())
		{	
			$tbl_name = "messages";	
			if ( empty($data['show_errors']) || count($data['show_errors'])==0 ) {
				
                            $this->load->library('upload');   
                            $prev=$this->messages->get_specific_data($new_idx);
                                                        
                            $qry = array_merge(	
					$qry,
					array(
						'id'		=> $new_idx,						
                                                'name'  =>    $this->input->post('name'),                                                
                                                'price'		=> $this->input->post('price'),
                                                'video_info'	=> $this->input->post('video_info'),
                                                
					)
				);
				
				$this->db->where('id', $new_idx);
				$this->db->update($tbl_name, $qry);
				
				$data['show_message'] = "Successfully updated!";

			}			
		}//end run	
			
		return $data;	
		
    } //end function
    
    private function _proc_post_del($idx) {    	
            $strSql = "DELETE FROM messages WHERE id='$idx' ";
            $this->db->query($strSql);
    }
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */


//Watch list completed