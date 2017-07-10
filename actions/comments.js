import {API_PATH} from '../constants/api'
import ApiUtils from '../utils/api'
import ReactOnRails from 'react-on-rails';
import {fetchActivity} from './activity'

export const RESET_COMMENT_FORM = "RESET_COMMENT_FORM"
export const SET_COMMENT_FORM_VALUE = "SET_COMMENT_FORM_VALUE"
export const COMMENT_FORM_POST_STARTED = "COMMENT_FORM_POST_STARTED"
export const COMMENT_FORM_POST_STOPPED = "COMMENT_FORM_POST_STOPPED"


export const resetCommentForm = () => {
  return {
    type: RESET_COMMENT_FORM
  }
}

export const commentPostStarted = () => {
  return {
    type: COMMENT_FORM_POST_STARTED
  }
}

export const commentPostStopped = () => {
  return {
    type: COMMENT_FORM_POST_STOPPED
  }
}

export const setCommentFormField = (key, value) => {
  return {
    type: SET_COMMENT_FORM_VALUE,
    key,
    value,
    receivedAt: Date.now()
  }
}

const processCommentFormData = (post_data) =>{
  let data = new FormData()
  for (var [key, value] of Object.entries(post_data)) {
    if(Array.isArray(value)){
      value.map((obj) => {
        data.append("comment["+key+"][]", obj)
      })
    } else {
        data.append('comment['+key+']', value)
    }
  }
  return data
}

export const shouldCreateComment  =  (data, projectId, activityId) => {
  return(dispatch, getState) => {
    let state = getState()
    if (!state.commentFormActions.isPosting) {
      return dispatch(createNewComment(data, projectId, activityId))
    }
  }
}

export const createNewComment = (commentData, projectId, activityId) => {
  return(dispatch, getState) => {
    commentData = processCommentFormData(commentData)
    dispatch(commentPostStarted())
    return fetch(`${API_PATH}/projects/${projectId}/activities/${activityId}/comments`, {
      method: 'POST',
      credentials: "same-origin",
      body: commentData
    })
    .then(ApiUtils.checkStatus)
    .then(response => {
      dispatch(commentPostStopped())
      dispatch(resetCommentForm())
      dispatch(fetchActivity(projectId, activityId))
    },(error) => {
      dispatch(commentPostStopped())
      console.log(error);
    })
  }
}
