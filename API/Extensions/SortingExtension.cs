using System;
using System.Linq;
using System.Linq.Expressions;

namespace API.Extensions
{
    public static class SortingExtension
    {
        public static IQueryable<T> SortBy<T>(this IQueryable<T> source, 
                                              string sortColumn,
                                              bool reverse) {

            var sortDirection = reverse ? "OrderBy" : "OrderByDescending";
            var type = typeof(T);
            var property = type.GetProperty(sortColumn);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), 
                                                             sortDirection, 
                                                             new Type[] { type, property.PropertyType }, 
                                                             source.Expression, 
                                                             Expression.Quote(orderByExp));
            return source.Provider.CreateQuery<T>(resultExp);
        }
        
    }
}