export function getPageNumberFromPathname(pathname){
    return pathname.split("/")[3];
}