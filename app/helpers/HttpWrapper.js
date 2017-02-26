'use strict';

export const HttpWrapper ={
    get : (url)=>{
        return fetch(url,{
            method : "GET",
            mode: 'cors',
            Accept: 'application/json' 
        }).then((response)=>{
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        });
    }
};  