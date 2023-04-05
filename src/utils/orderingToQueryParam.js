export function orderingToQueryParam(ordering){
    if(ordering === "A-Z"){
        return "orderBy=name&sortDirection=asc"
    }else if(ordering === "Z-A"){
        return "orderBy=name&sortDirection=desc"
    }else if(ordering === "price-asc"){
        return "orderBy=price&sortDirection=asc"
    }else{
        return "orderBy=price&sortDirection=desc";
    }
}