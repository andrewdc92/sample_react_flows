import {SET_APP_SETTINGS} from '../constants/activities'
const initState = {
  activities:[],
  open_activities:[],
  activities_lookup:[],
  prices:[]
}

export function appSettingActions(state = initState, action){
  switch(action.type){
    case SET_APP_SETTINGS:
      return Object.assign({}, state, action.settings)
    default:
      return state;
  }
}
