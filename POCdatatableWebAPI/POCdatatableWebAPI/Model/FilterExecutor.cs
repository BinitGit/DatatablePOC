using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace POCdatatableWebAPI.Model
{
    public abstract class FilterExecutor
    {
        protected Filter Filter { get; }

        public FilterExecutor(Filter filter) => Filter = filter;
        public abstract IEnumerable<Object> ExecuteFilter(IEnumerable<Object> inputData);

        public static FilterExecutor Factory(Filter filter)
        {
            switch (filter.type)
            {
                case FilterType.text:
                    return new TextFilterFilterExecutor(filter);
                case FilterType.dropdown:
                    return new DropdownFilterFilterExecutor(filter);
                default:
                    throw new ArgumentException("Invalid filter type");
            }
        }
    }

    public static class FilterExecutorExtensions
    {
        public static IEnumerable<Object> Execute(this IEnumerable<FilterExecutor> filters,
                                                  IEnumerable<Object> inputData)
        {
            foreach (FilterExecutor filter in filters)
                inputData = filter.ExecuteFilter(inputData);
            return inputData;
        }
    }

    public class TextFilterFilterExecutor : FilterExecutor
    {
        public TextFilterFilterExecutor(Filter filter) : base(filter) {}

        public override IEnumerable<Object> ExecuteFilter(IEnumerable<Object> inputData)
        {
            String selector(Object row) => row.GetType().GetProperty(Filter.prop).GetValue(row).ToString();

            return inputData.Where(row => selector(row).Contains(Filter.fparams.Single().value.ToString()));
        }
    }

    public class DropdownFilterFilterExecutor : FilterExecutor
    {
        public DropdownFilterFilterExecutor(Filter filter) : base(filter) { }

        public override IEnumerable<Object> ExecuteFilter(IEnumerable<Object> inputData)
        {
            String selector(Object row) => row.GetType().GetProperty(Filter.prop).GetValue(row).ToString();

            return inputData.Where(row => selector(row) == (Filter.fparams
                                                                  .Where(p => p.value is bool selected && selected)
                                                                  .Single()
                                                                  .key));
        }
    }
}
