import React, { Component } from 'react';
import {formatDate, formatCurrency, priceIncreaseDecrease} from '../../helpers/'
import moment from 'moment';
import Slider from 'react-slick';
import {timeIncreaseDecrease} from "../../helpers/index"
import { IndexLink, Link, browserHistory } from 'react-router';

import {
  getStatusText,
  getTypeText,
  UPDATE,
  RFI,
  CHANGE_ORDER
} from '../../constants/activities'
import Avatar from '../general/Avatar'
import ImgCarousel from './ImgCarousel'
import Lightbox from 'react-images'



function getPrice(price) {
  let data = priceIncreaseDecrease(price)
  let sign = data.sign
  let direction = data.direction
  return (`${sign} $${formatCurrency(Math.abs(price))} | ${direction}`)
}


class ActivityCard extends Component {

  statusIndicators() {
    if (this.props.activity.activity_type !== UPDATE) {
      return (
        <div className="status-wrapper">
          <div className="tag open">
            <div className="tag-text">
              {getTypeText(this.props.activity.activity_type)}
            </div>
          </div>
          {this.priceChange()}
          <div className="tag open">
            <div className="tag-text">
              {getStatusText(this.props.activity)}
            </div>
          </div>
        </div>
      )
    }
    else if (this.props.activity.activity_type == UPDATE) {
      return (
        <div className="status-wrapper">
          <div className="tag open">
            <div className="tag-text">
              {getTypeText(this.props.activity.activity_type)}
            </div>
          </div>
          {this.priceChange()}
        </div>
      )
    }
  }

  showDateChange() {
    let activity = this.props.activity
    return (activity.activity_type == CHANGE_ORDER) &&
      ((activity.time_change_type == 'days' && activity.time_change != 0) ||
       (activity.time_change_type == 'date' && activity.date_change != ""))
  }

  getScheduleChangeText() {
    let activity = this.props.activity
    let string = ""
    if (activity.time_change_type == 'days') {
      let direction = timeIncreaseDecrease(activity.time_change)
      let days = Math.abs(activity.time_change)
      string = `Completion Date to be ${direction} by ${days} day`
      if (days > 1) {
        string += `s`
      }
    } else if (activity.time_change_type == 'date') {
      string = `New Completion Date: ${formatDate(activity.date_change)}`
    }
    return string
  }

  priceChange() {
    if (this.props.activity.activity_type == CHANGE_ORDER && this.props.activity.price != 0) {
      return (
        <div className="price-change">
          {getPrice(this.props.activity.price)}
        </div>
      )
    }
  }

  renderClockImg() {
    let imgUrl = "/assets/time-blue.png"
    if (this.props.activity.status === "solved") {
      imgUrl = "/assets/time-green.png"
    } else if (this.props.activity.status === "cancelled") {
      imgUrl = "/assets/time-black.png"
    }
    return(<img src={imgUrl} />)
  }

  scheduleChanges() {
    if (this.showDateChange()) {
      return (
        <div className="schedule-change">
          {this.renderClockImg()}
          <span>{this.getScheduleChangeText()}</span>
        </div>
      )
    }
    return null
  }

  renderTags() {
    if (this.props.activity.tags) {
      return (
        <div className="tags-wrapper">
          <div className="tag-icon"></div>
          <div className="labels">{this.props.activity.tags}</div>
        </div>
      )
    }
  }

  postInformation() {
    if(!this.props.activity.user){
      this.props.activity.user = {}
    }
    return (
      <div className="post-information">
        <Avatar source={this.props.activity.user.image} size={70}/>
        <div className="organization-information">
          <div className="author">{this.props.activity.user.name}</div>
          <div className="attached-users">{this.sharedUsers()}</div>
          <div className="recipients">{this.props.activity.shared}</div>
          {this.renderTags()}
        </div>
      </div>
    )
  }

  postBody() {
    return (
      <div className="post-body">
        <div className="title">{this.props.activity.title}</div>
        <div className="body">{this.props.activity.body}</div>
      </div>
    )
  }

  filesCount(){
    if(this.props.activity.upload_files_count > 0){
      return(
        <div id="file-count">
          <div className="upload-file-paperclip"></div>
           <div className="count">{this.props.activity.upload_files_count}</div>
        </div>
      )
    }else{
      return null
    }
  }

  bottomBar() {
    return (
      <div className="bottom-bar">
        {this.commentsInfo()}
        {this.filesCount()}
        <div className="last-update">{`Last updated: ${formatDate(this.props.activity.latest_activity)}`}</div>
        {this.editActivity()}
      </div>
    )
  }

  commentsInfo() {
    let currentPath = window.location.pathname
    if  (!currentPath.includes("activities")) {
      return (
        <div className="comment-info">
          <div className="comment-label">Comment</div>
          <div className="comment-icon"></div>
          <div className="comment-count">{this.props.activity.comments_count}</div>
        </div>
      )
    } else {
      return null
    }
  }

  getStyle() {
    if (this.props.activity.activity_type == UPDATE) { return "message" }
    if (this.props.activity.status == 'solved') { return "approved" }
    return this.props.activity.status
  }

  editActivity(){
    if(this.props.canEdit){
      return (
        <a className="edit-people" onClick={this.props.onEdit.bind(this)}>Edit People</a>
      )
    }
  }

 sharedUsers(){
    let activity = this.props.activity
    let txt = ""
    if(!!activity.users){
      var user_names=[]
      activity.users.forEach(function(elem){
        if (elem.id != activity.user.id) {
            user_names.push(elem.name);
        }
      })
      if(!!user_names.length){
        txt = "to " + user_names.join(",");
      }
    }
    return txt
  }



  render() {
    let style = "card " + this.getStyle();
    let images = this.props.activity.images

    return (
      <div
        id={`activity-${this.props.activity.id}`}
        className={style}
        key="activityCard{this.props.activity.id}"
        onClick={ this.props.onActivityClick.bind(this)}>
        {this.statusIndicators()}
        {this.postInformation()}
        {this.postBody()}
        {this.scheduleChanges()}
        <ImgCarousel
          backdropClosesModal
          showThumbnails
          images={images.map((image) =>  ({
            src: image.url,
            thumbnail: image.thumbnail
          }))}
        />
        {this.bottomBar()}
      </div>
    );
  }
}


import { connect } from 'react-redux'
import {goToEditActivityForm}  from "../../actions/activityForm"
import {goToActivityShow} from '../../actions/activity'

const mapStateToProps = (state, ownProps) => {
  return {
    projectId: state.projectActions.scoped_project_id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEdit(e){
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation();
      dispatch(goToEditActivityForm(this.props.projectId, this.props.activity.id))
    },
    onActivityClick(e) {
      dispatch(goToActivityShow(this.props.projectId, this.props.activity.id))
    }
  }
}

ActivityCard = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActivityCard)
export default ActivityCard
