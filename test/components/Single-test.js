import React from 'react';
import {expect} from 'chai';
import _ from 'lodash';
import sinon from 'sinon';
import {shallow, mount, render} from 'enzyme';
import Single from '../../app/components/Single';
import Photo from '../../app/components/Photo';
import Comment from '../../app/components/Comment';

describe("<Single />", () => {


    const defaultProps = {
        params: {
            postId: "BAcyDyQwcXX"
        },
        posts: [
            {
                "code": "BAcyDyQwcXX",
                "caption": "Lunch #hamont",
                "likes": 56,
                "id": "1161022966406956503",
                "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
            },
            {
                "code": "BAhvZrRwcfu",
                "caption": "Lunch #hamont",
                "likes": 56,
                "id": "1161022966406956503",
                "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
            }
        ],
        handlers: {
            removeComment: () => { },
            addComment: () => { }
        },
        comments: {
            "BAhvZrRwcfu": [
                {
                    "text": "Totally need to try this.",
                    "user": "heavymetaladam"
                }
            ],
            "BAcyDyQwcXX": [
                {
                    "text": "Wes. WE should have lunch.",
                    "user": "jdaveknox"
                },
                {
                    "text": "#adults",
                    "user": "jdaveknox"
                }
            ]
        }

    }


    let wrapper;


    beforeEach(() => {
        wrapper = shallow(<Single {...defaultProps} />)
    })

    it("should have one div containing  Photo and Comment component", ()=> {
        let div = wrapper.find("div");
        expect(div.hasClass("single-photo")).to.be.equal(true);
        expect(div.find(Photo)).to.have.length(1);
        expect(div.find(Comment)).to.have.length(1);
    });

    it("should pass correct props to Photo Component", ()=> {
        let {posts, comments} = defaultProps;
        let photo = wrapper.find("div").find(Photo);
        expect(photo.props().post).to.be.equal(posts[0]);
        expect(photo.props().comments).to.be.equal(comments);
    });

    it("should pass correct props to Comment Component", ()=> {
        let {params , comments} = defaultProps;
        let comment = wrapper.find("div").find(Comment);
        expect(comment.props().userComments).to.be.equal(comments[params.postId]);
        expect(_.isFunction(comment.props().removeComment)).to.be.equal(true);
        expect(_.isFunction(comment.props().addComment)).to.be.equal(true);
    })
});

