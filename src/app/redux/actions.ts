import { Action } from '@ngrx/store'

import { IJPPhoto } from 'models/jpphoto'
import { HttpErrorResponse } from '@angular/common/http'

export const LOAD_PHOTOS_REQUEST = '[JSONPlaceholder::Photos] Request'
export const LOAD_PHOTOS_RESPONSE = '[JSONPlaceholder::Photos] Response'
export const LOAD_PHOTOS_ERROR = '[JSONPlaceholder::Photos] Error'

export class LoadPhotosRequestAction implements Action {
  public readonly type = LOAD_PHOTOS_REQUEST
  public readonly payload: { top: number; skip: number, sortField: string, sortDirection: string }

  public constructor(top: number,
                     skip: number,
                     sortField: string     = '',
                     sortDirection: string = '') {
    this.payload = {
      top,
      skip,
      sortField,
      sortDirection,
    }
  }
}

export class LoadPhotosResponseAction implements Action {
  public readonly type = LOAD_PHOTOS_RESPONSE

  public constructor(public readonly payload: IJPPhoto[]) {}
}

export class LoadPhotosErrorAction implements Action {
  public readonly type = LOAD_PHOTOS_ERROR

  public constructor(public readonly err: HttpErrorResponse) {
    if (err.error instanceof Error) {
      console.log('An error occurred:', err.error.message)
    } else {
      console.log(`Backend returned code ${err.status}, body was: ${err.error}`)
    }
  }
}
