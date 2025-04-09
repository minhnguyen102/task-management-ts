interface objectSearch {
    keyword: string,
    regex?: RegExp
}

const searchHelper = (query: Record<string, any>) => {
    let objectSearch: objectSearch = {
        keyword : ""
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");
        objectSearch.regex = regex;
    }
    return objectSearch // sẽ có 2 key là keyword và regex
}

export default searchHelper;