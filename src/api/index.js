import axios from 'axios';

const url = "http://localhost:8000"

export const getSamplePoints = () => axios.get(`${url}/getSamplePoints`)

