import React from 'react';
import _ from 'lodash';

import * as Constants from "./../helpers/Constants"
import {HttpWrapper} from './../helpers/HttpWrapper';
import Header from "./Header";
import Loader from "./Loader";
import UserInfo from "./UserInfo";
import Repo from "./Repo"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.searchOnClickHandler = this.searchOnClickHandler.bind(this);
        this.state = {
            repos: [],
            userInfo: {},
            isLoading: false,
            repositories: [],
            showWrapperOne: true,
            showWrapperTwo: false,
        }
    };

    searchOnClickHandler(txtValue, dropDownSelectedValue) {
        if (dropDownSelectedValue == "Username") {
            this.setState({
                isLoading: true,
                showWrapperOne: true,
                showWrapperTwo: false,
            });
            let userUrl = Constants.USER_URL.replace("{userName}", txtValue);
            HttpWrapper.get(userUrl).then((res) => {
                this.setState({userInfo: res});
                let repoUrl = Constants.REPO_URL.replace("{userName}", txtValue);
                HttpWrapper.get(repoUrl).then((res) => {
                    if (res.length > 0) {
                        this.setState({repos: res});
                    }
                    else {
                        document.querySelector('.placeholder').innerHTML = `No Repos found for <strong>${txtValue}</strong>`;
                    }
                    this.setState({isLoading: false})
                })
                    .catch((error) => {
                        this.setState({repos: ""})
                        this.setState({isLoading: false});
                        console.log("second inside error block", error);
                    });

            })
                .catch((error) => {
                    this.setState({userInfo: ""});
                    document.querySelector('.placeholder').innerHTML = `<strong>${txtValue}</strong> does not exit on GitHub`;
                    this.setState({isLoading: false});
                    console.log("first inside error block", error);
                });
        }
        else {
            this.setState({
                isLoading: true,
                showWrapperOne: false,
                showWrapperTwo: true,
            });
            let repositoriesUrl = Constants.REPOSITORIES_URL.replace("{query}", txtValue);
            HttpWrapper.get(repositoriesUrl).then((res)=> {
                this.setState({
                    repositories: res.items
                });
                this.setState({isLoading: false})
            })
        }
    }

    __renderLangaugeCountInRepo(repositories){

        let repos =_.groupBy(
             _.map(repositories, (repo)=>{
                return _.pick(repo,"language")
             }), (l)=>{
            return l.language
        })
        
         return _.map(repos, (value, key)=>{
             return (
                <li key={key}>{key}{value.length}</li>
            )
        });
        
    }

    render() {
        const {repos, userInfo, repositories, showWrapperOne, showWrapperTwo} = this.state;
        return (
            <div>
                <Header searchOnClickHandler={ this.searchOnClickHandler }/>
                {showWrapperOne ? <div className="wrapper">
                    { !_.isEmpty(userInfo) ?
                        <UserInfo userInfo={ this.state.userInfo }/>
                        : ""
                    }

                    {!_.isEmpty(repos) ?
                        <div className="content">
                            <h4> Repositories </h4>
                            <div className="repositories">
                                {
                                    repos.map((repo, i) => {
                                        return <Repo key={i} repos={repo}/>
                                    })
                                }
                            </div>
                        </div> : 
                        <div className="content placeholder">
                            Please Enter Search String
                        </div>
                    }
                </div>: null}
                
                {showWrapperTwo ? <div className="wrapper repositories-wrapper">
                    <div className="aside">
                        <div className="container">
                            <h4>Languages</h4>
                            <ul>
                               { this.__renderLangaugeCountInRepo(repositories)}
                            </ul>
                        </div>
                    </div>
                    {!_.isEmpty(repositories) ?
                        <div className="content">
                            <h4> Repositories </h4>
                            <div className="repositories">
                                {
                                    repositories.map((repo, i) => {
                                        return (
                                            <div className="repository" key={i}>
                                                <div className="repository__container">
                                                    <img src={repo.owner.avatar_url} alt=""/>
                                                </div>
                                                <div className="repository__content">
                                                    <Repo repos={repo}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> :
                        <div className="content placeholder">
                            Please Enter Search String
                        </div>
                    }
                </div>:null}
                {this.state.isLoading ? <Loader /> : " "}
            </div>
        )
    }

}

export default App;
