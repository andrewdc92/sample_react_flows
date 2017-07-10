import {
  SET_COMMENT_FORM_VALUE,
  RESET_COMMENT_FORM,
  COMMENT_FORM_POST_STARTED,
  COMMENT_FORM_POST_STOPPED
} from "../actions/comments"

import {RESET_ON_PAGE_LOAD} from "../actions/resets"


export const initState = {
  body: "",
  isPostingComment: false
}

export default function commentFormActions (state = initState, action) {
  switch (action.type) {
    case SET_COMMENT_FORM_VALUE :
      return Object.assign({}, state, {
        [action.key]:  action.value
      })
    case COMMENT_FORM_POST_STARTED:
     return Object.assign({}, state, {isPostingComment: true})
    case COMMENT_FORM_POST_STOPPED:
     return Object.assign({}, state, {isPostingComment: false})
    case RESET_ON_PAGE_LOAD:
    case RESET_COMMENT_FORM:
      return Object.assign({}, state, initState)
    default:
      return state
  }
}
