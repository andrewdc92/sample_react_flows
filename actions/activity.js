import {API_PATH} from '../constants/api'
import ApiUtils from '../utils/api'
import AlertUtils from '../utils/alert'

import ReactOnRails from 'react-on-rails';
import {activityPath} from "../helpers/index"
import { Router, browserHistory } from 'react-router';
import {processFormData} from "./helpers"


export const REQUEST_ACTIVITY = "REQUEST_ACTIVITY"
export const SET_SCOPED_ACTIVITY_COMMENTS = "SET_SCOPED_ACTIVITY_COMMENTS"
export const RECIEVED_ACTIVITY = "RECIEVED_ACTIVITY"
export const ACTIVITY_FETCHING_STARTED = "ACTIVITY_FETCHING_STARTED"
export const ACTIVITY_FETCHING_STOPPED = "ACTIVITY_FETCHING_STOPPED"

export const SET_SCOPED_ACTIVITY= "SET_SCOPED_ACTIVITY"
export const SET_SCOPED_ACTIVITY_BY_ID= "SET_SCOPED_ACTIVITY_BY_ID"
export const REQUEST_ACTIVITY_DONE = "REQUEST_ACTIVITY_DONE"

export const INPUT_CHANGE_NEW_ACTIVITY = "INPUT_CHANGE_NEW_ACTIVITY"
export const UPDATE_SCOPED_ACTIVITY = "UPDATE_SCOPED_ACTIVITY"
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY"
export const SET_STATUS_UPDATE_BODY = "SET_STATUS_UPDATE_BODY"

export const setScopedActivity = (projectId, activityId) => {
  return {
    type: SET_SCOPED_ACTIVITY,
    projectId,
    activityId,
    receivedAt: Date.now()
  }
}

export const goToActivityShow = (projectId, activityId) => {
  return(dispatch, getState) => {
    browserHistory.push(activityPath(projectId, activityId))
  }
}

export const updateActivity = (activity) => {
  return {
    type: UPDATE_ACTIVITY,
    activity,
    receivedAt: Date.now()
  }
}

export const setScopedActivityById = (activityId) => {
  return {
    type: SET_SCOPED_ACTIVITY_BY_ID,
    activityId,
    receivedAt: Date.now()
  }
}

export const updateScopedActivity  = (field, value) => {
  return {
    type: UPDATE_SCOPED_ACTIVITY,
    field,
    value,
    receivedAt: Date.now()
  }
}


export const recievedActivity  = ( activity) => {
  return {
    type: RECIEVED_ACTIVITY,
    activity,
    receivedAt: Date.now()
  }
}

export const requestActivity = () => {
  return {
    type: REQUEST_ACTIVITY,
  }
}

export const inputChangedNewActivity = (field, value) => {
  return {
    type: INPUT_CHANGE_NEW_ACTIVITY,
    field,
    value,
    receivedAt: Date.now()
  }
}



export const setScopedActivityComments = (activity) => {
  return {
    type: SET_SCOPED_ACTIVITY_COMMENTS,
    activity,
    receivedAt: Date.now()
  }
}

export const startedFetchingActivity = () => {
  return {
    type: ACTIVITY_FETCHING_STARTED
  }
}

export const stoppedFetchingActivity = () =>{
  return {
    type: ACTIVITY_FETCHING_STOPPED
  }
}

export const setStatusUpdateBody= (data) => {
 return {
    type: SET_STATUS_UPDATE_BODY,
    data
  }
}

export const shouldFetchActivity = (projectId, activityId) => {
  return(dispatch, getState) => {
    let state = getState()
    if (!state.activityActions.isFetching) {
      return dispatch(fetchActivity(projectId, activityId))
    }
  }
}

export const fetchActivity = (projectId, activityId, afterCall = () => {return {type: "do_nothing"}}) => {
  return dispatch => {
      dispatch(startedFetchingActivity())
      return fetch(`${API_PATH}/projects/${projectId}/activities/${activityId}.json`, {
        method: "GET",
        credentials: "same-origin",
      })
      .then(ApiUtils.checkStatus)
      .then(response => response.json())
      .then(function(json) {
        dispatch(stoppedFetchingActivity())
        dispatch(recievedActivity(json))
        dispatch(afterCall(json))
      })
      .catch(function(error) {
        dispatch(stoppedFetchingActivity())
        console.log(error);
      })
  }
}

const processActivityFormData = (data) => {
  return processFormData("activity", data)
}


export const updateStatusActivity = (data) =>{
  data = processActivityFormData(data)
  return(dispatch, getState) => {
    let state_local = getState()
    let projectId = state_local.activityActions.project_id
    let activityId = state_local.activityActions.id

    return fetch(`${API_PATH}/projects/${projectId}/activities/${activityId}`, {
      method: 'PATCH',
      credentials: "same-origin",
      body: data
      })
    .then(ApiUtils.checkStatus)
    .then(response => {
      dispatch(setScopedActivityComments(response))
      dispatch(updateActivity(response))
      return dispatch(fetchActivity(projectId, activityId))
    })
    .catch(function(error) {
      AlertUtils.api(error);
      console.log(error);
    })
  }
}

export const shouldUpdateActivity =  (data, projectId, activityId) => {
  return(dispatch, getState) => {
    let state = getState()
    if (!state.activityFormActions.isPosting) {
      return dispatch(updateActivity(data, projectId, activityId))
    }
  }
}
