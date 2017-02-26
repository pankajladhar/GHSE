import React from "react";

class Loader extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="loading-container">
                <div className="opacity"></div>
                <div className="loader">
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                    <div className="loading-bar"></div>
                </div>
            </div>
        )
    }
};

export default Loader;