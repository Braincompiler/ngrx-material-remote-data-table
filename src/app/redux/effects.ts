/**
 * Created: 2017-08-30
 * @author Christian Seifert <christian.seifert@robotron.de>
 */
import { Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { HttpErrorResponse } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/catch'

import { JPPhotoService } from 'app/core/jsonplaceholder/jpphoto.service'
import { IJPPhoto } from 'models/jpphoto'

import { LOAD_PHOTOS_REQUEST, LoadPhotosErrorAction, LoadPhotosRequestAction, LoadPhotosResponseAction } from './actions'

@Injectable()
export class LoadPhotosEffects {
  @Effect()
  public loadPhotos$: Observable<Action> = this.actions$.ofType<LoadPhotosRequestAction>(LOAD_PHOTOS_REQUEST)
                                               .map(action => action.payload)
                                               .switchMap((payload) => this.jpphotoService.fetch(
                                                 payload.top,
                                                 payload.skip,
                                                 payload.sortField,
                                                 payload.sortDirection))
                                               .map((photos: IJPPhoto[]) => new LoadPhotosResponseAction(photos))
                                               .catch((err: HttpErrorResponse) => of(new LoadPhotosErrorAction(err)))

  public constructor(private actions$: Actions,
                     private jpphotoService: JPPhotoService) {}
}
