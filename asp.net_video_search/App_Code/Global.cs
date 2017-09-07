using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using System.Net.Mail;
using System.Net;


/// <summary>
/// Summary description for App
/// </summary>
public class Global
{
    public Global()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    // generate text like 1 Month Ago, 10 days ago
    public static String GetAgoString(DateTime published)
    {
        String dateDifference = "";

        var curDate = DateTime.Now;

        if (curDate.Year == published.Year && curDate.Month == published.Month
            && curDate.Date == published.Date)
        {
            dateDifference = "Today";
        }
        else if (curDate.Year == published.Year && curDate.Month == published.Month)
        {

            dateDifference = (curDate.Day - published.Day).ToString() + " Day";
            if (curDate.Day - published.Day > 1)
            {
                dateDifference += 's';
            }
        }
        else if (curDate.Year == published.Year)
        {
            dateDifference = (curDate.Month - published.Month).ToString() + " Month";
            if (curDate.Month - published.Month > 1)
            {
                dateDifference += 's';
            }
        }
        else
        {
            dateDifference = (curDate.Year - published.Year).ToString() + " Year";
            if (curDate.Year - published.Year > 1)
            {
                dateDifference += 's';
            }
        }

        return dateDifference;
    }

    public static SearchListResponse searchVideos(String q, int pageSize)
    {
        var youtubeService = new YouTubeService(new BaseClientService.Initializer()
        {
            ApiKey = @System.Configuration.ConfigurationManager.AppSettings["youtubeApiKey"],
        });

        SearchListResponse searchListResponse = null;

        var searchListRequest = youtubeService.Search.List("snippet");

        searchListRequest.Q = q;
        searchListRequest.Type = "video";
        searchListRequest.MaxResults = pageSize;
        
        searchListResponse = searchListRequest.Execute();
        return searchListResponse;
    }

    // generate string 40123K Watched
    public static String getWatchCountString(ulong watchCount)
    {
        String watchCountStr = watchCount.ToString();

        if (watchCount > 1000 * 10000)
        {
            watchCountStr = Math.Round((double)watchCount / 1000, 0).ToString() + "K";
        }
        else if (watchCount < 1000 * 10000 && watchCount > 1000)
        {
            watchCountStr = Math.Round((double)watchCount / 1000, 1).ToString() + "K";
        }

        if (watchCountStr.Length < 8)
        {
            watchCountStr += " watched";
        }

        return watchCountStr;
    }


    // generate string 40123K Watched
    public static String getCountString(ulong count, int offset)
    {
        String countStr = count.ToString();

        if (count > 1000)
        {
            countStr = Math.Round((double)count / 1000, offset).ToString() + "K";
        }

        return countStr;
    }


    public static Boolean sendEmail(String name, String email, String messages)
    {

        String smtpHost = @System.Configuration.ConfigurationManager.AppSettings["smtpHost"];
        String smtpPort = @System.Configuration.ConfigurationManager.AppSettings["smtpPort"];
        String smtpUserName = @System.Configuration.ConfigurationManager.AppSettings["smtpUserName"];
        String smtpPwd = @System.Configuration.ConfigurationManager.AppSettings["smtpPwd"];

        try
        {
            SmtpClient sc = new SmtpClient(smtpHost, Int32.Parse(smtpPort));
            sc.EnableSsl = true;
            sc.UseDefaultCredentials = true;
            sc.Credentials = new NetworkCredential(smtpUserName, smtpPwd);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("petert@wellunitedmedia.com");
            msg.ReplyTo = new MailAddress("petert@wellunitedmedia.com");
            msg.To.Add(new MailAddress(email));
            msg.Subject = name;
            msg.IsBodyHtml = true;

            msg.Body = messages; 
            msg.Priority = MailPriority.High;
            sc.Send(msg);

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }

    }

    public static Boolean sendFeedback(String name, String email, String messages)
    {
        String smtpHost = @System.Configuration.ConfigurationManager.AppSettings["smtpHost"];
        String smtpPort = @System.Configuration.ConfigurationManager.AppSettings["smtpPort"];
        String smtpUserName = @System.Configuration.ConfigurationManager.AppSettings["smtpUserName"];
        String smtpPwd = @System.Configuration.ConfigurationManager.AppSettings["smtpPwd"];

        try
        {
            SmtpClient sc = new SmtpClient(smtpHost, Int32.Parse(smtpPort));
            sc.EnableSsl = true;
            sc.UseDefaultCredentials = true;
            sc.Credentials = new NetworkCredential(smtpUserName, smtpPwd);
            sc.DeliveryMethod = SmtpDeliveryMethod.Network;

            MailMessage msg = new MailMessage();
            msg.From = new MailAddress("petert@wellunitedmedia.com");
            msg.ReplyTo = new MailAddress("petert@wellunitedmedia.com");
            msg.To.Add(new MailAddress(email));
            msg.Subject = name;
            msg.IsBodyHtml = true;


            msg.Body = messages;
            msg.Priority = MailPriority.High;
            sc.Send(msg);
            

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }

    }

}