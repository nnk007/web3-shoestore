type ISODate = `${string}-${string}-${string}`;
export interface Shoe {
    "name":string,
    "description":string,
    "style":string,
    "colorway":string,
    "msrp":number,
    "release-date": ISODate
    "images":string[],
}