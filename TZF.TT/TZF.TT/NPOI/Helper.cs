using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace TZF.TT.NPOI
{
    public class Helper
    {
        ///// <summary>
        ///// 向浏览器输出文件
        ///// </summary>
        ///// <param name="ms"></param>
        ///// <param name="context"></param>
        ///// <param name="fileName"></param>
        //private void RenderToBrowser(MemoryStream ms, HttpContent context, string fileName)
        //{
        //    if (context.Request.Browser.Browser == "IE")
        //        fileName = HttpUtility.UrlEncode(fileName);
        //    context.Response.Clear();
        //    context.Response.AddHeader("Content-Disposition", "attachment;filename=" + HttpUtility.UrlEncode(fileName));//添加头信息。为“文件下载/另存为”指定默认文件名称，对中文文件名进行URL编码解决中文乱码
        //    context.Response.AddHeader("Content-Length", ms.Length.ToString());//添加头文件，指定文件的大小，让浏览器显示文件下载的速度
        //    context.Response.AddHeader("Content-Transfer-Encoding", "binary");
        //    context.Response.BinaryWrite(ms.ToArray());
        //}

        /// <summary>
        /// datatable转文件流
        /// </summary>
        /// <param name="table">table源</param>
        /// <returns></returns>
        public MemoryStream RenderToExcel(DataTable table)
        {
            MemoryStream ms = new MemoryStream();
            using (table)
            {
                IWorkbook workbook = new HSSFWorkbook();
                ISheet sheet = workbook.CreateSheet();
                IRow headerRow = sheet.CreateRow(0);
                foreach (DataColumn column in table.Columns)
                    headerRow.CreateCell(column.Ordinal).SetCellValue(column.Caption);
                int rowIndex = 1;
                foreach (DataRow row in table.Rows)
                {
                    IRow dataRow = sheet.CreateRow(rowIndex);
                    foreach (DataColumn column in table.Columns)
                    {
                        dataRow.CreateCell(column.Ordinal).SetCellValue(row[column].ToString());
                    }
                    rowIndex++;
                }
                workbook.Write(ms);
                ms.Flush();
                ms.Position = 0;
            }
            return ms;
        }
    }
}
