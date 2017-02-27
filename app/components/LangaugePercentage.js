import React from "react";
import _ from "lodash";

class LangaugePercentage extends React.Component{
    constructor(props) {
        super(props);
    };
    __getPercentage(lines){
        let values = _.values(this.props.langData);
        let total = _.reduce(values, (sum, value) =>{
                return sum + value;
        }, 0);
        return ((lines/total)*100).toFixed(2) + "%";
    };

    render(){
        const { langData } = this.props;
        return(
            <ul>
                { _.map(langData, (per, lang)=>{
                    return <li key={lang}>{lang +" "+ this.__getPercentage(per) }</li>
                })}
            </ul>

        )
    }
};

export default LangaugePercentage;