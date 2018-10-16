using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public struct Sorting
    {
        public string prop { get; set; }
        public bool asc { get; set; }
    }

    public static class SortingExtensions
    {
        public static IEnumerable<Object> SortData(this Sorting? sorting, IEnumerable<Object> data)
        {
            var res = data;
            if (sorting.HasValue)
            {
                PropertyInfo selector(Object row) => row.GetType().GetProperty(sorting.Value.prop);

                res = sorting.Value.asc ? data.OrderBy(selector) : data.OrderByDescending(selector);
            }
            return res;
        }
    }
}
