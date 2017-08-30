/**
 * Created: 2017-08-30
 * @author Christian Seifert <christian.seifert@robotron.de>
 */

import { Action, ActionReducerMap, createFeatureSelector } from '@ngrx/store'

import { IJPPhoto } from 'models/jpphoto'
import { LOAD_PHOTOS_ERROR, LOAD_PHOTOS_REQUEST, LOAD_PHOTOS_RESPONSE } from 'app/redux/actions'

export interface IPhotoState {
  isLoading: boolean
  photos: IJPPhoto[]
  error?: Error
}

export const INITIAL_STATE: IPhotoState = {
  isLoading: true,
  photos: [],
}

export interface IState {
  app: IPhotoState
}

export const photosSelector = createFeatureSelector('photos')

export const reducers: ActionReducerMap<IState> = {
  app: photos,
}

export function photos(state: IPhotoState = INITIAL_STATE, action: Action): IPhotoState {
  switch (action.type) {
    case LOAD_PHOTOS_REQUEST:
      return {
        isLoading: true,
        photos: [],
      }

    case LOAD_PHOTOS_RESPONSE:
      return {
        isLoading: false,
        photos: (action as any).payload.slice(),
      }

    case LOAD_PHOTOS_ERROR:
      return {
        isLoading: false,
        photos: [],
        error: (action as any).error,
      }
  }

  return state
}
