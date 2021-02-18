import { HttpParams } from '@angular/common/http';
import { SortProps } from '../_models/sort.props';

export const setRequestParameters = (sortProps: SortProps): any => {
                                        
    let params = new HttpParams();

    if (sortProps.page != null &&sortProps.itemsPerPage !== null)
    {
        params = params.append('filter',sortProps.filter);
        params = params.append('sortColumn',sortProps.sortColumn);
        params = params.append('pageNumber',sortProps.page.toString());
        params = params.append('pageSize', sortProps.itemsPerPage.toString());
        params = params.append('reverse', (sortProps.sortDirection==='asc').toString());
        params = params.append('filterBy', sortProps.filterBy);
    }

    return params;

}