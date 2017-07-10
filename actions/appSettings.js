export const SET_APP_SETTINGS = "SET_APP_SETTINGS"
import {TYPE_DEFAULTS_NEW} from "../constants/activities"
export const setAppSettings = (settings) => {
  return {
    type: SET_APP_SETTINGS,
    settings: settings,
    receivedAt: Date.now()
  }
}

export const getAppSettings= () => {
  return(dispatch, getState) => {
    return dispatch(setAppSettings(TYPE_DEFAULTS_NEW))
  }
}