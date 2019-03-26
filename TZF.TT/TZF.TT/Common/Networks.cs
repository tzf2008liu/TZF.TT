using System.Management;

namespace TZF.TT.Common
{
    /// <summary>
    /// 网络相关的方法
    /// </summary>
    public class Networks
    {
        /// <summary>
        /// 获取网卡硬件(Mac)地址 
        /// </summary>
        /// <returns></returns>
        public static string GetMacAddress()
        {
            try
            {
                string mac = "";
                ManagementClass mc = new ManagementClass("Win32_NetworkAdapterConfiguration");
                ManagementObjectCollection moc = mc.GetInstances();
                foreach (ManagementObject mo in moc)
                {
                    if ((bool)mo["IPEnabled"] == true)
                    {
                        mac = mo["MacAddress"].ToString();
                        break;
                    }
                }
                moc = null;
                mc = null;
                return mac;
            }
            catch
            {
                return "00.00.00.00";
            }
        }
    }
}
