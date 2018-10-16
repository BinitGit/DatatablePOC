using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public struct Paging
    {
        public int pageNumber { get; set; }
        public int size { get; set; }
        public int totalElements { get; set; }
        public int totalPages { get; set; }
    }
}
