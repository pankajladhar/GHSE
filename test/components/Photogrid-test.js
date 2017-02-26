import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import Photo from '../../app/components/Photo';
import Photogrid from '../../app/components/Photogrid';


describe("<Photogrid />", () => {
    const posts = [
        {
            "code": "BAcyDyQwcXX",
            "caption": "Lunch #hamont",
            "likes": 56,
            "id": "1161022966406956503",
            "display_src": "https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/e35/12552326_495932673919321_1443393332_n.jpg"
        },
        {
            "code": "BAcJeJrQca9",
            "caption": "Snow! ⛄️🌨❄️ #lifewithsnickers",
            "likes": 59,
            "id": "1160844458347054781",
            "display_src": "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12407344_1283694208323785_735653395_n.jpg"
        }
    ];

    const handlers = [];

    it("should contain same number of <Photo /> component as number of photo", () => {
        let wrapper = shallow(<Photogrid posts={posts} handlers={handlers}/>);
        expect(wrapper.find(Photo)).to.have.length(posts.length);
    })
})
