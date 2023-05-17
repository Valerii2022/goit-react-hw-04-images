import axios from 'axios';

export class PixabayAPI {
  #API_KEY = '34628461-4bda2ae404146a46c3fd3a186';
  #BASE_API = 'https://pixabay.com/api/';

  baseSearchParams = {
    key: this.#API_KEY,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  async fetchPhotos(query, page) {
    try {
      return await axios.get(`${this.#BASE_API}`, {
        params: {
          q: query,
          page: page,
          ...this.baseSearchParams,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
