import axios from 'axios';

export const getImages = async (searchValue, page) => {
    const { data } = await axios.get('https://pixabay.com/api/?', {
        params: {
            key: '40573287-00ff0bf276edafd38916e1984',
            q: searchValue,
            page: page ?? 1,
            image_type: 'photo',
            per_page: 12,
            orientation: 'horizontal'
        }
    });
    return data;
}
