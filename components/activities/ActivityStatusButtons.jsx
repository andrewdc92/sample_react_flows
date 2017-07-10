import React, { Component } from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';

import {
  formatDate,
  capitalize,
  showImage,
  formatCurrency,
  priceIncreaseDecrease,
  activeTimeIncreaseDecrease
} from '../../helpers/'
import StatusButtons from './StatusButtons'

export default class ActivityStatusButtonRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null
    }
  }

  onClick(status){
    return this.popUpOnChange()
  }

  popUpOnChange(status) {
    let popUpNaming = this.getPopUpNamingFunction()
    return (status) => {
      let naming_obj = popUpNaming(status)
      const getAlert = () => (
        <SweetAlert
          showCancel
          allowEscape
          allowOutsideClick
          confirmBtnText="OK"
          confirmBtnBsStyle="danger"
          cancelBtnBsStyle="default"
          title= {naming_obj.title}
          onConfirm={() => {
            this.props.onStatusChange(status)
            this.hideAlert()
          }}
          onCancel={() => this.hideAlert()} >
          <a className="close-form-btn" onClick={() => this.hideAlert()}>
            <img src="/assets/cancel-gray.png" />
          </a>
          {naming_obj.text}
        </SweetAlert>
      )
      
      this.setState({
        alert: getAlert()
      })
    }
  }

  hideAlert() {
      this.setState({
      alert: null
    });
  }

  getPopUpNamingFunction() {
    let type = this.props.activity.activity_type
    switch (type) {
      case "rfi":
        return  this.rfiPopup.bind(this)
      case "change_order":
        return this.changeOrderPopUp.bind(this)
      default:
        return null
    }
  }

  changeOrderPopUp(status) {
    switch (status) {
      case "solved":
        let price = this.props.activity.price
        let data = priceIncreaseDecrease(price)
        return {
          title: 'Approve Change Order',
          text:`This change order will ${data.direction.toLowerCase()} `+
              `the project budget by $${formatCurrency(Math.abs(price))}`+
              `${this.getScheduleChangeText(this.props.activity)}` +
              `. Are you sure you want to approve this order?`
        }

      case "cancelled":
       return {
         title: 'Decline Change Order',
         text:"Are you sure you want to decline this change order?"
       }
      default:
        return null
    }
  }

  getScheduleChangeText(activity) {
    let string = ""
    if (activity.time_change_type == 'days' && activity.time_change != 0) {
      let direction = activeTimeIncreaseDecrease(activity.time_change)
      let days = Math.abs(activity.time_change)
      string = ` and ${direction.toLowerCase()} the completion date by ${days} day`
      if (days > 1) {
        string += `s`
      }
    } else if (activity.time_change_type == 'date' && activity.date_change != "") {
      string = ` and change the completion date to ${formatDate(activity.date_change)}`
    }
    return string
  }

  rfiPopup(status) {
    switch (status) {
      case "solved":
      case "cancelled":
        let action = (status == 'cancelled') ? 'Cancel' : 'Resolve'
        return {
          title: `${action} RFI`,
          text:`Are you sure you want to ${action} this RFI?`
        }
      default:
        return null
    }
  }

  getStatus () {
    if (this.props.statusChanges.length != 0) {
      return (
        <div className="buttonbar-styles">
          <div className="buttonrow-styles">
            <StatusButtons
              key="statusButtonRow"
              data={this.props.buttonNames}
              activity={this.props.activity}
              activeStates={{[this.props.activity_type]: true}}
              type="status"
              onClick={this.onClick(this.props.activity.status)}
            />
          </div>
          <div className="modalTarget">{this.state.alert}</div>

        </div>
      )
    } else {
      return null
    }
  }

  render () {
    return this.getStatus()
  }

}
