import React, { Component } from 'react'

import ActivitiesList from '../../components/activities/ActivitiesList'
import ActivityCard from '../../components/activities/ActivityCard'
import CommentCard from '../../components/comments/CommentCard'
import CommentInput from '../../containers/comments/CommentInput.jsx'
import Loader from '../../components/general/Loader'
import {setScopedProjectById} from '../../actions/projects.js'
import ActivityNavBar from "./ActivityNavBar"
import ActivityUploadFiles from "./ActivityUploadFiles"
import {
  getStatusText,
  getTypeText,
  UPDATE,
  RFI,
  CHANGE_ORDER
} from '../../constants/activities'

import {TYPE_DEFAULTS_NEW} from '../../constants/activities'

import {
  fetchActivity,
  receivedActivity,
  requestActivity,
  setScopedActivity,
  setScopedActivityById,
  shouldFetchActivity,
  setScopedActivityStatus,
  updateStatus,
  setScopedActivityComments,
  onStatusUpdate,
} from '../../actions/activity'

class ActivityShow extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.componentWillMount(this.props.params.projectId, this.props.params.activityId)
  }

  renderComments() {
    // console.log(this.props.activity.comments.images, 'line 37')

    return this.props.activity.comments.map((comment) => {
      return (
        <div className="commentItem" key={comment.id}>
            <CommentCard
              activity={this.props.activity}
              activityType={this.props.activity.activity_type}
              comment={comment}
              images={this.props.activity.comments.images}
             />
        </div>
      );
    });
  }

  showCard(){
    if(this.props.isFetching){
      return <Loader />
    }else{
      return (
        <div>
          <ActivityCard
            activity={this.props.activity}
            key={this.props.activity.id} />
          <ActivityUploadFiles />
          <div className="commentContainer">
            {this.renderComments()}
          </div>
          <CommentInput />
        </div>
      )
    }
  }
  render() {
    return (
      <div className="content-wrapper">
        <ActivityNavBar params={this.props.params}/>
        <div className="react-container">
          <div className="card-list">
            {this.showCard()}
          </div>
        </div>
      </div>
    )
  }
}

import { connect } from 'react-redux'
import {resetOnPageLoad} from '../../actions/resets'

const mapStateToProps = (state, ownProps) => {
  let activity = state.activityActions
  let status_list = TYPE_DEFAULTS_NEW.activities
  let activity_names = status_list.find((obj) => {return obj.value == activity.activity_type})
  return {
    activity: activity,
    projectId: ownProps.params.projectId,
    activityId: ownProps.params.activityId,
    activity_names,
    isFetching: activity.isFetching,
    comments: state.activitiesActions.scoped_activity_comments,
    statusActiveSettings: activity_names.status_active_namings,
    statusNonActiveSettings: activity_names.status_nonactive_namings,
    statusChanges: activity_names.status_changes

  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    componentWillMount(project_id, activity_id)  {
      dispatch(resetOnPageLoad())
      dispatch(fetchActivity(project_id,activity_id ))
    },
    componentUpdate: (projectId, activityId) => {
      return () => {
        if (projectId != 0 && activityId != 0) {
          dispatch(shouldFetchActivity(projectId, activityId))
        }
      }
    }
  }
}

 ActivityShow = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityShow)

export default ActivityShow
