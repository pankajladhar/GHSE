import React from 'react';
import _ from 'lodash';

import * as Constants from "./../helpers/Constants"
import { HttpWrapper } from './../helpers/HttpWrapper';
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
            isLoading:false
        }
    };

    searchOnClickHandler(txtValue, dropDownSelectedValue) {
        // console.log(dropDownSelectedValue);
        if (dropDownSelectedValue == "Username") {
            this.setState({isLoading : true});
            let userUrl = "https://api.github.com/users/" + txtValue + "?client_id=60b9f23dedffbdfc476c&client_secret=d1c186c6373f96571c0bfcf76b84e4dc6fd0c15a";
            HttpWrapper.get(userUrl).
                then((res) => {
                    this.setState({ userInfo: res });
                    let repoUrl = "https://api.github.com/users/" + txtValue + "/repos?client_id=60b9f23dedffbdfc476c&client_secret=d1c186c6373f96571c0bfcf76b84e4dc6fd0c15a";
                    HttpWrapper.get(repoUrl).
                        then((res) => {
                            if(res.length > 0) {
                                this.setState({ repos: res });
                            }
                            else{
                                document.querySelector('.placeholder').innerHTML = `No Repos found for <strong>${txtValue}</strong>`;
                            }
                            this.setState({isLoading : false})
                        })
                        .catch((error) => {
                            this.setState({ repos: "" })
                            this.setState({isLoading : false});
                            console.log("second inside error block", error);
                        });

                })
                .catch((error) => {
                    this.setState({ userInfo: "" });
                    document.querySelector('.placeholder').innerHTML = `<strong>${txtValue}</strong> does not exit on GitHub`;
                    this.setState({isLoading : false});
                    console.log("first inside error block", error);
                });
        }
    }
    // componentDidMount() {
    //     window.addEventListener('scroll', this.handleScroll);
    // }

    // componentWillUnmount() {
    //     window.removeEventListener('scroll', this.handleScroll);
    // }

    // handleScroll(event) {
    //     let scrollTop = event.srcElement.body.scrollTop,
    //         itemTranslate = Math.min(0, scrollTop/3 - 60);
    //         console.log(itemTranslate);
    // }
    render() {
        const { repos, userInfo } = this.state;
        return ( 
        <div>
            <Header searchOnClickHandler = { this.searchOnClickHandler }/> 
            <div className = "wrapper">
                { !_.isEmpty(userInfo) ? 
                    <UserInfo userInfo = { this.state.userInfo } /> 
                    : ""
                }

                {!_.isEmpty(repos) ? 
                <div className = "content">
                    <h4> Repositories </h4> 
                    <div className = "repositories"> 
                        {
                            repos.map((repo, i) => {
                                return <Repo key = {i} repos = {repo} />
                            })
                        } 
                    </div> 
                </div> : 
                <div className="content placeholder">
                    Please Enter Search String
                </div>
                }
            </div>
            {this.state.isLoading ? <Loader /> :" "}            
        </div>
        )
    }

}

export default App;
