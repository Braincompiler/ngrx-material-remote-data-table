import { Inject, Injectable, InjectionToken } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { comparator, isEmpty } from 'ramda'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

import { IJPPhoto } from 'models/jpphoto'

export const jsonPlaceholderURL = new InjectionToken('JSONPlaceholder.URL')

@Injectable()
export class JPPhotoService {
  public constructor(@Inject(jsonPlaceholderURL) private apiUrl: string,
                     private http: HttpClient) { }

  public fetch(top: number, skip: number, sortField: string, sortDirection: string): Observable<IJPPhoto[]> {
    return this.http.get(`${this.apiUrl}/photos`)
               // jsonplaceholder backend has no odata options so we simulate it here
               .map((photos: IJPPhoto[]) => {
                 if (!isEmpty(sortField) && !isEmpty(sortDirection)) {
                   const comp = sortDirection === 'asc'
                     ? comparator((a, b) => a[ sortField ] < b[ sortField ])
                     : comparator((a, b) => a[ sortField ] > b[ sortField ])

                   return photos.sort(comp)
                 }

                 return photos
               })
               .map((photos: IJPPhoto[]) => photos.splice(top * skip, skip))
  }
}
