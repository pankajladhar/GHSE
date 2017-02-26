import React from "react";
import _ from "lodash";

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : "Username",
            userInput: "",
            hasError : false
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        this.selectBoxChangeHandler = this.selectBoxChangeHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    onClickHandler(e){
        e.preventDefault();
        let txtValue = this.state.userInput;
        let dropDownSelectedValue = this.state.selected;
        !_.isEmpty(txtValue) ? this.props.searchOnClickHandler(txtValue, dropDownSelectedValue) :  this.setState({hasError:true});
             
    }

    selectBoxChangeHandler(e){   
        this.setState({selected : e.target.value});
    };

    onChangeHandler(e){
        var val = e.target.value;
        if(_.isEmpty(val)){
            this.setState({
                hasError:true,
                userInput : ""
            });
        }
        else{
            this.setState({
                userInput : val,
                hasError:false
            });
        }
    }

    render(){
        return(
            <div className="header">
                <div className="logo-container">
                    <h1>GHSE</h1>
                    <div className="tagline">Github Search Engine</div>
                </div>
                <div className="seachOptions">
                   <form action="" onSubmit={this.onClickHandler}>
                        <div className="select-style">
                            <select defaultValue={this.state.selected} onChange={this.selectBoxChangeHandler}>
                                <option value="Username">Username</option>
                                <option value="Repos">Repos</option>
                            </select>
                        </div>
                        <input type="text" 
                                tabIndex="1"
                                className={this.state.hasError ? "error": ""}
                                placeholder="Enter A Github Username"
                                onChange={this.onChangeHandler}
                        />
                        <i tabIndex="2" className="fa fa-search" aria-hidden="true" onClick={this.onClickHandler}></i>
                   </form>
                </div>
                <div className="socialIcons">
                    <ul>
                        <li>
                            <a href="" className="socialIcons__linkedIn">
                                <i className="fa fa-linkedin"></i>
                                <span>LinkedIn</span>
                            </a>
                        </li>
                        <li>
                            <a href=""className="socialIcons__github">
                                <i className="fa fa-github"></i>
                                <span>Github</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header;