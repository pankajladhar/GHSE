'use strict';

import React from "react";

class Repo extends React.Component{
    constructor(props){
        super(props);
    };

    __getClassName(val){
        return val && val.toLowerCase();
    };

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
                    <div className="repo__language">
                        <ul>
                            <li className={"repo-language-color " + this.__getClassName(repos.language)}>{repos.language}</li>
                        </ul>
                    </div>
                    <span className="repo_lastUpdated">
                        {repos.pushed_at}
                        {/*Updated 11 days ago*/}
                    </span>
                </div>
        )
    }
};

export default Repo;