
import {
  SET_SCOPED_ACTIVITY,
  RECIEVED_ACTIVITY,
  ACTIVITY_FETCHING_STARTED, 
  ACTIVITY_FETCHING_STOPPED,
  SET_SCOPED_ACTIVITY_BY_ID
} from '../actions/activity'


export const initState = {
  id: 0,
  user: {},
  title: "",
  body: "",
  status: "open",
  activity_type: "rfi",
  project_id: 0,
  status: "",
  price: 0,
  tags: "",
  images: [],
  comments: [],
  comments_count: 0,
  time_change: 0,
  time_change_type: "",
  date_change: "",
  images: [],
  isFetching: false
}


export function activityActions(state = initState, action){
  let activity = {}
  switch(action.type){
    case ACTIVITY_FETCHING_STARTED:
      return Object.assign({}, state, {
        isFetching: true,
      })
      case ACTIVITY_FETCHING_STOPPED:
        return Object.assign({}, state, {
          isFetching: false,
        })
      case RECIEVED_ACTIVITY:
        let newObject = Object.assign({}, state, action.activity)
        return newObject
      case SET_SCOPED_ACTIVITY:
      let newState = Object.assign({}, state, {
        activity: action.activity
      })
        default:
          return state;
      }
    }
