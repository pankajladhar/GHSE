import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from "react-router";

import Brand from '../../app/components/Brand';

describe("<Brand />", () =>{
    let wrapper;

    it('it should contain one <Link /> component', () =>{
        wrapper = shallow(<Brand/>);
        expect(wrapper.find(Link)).to.have.length(1);
    })

    it('should correctly display the anchor tag wrapped in h1 tag', () => {
        wrapper = shallow(<Brand/>);
        expect(wrapper.type()).to.equal('h1');
        expect(wrapper.hasClass('brand')).to.equal(true);


        wrapper = mount(<Brand/>);
        const anchor = wrapper.childAt(0);
        expect(anchor.text()).to.equal("Reactgram");
        expect(anchor.props().to).to.equal("/");

        const domNode = anchor.getDOMNode();
        expect((domNode.tagName).toLowerCase()).to.equal(('a').toLowerCase());

    });

});


