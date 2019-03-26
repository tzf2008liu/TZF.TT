using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Test
{
    class Program
    {
        static void Main(string[] args)
        {
          var address= TZF.TT.Common.Networks.GetMacAddress();
            Console.WriteLine("当前地址："+address);
            Console.ReadKey();
        }
    }
}
