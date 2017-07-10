import React, { Component } from 'react';
import {StatusButton} from '../general/button.jsx'
import {capitalize} from '../../helpers/'

import {
  getStatusText,
  getTypeText,
  UPDATE,
  RFI,
  CHANGE_ORDER
} from '../../constants/activities'

export default class StatusButtons extends Component {

  getButton (obj) {
    if (obj.name != "Open") {
      return (
      <div className="status-btn-component" key={obj.name}>
        <StatusButton
          className="resolved-btns"
          type={obj.value}
          name={obj.name}
          title={obj.name}
          onClick={this.props.onClick.bind(this)}
        />
      </div>
      )
    }
  }

  getButtons () {
    if (this.props.activity.status == "open") {
      return (
        this.props.data.map((obj) => (
          this.getButton(obj)
        ))
      )
    }
  }

  render () {
    return(
      <div className="status-btn-container">
        <div>
          <span className="grey-nav-status"> Status:  {getStatusText(this.props.activity)} </span>
        </div>
        {this.getButtons()}
      </div>
    )
  }
}
