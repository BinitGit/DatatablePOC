using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public struct Filter
    {
        public string prop { get; set; }
        public string title { get; set; }
        public FilterType type { get; set; }
        public List<FilterParam> fparams { get; set; }
    }

    public struct FilterParam
    {
        public string key { get; set; }
        public Object value { get; set; }
    }

    public enum FilterType
    {
        text = 1,
        dropdown,
    }
}
