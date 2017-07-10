import React, { Component } from 'react';
import ActivityStatusButtonRow from '../../components/activities/ActivityStatusButtons'

import {TYPE_DEFAULTS_NEW, getTypeText} from '../../constants/activities'

class ActivityNavBar extends Component {
  leftSideInfo() {
    return (
      <div className={"title"}>
        <a className="close-form-button" onClick={() => this.props.returnToProjects(this.props.params.projectId)}>
          <img src="/assets/cancel-gray.png" />
        </a>
        {getTypeText(this.props.activity.activity_type)}
        <h4 className="grey-nav-title">{this.props.activity.title}</h4>
      </div>
    )
  }
  render() {
    let params = this.props.params
    return (
      <div className="nav-bar">
        <div className="left-side">{this.leftSideInfo()}</div>
        <div className="center"></div>
        <div className="right-side">
          <div className="right-side">
            <ActivityStatusButtonRow
              activity={this.props.activity}
              buttonNames={this.props.statusNonActiveSettings}
              statusChanges={this.props.statusChanges}
              onStatusChange={(status) => this.props.onStatusChange(this.props.activity, status)}
            />
          </div>
        </div>
      </div>
    );
  }

}

import { connect } from 'react-redux'
import { updateStatusActivity } from '../../actions/activity'
import {goToActivityList} from '../../actions/activities'

const mapStateToProps = (state, ownProps) => {
  let activity = state.activityActions
  let status_list = TYPE_DEFAULTS_NEW.activities
  let activity_names = status_list.find((obj) => {return obj.value == activity.activity_type})
  return {
    activity: activity,
    statusNonActiveSettings: activity_names.status_nonactive_namings,
    statusChanges: activity_names.status_changes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onStatusChange: (activity, status, projectId, activityId) => {
      dispatch(updateStatusActivity({status}))
    },
    returnToProjects: (projectId) => {
      dispatch(goToActivityList(projectId))
    },
  }
}

ActivityNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityNavBar)

export default ActivityNavBar
