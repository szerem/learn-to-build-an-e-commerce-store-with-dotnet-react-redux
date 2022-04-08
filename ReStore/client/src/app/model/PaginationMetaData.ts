export interface MetaData {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export class PaginationResponse<T> {
    items: T;
    medaData: MetaData

    constructor(items: T, medaData: MetaData){
        this.items = items;
        this.medaData = medaData;
    }
}
