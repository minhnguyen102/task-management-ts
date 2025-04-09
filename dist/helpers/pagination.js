"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelper = void 0;
const paginationHelper = (objectPagination, query, totalTask) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    const totalPage = Math.ceil(totalTask / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    return objectPagination;
};
exports.paginationHelper = paginationHelper;
