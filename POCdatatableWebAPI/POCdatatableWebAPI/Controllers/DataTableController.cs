using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using POCdatatableWebAPI.Model;
using Newtonsoft.Json;
using System.Reflection;

namespace POCdatatableWebAPI.Controllers
{
    [Route("api/DataTable")]
    public class DataTableController : Controller
    {
        [HttpGet]
        [Route("GetSettings")]
        public JsonResult GetSettings()
        {
            return new JsonResult(JsonConvert.SerializeObject(MockData.MockSettings));
        }

        [HttpPost]
        [Route("GetData")]
        public JsonResult GetData([FromBody] DataTableSettings settings)
        {
            List<Object> data = MockData.MockRows;

            IEnumerable<FilterExecutor> filterExecutors = settings.filters.Select(filter => FilterExecutor.Factory(filter));
            IEnumerable<Object> filteredData = filterExecutors.Execute(data);

            IEnumerable<Object> sortedData = settings.sorting.SortData(filteredData);

            IEnumerable<Object> pagedData = sortedData.Skip(settings.paging.size * settings.paging.pageNumber)
                                                      .Take(settings.paging.size);

            settings.rows = pagedData.ToList();

            return new JsonResult(JsonConvert.SerializeObject(settings));
        }
    }
}
