using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace QLTV_V2.Helper
{
    public class ProviderDAL
    {
        private readonly SqlConnection sqlConnecttion;
        public ProviderDAL()
        {
            var configuration = GetConfiguration();
            sqlConnecttion = new SqlConnection(configuration.GetSection("ConnectionStrings").GetSection("DefaultConnection").Value);
        }

        IConfigurationRoot GetConfiguration()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
            return builder.Build();
        }

        public DataTable GetDataPaging(string spName, int pageIndex, int pageSize, string sortColumn, int sortOrder)
        {
            using(SqlConnection con = sqlConnecttion)
            {
                DataSet ds = new DataSet();
                try
                {
                    string col = sortColumn.Replace("&", "&amp");
                    SqlParameter pageIndexParam, pageSizeParam, colParam, sortParam;
                    SqlDataAdapter adapter;

                    con.Open();
                    SqlCommand command = new SqlCommand(spName, con);
                    command.CommandType = CommandType.StoredProcedure;

                    if (col.Length != 0)
                    {
                        pageIndexParam = new SqlParameter("@PageIndex", pageIndex);
                        pageIndexParam.Direction = ParameterDirection.Input;
                        pageIndexParam.DbType = DbType.Int32;
                        command.Parameters.Add(pageIndexParam);

                        pageSizeParam = new SqlParameter("@PageSize", pageSize);
                        pageSizeParam.Direction = ParameterDirection.Input;
                        pageSizeParam.DbType = DbType.Int32;
                        command.Parameters.Add(pageSizeParam);

                        colParam = new SqlParameter("@Col", col);
                        colParam.Direction = ParameterDirection.Input;
                        colParam.DbType = DbType.String;
                        command.Parameters.Add(colParam);

                        sortParam = new SqlParameter("@SortOrder", sortOrder);
                        sortParam.Direction = ParameterDirection.Input;
                        sortParam.DbType = DbType.Int32;
                        command.Parameters.Add(sortParam);
                    }
                    adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds, spName);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    con.Close();
                    con.Dispose();
                }
                return ds.Tables[0];
            }    
        }

        public DataTable GetDataPagingWithId(string spName, int pageIndex, int pageSize, string sortColumn, int sortOrder, string nameCol, int objId)
        {
            using (SqlConnection con = sqlConnecttion)
            {
                DataSet ds = new DataSet();
                try
                {
                    string col = sortColumn.Replace("&", "&amp");
                    SqlParameter pageIndexParam, pageSizeParam, colParam, sortParam;
                    SqlDataAdapter adapter;

                    con.Open();
                    SqlCommand command = new SqlCommand(spName, con);
                    command.CommandType = CommandType.StoredProcedure;

                    if (col.Length != 0)
                    {
                        pageIndexParam = new SqlParameter("@PageIndex", pageIndex);
                        pageIndexParam.Direction = ParameterDirection.Input;
                        pageIndexParam.DbType = DbType.Int32;
                        command.Parameters.Add(pageIndexParam);

                        pageSizeParam = new SqlParameter("@PageSize", pageSize);
                        pageSizeParam.Direction = ParameterDirection.Input;
                        pageSizeParam.DbType = DbType.Int32;
                        command.Parameters.Add(pageSizeParam);

                        colParam = new SqlParameter("@Col", col);
                        colParam.Direction = ParameterDirection.Input;
                        colParam.DbType = DbType.String;
                        command.Parameters.Add(colParam);

                        sortParam = new SqlParameter("@SortOrder", sortOrder);
                        sortParam.Direction = ParameterDirection.Input;
                        sortParam.DbType = DbType.Int32;
                        command.Parameters.Add(sortParam);

                        sortParam = new SqlParameter($"@{nameCol}", objId);
                        sortParam.Direction = ParameterDirection.Input;
                        sortParam.DbType = DbType.Int32;
                        command.Parameters.Add(sortParam);
                    }
                    adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds, spName);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    con.Close();
                    con.Dispose();
                }
                return ds.Tables[0];
            }
        }

        public DataTable GetDataActivePaging(string spName, int pageIndex, int pageSize)
        {
            using (SqlConnection con = sqlConnecttion)
            {
                DataSet ds = new DataSet();
                try
                {
                    SqlParameter pageIndexParam, pageSizeParam;
                    SqlDataAdapter adapter;

                    con.Open();
                    SqlCommand command = new SqlCommand(spName, con);
                    command.CommandType = CommandType.StoredProcedure;

                    pageIndexParam = new SqlParameter("@PageIndex", pageIndex);
                    pageIndexParam.Direction = ParameterDirection.Input;
                    pageIndexParam.DbType = DbType.Int32;
                    command.Parameters.Add(pageIndexParam);

                    pageSizeParam = new SqlParameter("@PageSize", pageSize);
                    pageSizeParam.Direction = ParameterDirection.Input;
                    pageSizeParam.DbType = DbType.Int32;
                    command.Parameters.Add(pageSizeParam);

                    adapter = new SqlDataAdapter(command);
                    adapter.Fill(ds, spName);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    con.Close();
                    con.Dispose();
                }
                return ds.Tables[0];
            }
        }
    }

    public static class ConvertToEnumerable
    {
        public static IEnumerable<DataRow> AsEnumerableCustome(this DataTable table)
        {
            for (int i = 0; i < table.Rows.Count; i++)
            {
                yield return table.Rows[i];
            }
        }
    }
}
