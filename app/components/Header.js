import React from "react";


class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selected : "Username",
            userInput: ""
        };
        this.onClickHandler = this.onClickHandler.bind(this);
        this.selectBoxChangeHandler = this.selectBoxChangeHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    };

    onClickHandler(){
        let txtValue = this.state.userInput;
        let dropDownSelectedValue = this.state.selected;
        this.props.searchOnClickHandler(txtValue, dropDownSelectedValue)
    }

    selectBoxChangeHandler(e){   
        this.setState({selected : e.target.value});
    };

    onChangeHandler(e){
        this.setState({userInput : e.target.value});
    }

    render(){
        return(
            <div className="header">
                <div className="logo-container">
                    <h1>GHSE</h1>
                    <div className="tagline">Github Search Engine</div>
                </div>
                <div className="seachOptions">
                    <div className="select-style">
                        <select defaultValue={this.state.selected} onChange={this.selectBoxChangeHandler}>
                            <option value="Username">Username</option>
                            <option value="Repos">Repos</option>
                        </select>
                    </div>
                    <input type="text" 
                            className="" 
                            placeholder="Enter A Github Username"
                            onChange={this.onChangeHandler}
                    />
                    <i className="fa fa-search" aria-hidden="true" onClick={this.onClickHandler}></i>
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