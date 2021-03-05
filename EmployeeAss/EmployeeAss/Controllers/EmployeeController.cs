using EmployeeAss.Modal;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeAss.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public EmployeeController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"select * from dbo.Employee";
            DataTable table = new DataTable();
            string sqlConnection = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader MyReader;
            using (SqlConnection myConnection = new SqlConnection(sqlConnection))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    MyReader = myCommand.ExecuteReader();
                    table.Load(MyReader); ;

                    MyReader.Close();
                    myConnection.Close();
                }
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(EmployeeData data)
        {
            

            string query = @"insert into dbo.Employee (QuickLookId,FirstName, LastName, PhoneNumber, Address, City, State, Country, ImageURL) values (
            '" + data.QuickLookId + @"',
            '" + data.FirstName + @"',
            '" + data.LastName + @"',
            '" + data.PhoneNumber + @"',
           '" + data.Address + @"',
           '" + data.City + @"',
           '" + data.State + @"',
           '" + data.Country + @"',
           '" + data.ImageURL + @"'
            )";
            DataTable table = new DataTable();
            string sqlConnection = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader MyReader;
            using (SqlConnection myConnection = new SqlConnection(sqlConnection))
            {
                myConnection.Open();
                try
                {
                    using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                    {
                        MyReader = myCommand.ExecuteReader();
                        table.Load(MyReader); ;

                        MyReader.Close();
                        myConnection.Close();
                    }
                }
                catch(Exception)
                {
                    return new JsonResult("Please fill Correct details.");
                }
            }

            return new JsonResult("Added Sucessfully");
        }
        [HttpPut]
        public JsonResult Put(EmployeeData data)
        {

             string query = @"
                     update dbo.Employee set 
                     QuickLookId = '" + data.QuickLookId + @"',
                     FirstName = '" + data.FirstName + @"',
                     LastName = '" + data.LastName + @"',
                     PhoneNumber = '" + data.PhoneNumber + @"',
                     Address = '" + data.Address + @"',
                     City = '" + data.City + @"',
                     State = '" + data.State + @"',
                     Country = '" + data.Country + @"',
                     ImageURL = '" + data.ImageURL + @"'
                     where EmployeeID = " + data.EmployeeID + @" 
                     ";
            DataTable table = new DataTable();
            string sqlConnection = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader MyReader;
            using (SqlConnection myConnection = new SqlConnection(sqlConnection))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    MyReader = myCommand.ExecuteReader();
                    table.Load(MyReader); ;

                    MyReader.Close();
                    myConnection.Close();
                }
            }

            return new JsonResult("Updated Sucessfully");
        }
        [HttpDelete("{Id}")]
        public JsonResult Delete(int Id)
        {

            string query = @"
                    delete from dbo.Employee
                    where EmployeeID = " + Id + @" 
                    ";
            DataTable table = new DataTable();
            string sqlConnection = _configuration.GetConnectionString("EmployeeAppCon");
            SqlDataReader MyReader;
            using (SqlConnection myConnection = new SqlConnection(sqlConnection))
            {
                myConnection.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myConnection))
                {
                    MyReader = myCommand.ExecuteReader();
                    table.Load(MyReader); ;

                    MyReader.Close();
                    myConnection.Close();
                }
            }

            return new JsonResult("Delete Sucessfully");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
