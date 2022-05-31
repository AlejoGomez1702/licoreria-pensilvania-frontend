import { HttpHeaders, HttpParams } from "@angular/common/http";

export interface HttpOptions
{
    params?: HttpParams,
    headers?: HttpHeaders
}