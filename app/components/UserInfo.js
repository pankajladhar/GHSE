'use strict';
import React from "react";
import _ from "lodash"


class UserInfo extends React.Component{
    constructor(props){
        super(props);
    };
    render(){
        const {userInfo} = this.props
        return(
            <div className="aside">
                <div className="container">
                    <div className="avatarContainer">
                        <img className="profile-img" src={userInfo.avatar_url} />
                        <a href={userInfo.html_url} className="viewProfile">View Profile</a>
                        <div className="name">{userInfo.name}</div>
                        <div className="userName">{userInfo.login}</div>
                    </div>
                    <div className="otherInfo">
                        {userInfo.company ?  <div className="compay">
                            <i className="fa fa-building-o"></i> {userInfo.company}
                        </div> : ""}

                        {userInfo.location ? <div className="location">
                            <i className="fa fa-map-marker"></i> {userInfo.location}
                        </div> : ""}

                        {userInfo.email ? <div className="mail">
                            <i className="fa fa-envelope"></i>
                            <a href={`mailto:${userInfo.email}`}>{userInfo.email}</a>
                        </div>: ""}
                    </div>
                    <div className="otherInfo">
                        <ul>
                            <li><span className="number">{userInfo.public_repos}</span> Public Repo</li>
                            <li><span className="number">{userInfo.public_gists }</span> Public Gists</li>
                            <li><span className="number">{userInfo.followers }</span> Followers</li>
                            <li><span className="number">{userInfo.following }</span> Following</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};

export default UserInfo;