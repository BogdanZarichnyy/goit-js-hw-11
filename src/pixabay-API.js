'use strict';

import axios from 'axios';
// console.dir(axios);

export class Pixabay {
    // https://pixabay.com/api/
    #URL = 'https://pixabay.com';
    // Your API key: 29947989-7672aa4ff3bb20ad1176bb4f3
    #MY_API_KEY = '29947989-7672aa4ff3bb20ad1176bb4f3';

    constructor() {
        this.page = null;
        this.per_page = null;
        this.searchQuery = '';
    }

    getContentByInputData() {

        const searchParameters = {
            key: this.#MY_API_KEY,      //- твій унікальний ключ доступу до API.
            q: this.searchQuery,        //- термін для пошуку. Те, що буде вводити користувач.
            image_type: 'photo',        //- тип зображення. На потрібні тільки фотографії, тому постав значення photo.
            orientation: 'horizontal',  //- орієнтація фотографії. Постав значення horizontal.
            safesearch: true,
                
            page: this.page,
            per_page: this.per_page,
        };

        return axios.get(`${this.#URL}/api`, { params: searchParameters });
    }
}