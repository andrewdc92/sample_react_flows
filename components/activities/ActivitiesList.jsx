import React, { Component } from 'react';
import ActivityCard from './ActivityCard'
import ReactDOM from 'react-dom'
import NavigationHeader from '../../containers/navigation/NavigationHeader.jsx';
import EmptyList from "../../containers/activities/EmptyList"
import ActivityFilters from "../../containers/activities/sideBarParts/ActivityFilters"
import Loader from '../general/Loader'

export default class ActivitiesList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!!this.props.params.projectId){
      this.props.loadProject(this.props.params.projectId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.params.projectId && nextProps.params.projectId != this.props.params.projectId) {
      this.props.loadProject(nextProps.params.projectId)
    }
  }

  renderActivities() {
    return this.props.activities.map((activity) => {
      return (
        <ActivityCard
          activity={activity}
          key={activity.id}
          canEdit={this.props.canEdit || activity.user.id == this.props.currentUser.id}/>
      )
    })
  }

  emptyView(){
    if(this.props.filtersApplied){
      return <EmptyList type={"emptyFilterList"}/>
    }else{
      return <EmptyList />
    }
  }

  showActivities(){
    if(this.props.activities.length == 0 && this.props.isFetching){
      return <Loader />
    }else if(this.props.activities.length == 0){
      return this.emptyView()
    }else{
      return this.renderActivities()
    }
  }

  sideBar(){
    if(this.props.activities.length > 0 || this.props.filtersApplied){
      return(
        <div className="side-bar">
          <ActivityFilters />
        </div>
      )
    } else {
      return null
    }
  }
  render() {
    return (
      <div className="content-wrapper">
        <NavigationHeader />
        <div className="react-container">
          <div className="card-list smaller">
            {this.showActivities()}
          </div>
          {this.sideBar()}
        </div>
      </div>
    );
  }
}
