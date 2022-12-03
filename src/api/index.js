import axios from 'axios';

const url = 'http://localhost:8000';

export const getSamplePoints = () => axios.get(`${url}/getSamplePoints`);
export const getSamplePoint = location =>
  axios.get(`${url}/getSamplePoint/${location}`);
