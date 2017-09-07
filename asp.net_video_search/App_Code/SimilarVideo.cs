using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

/// <summary>
/// Summary description for SimilarVideo
/// </summary>
public class SimilarVideo
{
    public String id; // video id
    public String video_url; // url
    public String img_url; // url
    
    public SimilarVideo()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public void setId(String id)
    {
        this.id = id;        
    }

    public void setVideoUrl(String video_url)
    {
        this.video_url = video_url;
    }

    public void setImgUrl(String img_url)
    {
        this.img_url = img_url;
    }

}