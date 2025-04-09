interface Pagination {
    currentPage : number,
    limitItem : number,
    skip?: number,
    totalPage?: number
}

export const paginationHelper = (objectPagination: Pagination, query, totalTask: number) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    const totalPage = Math.ceil(totalTask / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    return objectPagination;
}