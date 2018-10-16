using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public struct DataTableSettings
    {
        public List<Column> columns { get; set; }
        public List<Object> rows { get; set; }
        public List<Filter> filters { get; set; }
        public Paging paging { get; set; }
        public Sorting? sorting { get; set; }
    }
}
