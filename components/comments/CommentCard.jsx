import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import {formatDate} from '../../helpers/'
import CommentImgCarousel from './CommentImages'
import {getTypeText, getStatusText} from '../../constants/activities'


export default class CommentCard extends Component {
    constructor(props) {
    super(props)
  }


  render() {

    if (this.props.comment.signature !== null ) {
      return (
        <div className='comment-cardz-status'>
          <div className="status-text-wrapper">
            <div className="comment-username-status">{this.props.comment.user.name}</div>
            <div className="comment-status-update">
              {this.props.comment.user.name} {getStatusText(this.props.activity)} This {getTypeText(this.props.activityType)}
            </div>
          </div>
          <img
            className="signature-render"
            src={this.props.comment.signature}
            style={{height: "60px", width: "400px"}}/>
          <img
            className="signature-status-confirm"
            src="/assets/confirm.png" />
            <div className="last-update">
              {`Last updated: ${formatDate(this.props.comment.updated_at)}`}
            </div>
        </div>
      )
    }
     else if (this.props.comment.status_change == true && this.props.comment.status_type == "solved" ) {
      return (
        <div className='comment-cardz-status'>
          <div className="status-text-wrapper">
            <div className="comment-username-status">{this.props.comment.user.name}</div>
            <div className="comment-status-update">
              {this.props.comment.user.name}  {getStatusText(this.props.activity)} This {getTypeText(this.props.activityType)}
            </div>
          </div>
          <img className="status-confirm" src="/assets/confirm.png" />
          <div className="last-update-status">
            {`Last updated: ${formatDate(this.props.comment.updated_at)}`}
          </div>
        </div>
      )
  }
  else if (this.props.comment.status_change == true && this.props.comment.status_type == "cancelled" ) {
   return (
     <div className='comment-cardz-status'>
       <div className="status-text-wrapper">
         <div className="comment-username-status">{this.props.comment.user.name}</div>
         <div className="comment-status-update">
           {this.props.comment.user.name} {getStatusText(this.props.activity)} This {getTypeText(this.props.activityType)}
         </div>
       </div>
       <img className="status-confirm" src="/assets/revoke-grey.png" />
       <div className="last-update-status">
         {`Last updated: ${formatDate(this.props.comment.updated_at)}`}
       </div>
     </div>
   )
}

else if (this.props.comment.images.length > 0) {
  let images = this.props.comment.images

  return (
    <div className='comment-cardz-status'>
      <div className="status-text-wrapper">
        <div className="comment-username-status">{this.props.comment.user.name}</div>
        <div className="comment-status-update">{this.props.comment.body} </div>
      </div>
      <img className="status-confirm" src="/assets/user.png" />
        <CommentImgCarousel
          images={images.map((image) =>  ({
            src: image.url,
            thumbnail: image.thumbnail
          }))}

        />
      <div className="last-update-status">
        {`Last updated: ${formatDate(this.props.comment.updated_at)}`}
      </div>
    </div>
  )
}
  else {
    return (
      <div className='comment-cardz-status'>
        <div className="status-text-wrapper">
          <div className="comment-username-status">{this.props.comment.user.name}</div>
          <div className="comment-status-update">{this.props.comment.body} </div>
        </div>
        <img className="status-confirm" src="/assets/user.png" />
        <div className='comment-cardz-status'>
        </div>
        <div className="last-update-status">
          {`Last updated: ${formatDate(this.props.comment.updated_at)}`}
        </div>
      </div>
      )
    }
  }
}
