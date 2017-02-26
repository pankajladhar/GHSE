import React from 'react';
import {expect} from 'chai';
import _ from 'lodash';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import Photo from '../../app/components/Photo';
import { Link } from 'react-router';
import CSSTransitionGroup from 'react-addons-css-transition-group';

describe("<Photo />", () =>{
    const post = {
        "code": "BAcyDyQwcXX",
        "caption": "Lunch #hamont",
        "likes": 56,
        "id": "1161022966406956503",
        "display_src": "12552326_495932673919321_1443393332_n.jpg"
    }

    const comments = {
        "BAhvZrRwcfu":[
            {
                "text":"Totally need to try this.",
                "user": "heavymetaladam"
            }
        ],
        "BAcyDyQwcXX":[
            {
                "text":"Wes. WE should have lunch.",
                "user": "jdaveknox"
            },
            {
                "text":"#adults",
                "user": "jdaveknox"
            }
        ]
    }
    let wrapper;

    const likeBtnHandlerStub = sinon.spy();


    it("should have one figure tag", () =>{
        wrapper = shallow(<Photo post={post} comments={comments} likeBtnHandler={likeBtnHandlerStub}/>)

        expect(wrapper.type()).to.equal('figure');
        expect(wrapper.find('figure')).to.have.length(1);
    });


    it("should render proper UI elements tag under figure", () =>{
        wrapper = shallow(<Photo post={post} comments={comments} likeBtnHandler={likeBtnHandlerStub}/>)


        const div = wrapper.find('figure').childAt(0);
        expect(div).to.have.length(1);
        expect(div.hasClass('grid-photo-warp')).to.equal(true);

        const animationElement = wrapper.find(CSSTransitionGroup);
        expect(animationElement).to.have.length(1);

        const figCaption = wrapper.find("figcaption");
        expect(figCaption).to.have.length(1);
        expect(figCaption.hasClass('some-class')).to.equal(false);
    });

    it("should render image with link in div under figure tag", () =>{
        wrapper = mount(<Photo post={post} comments={comments} likeBtnHandler={likeBtnHandlerStub}/>);
        const div = wrapper.find('figure').childAt(0);

        const anchor = div.childAt(0);
        expect((anchor.getDOMNode().tagName).toLowerCase()).to.equal(('a').toLowerCase());
        expect(anchor.props().to).to.equal(`/view/${post.code}`);

        const imgTag = anchor.childAt(0);
        expect(imgTag.html()).to.equal('<img src="images/12552326_495932673919321_1443393332_n.jpg" alt="Lunch #hamont" class="grid-photo">')
    });

    it("should render caption and control button under figcaption tag", () =>{
        wrapper = shallow(<Photo post={post} comments={comments} likeBtnHandler={likeBtnHandlerStub}/>);
        const figCaption = wrapper.find('figure').childAt(2);
        expect(figCaption.find("p")).to.have.length(1);
        expect(figCaption.find("p").text()).to.equal(post.caption);


        const likebtn = figCaption.find("button");
        expect(likebtn).to.have.length(1);
        expect(_.isFunction(likebtn.props().onClick)).to.equal(true)


        const clickHandlerStub = sinon.spy();
        likebtn.simulate('click', {preventDefault: () => {}});
        expect(likeBtnHandlerStub.calledWith(post)).to.equal(true);
        sinon.assert.calledWith(likeBtnHandlerStub, post);

    });

    it("should render no of comments under link tag", ()=>{
        wrapper = shallow(<Photo post={post} comments={comments} likeBtnHandler={likeBtnHandlerStub}/>);
        const figCaption = wrapper.find('figure').childAt(2);
        const Link = figCaption.find("Link");
        expect(Link).to.have.length(1);
        expect(Link.props().to).to.equals("/view/BAcyDyQwcXX");

        const spancommentcount = Link.find("span.comment-count");
        expect(spancommentcount.text()).to.have.equal("2");
    });



})
