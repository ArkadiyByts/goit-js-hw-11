import axios from 'axios';

export async function getImages(searchValue, page) {
  const params = new URLSearchParams({
    key: '42652436-6a3ee1496dd83b87da18a4fda',
    q: searchValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page,
  });

  try {
    const response = await axios.get(`https://pixabay.com/api/?${params}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
