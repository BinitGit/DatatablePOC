using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public static class MockData
    {
        public static DataTableSettings MockSettings => new DataTableSettings
        {
            columns = MockCols,
            rows = MockRows,
            filters = MockFilters,
            paging = MockPaging,
            sorting = MockSorting
        };

        public static List<Object> MockRows => new List<Object>
        {
            new {gender = Genders.Male, name = "Austin", company = "Swimlane"},
            new {gender = Genders.Male, name = "Dany", company = "KFC"},
            new {gender = Genders.Female, name = "Molly", company = "Burger King"},
            new {gender = Genders.Female, name = "Stella", company = "Binit"},
        };

        private static List<Column> MockCols => new List<Column>
        {
            new Column { prop = ColumnsConsts.Gender},
            new Column { prop = ColumnsConsts.Name},
            new Column { prop = ColumnsConsts.Company},
        };

        private static Paging MockPaging => new Paging
        {
            pageNumber = 0,
            totalElements = MockRows.Count,
            size = 10,
            totalPages = 1
        };

        private static List<Filter> MockFilters
        {
            get
            {
                var nameFilter = new Filter
                {
                    prop = ColumnsConsts.Name,
                    title = $"Filter by {ColumnsConsts.Name.ToLower()}",
                    type = FilterType.text,
                    fparams = new List<FilterParam>()
                };
                var companyFilter = new Filter
                {
                    prop = ColumnsConsts.Company,
                    type = FilterType.text,
                    fparams = new List<FilterParam>()
                };
                var genderFilter = new Filter
                {
                    prop = ColumnsConsts.Gender,
                    title = $"Pick a {ColumnsConsts.Gender.ToLower()}",
                    type = FilterType.dropdown,
                    fparams = new List<FilterParam>
                    {
                        new FilterParam { key = Genders.Male, value = Genders.Male },
                        new FilterParam { key = Genders.Female, value = Genders.Female },
                    }
                };
                return new List<Filter>
                {
                    genderFilter,
                    nameFilter,
                    companyFilter
                };
            }
        }

        private static Sorting MockSorting => new Sorting
        {
            prop = ColumnsConsts.Name,
            asc = true
        };

        private static class ColumnsConsts
        {
            public const string Gender = "gender";
            public const string Name = "name";
            public const string Company = "company";
        }

        private static class Genders
        {
            public const string Male = "Male";
            public const string Female = "Female";
        }
    }
}
