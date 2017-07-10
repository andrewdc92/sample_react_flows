import React, { Component } from 'react';


class CommentInput extends Component {
  componentWillMount() {
    this.props.onMount()
  }
  showPostCommentButton(){
    if(this.props.isPostingComment){
      return null
    }else{
      return ( 
        <a className="send-comment-btn" 
          onClick={() => { 
            this.props.onSave(
              this.props.body,
              this.props.projectId, 
              this.props.activityId
            ) 
          }
        }> Send </a>
      )
    }
  }

  render() {
    return(
      <div className="comment-container">
        <textarea
          value={this.props.body}
          onChange={(e) => this.props.inputChange("body", e)}
          className = "commentBox"
          placeholder="Write a Comment..."
        />
        {this.showPostCommentButton()}
      </div>
    )

  }
}

import { connect } from 'react-redux'
import {
  setCommentFormField,
  shouldCreateComment
} from '../../actions/comments'

function mapStateToProps(state) {
  return {
    body: state.commentFormActions.body,
    projectId: state.projectActions.scoped_project_id,
    activityId: state.activityActions.id,
    isPostingComment:  state.commentFormActions.isPostingComment
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onMount(){

    },
    inputChange(key, e) {
      dispatch(setCommentFormField(key, e.target.value))
    },
    onSave(body, projectId, activityId) {
      if(body.trim() == "") return
      dispatch(shouldCreateComment({body}, projectId, activityId))
     }
    }
  }

CommentInput = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInput)

export default CommentInput
