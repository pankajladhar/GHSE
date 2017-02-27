'use strict';

import React from "react";
import moment from 'moment';
import * as Constants from "./../helpers/Constants";
import { HttpWrapper } from "./../helpers/HttpWrapper";
import LangaugePercentage from "./LangaugePercentage";

class Repo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            langData : {}
        }
    };

    __getClassName(val){
        return val && val.toLowerCase();
    };

    __getFromattedDate(d){
        return moment(d).format("MMMM Do YYYY, h:mm:ss a")
    }

    componentDidMount(){
        HttpWrapper.get(this.props.repos.languages_url+"?client_id="+Constants.CLIENT_ID+"&client_secret="+Constants.CLIENT_SECRET).then((res)=>{
            this.setState({langData: res});
        });
    }

    render(){
        const {repos} = this.props;
        return(
                <div className="repo">                    
                    <span className="repo__name">
                        <a href={repos.html_url} target="_blank">{repos.name}</a>
                    </span>
                    <p className="repo__description">
                        {repos.description}
                    </p>
                    <div className="repo__otherInfo">
                        <ul>
                            <li className={"repo-language-color " + this.__getClassName(repos.language)}>{repos.language}</li>
                            <li>{repos.forks_count + " Forks"}</li>
                            <li>{repos.watchers + " Watchers"}</li>
                            <li>{repos.stargazers_count + " Stars"}</li>
                        </ul>
                    </div>
                    <div className="repo_lastUpdated">
                        {"Updated on  " + this.__getFromattedDate(repos.pushed_at)}
                    </div>
                    <div className="repo__codePercentage">
                        <LangaugePercentage langData ={this.state.langData}/>
                    </div>
                </div>
        )
    }
};

export default Repo;