'use strict';

import React from "react";
import moment from 'moment';

class Repo extends React.Component{
    constructor(props){
        super(props);
    };

    __getClassName(val){
        return val && val.toLowerCase();
    };

    __getFromattedDate(d){
        return moment(d).format("MMMM Do YYYY, h:mm:ss a")
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
                </div>
        )
    }
};

export default Repo;