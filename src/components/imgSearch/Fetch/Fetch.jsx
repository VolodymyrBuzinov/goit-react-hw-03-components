// import PropTypes from 'prop-types';


export default function Fetch(name, page) {
    const key = '18688009-3aa6093aef034eb83f835d04d';
    const url = `https://pixabay.com/api/?q=${name}&page=${page}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`;
    return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }
  });
}