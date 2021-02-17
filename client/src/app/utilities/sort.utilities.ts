import { SortProps } from 'src/app/_models/sort.props'; 

export const setSortingParameters = (filter: string, 
                                     sortDirection: string, 
                                     sortColumn: string, 
                                     page?: number, 
                                     itemsPerPage?: number,
                                     filterBy?: string): any => {
    
    let sortProps = new SortProps;
    sortProps.filter = filter;
    sortProps.itemsPerPage = itemsPerPage;
    sortProps.page = page;
    sortProps.sortColumn = sortColumn;
    sortProps.sortDirection = sortDirection; 
    sortProps.filterBy = filterBy;

    return sortProps;
}