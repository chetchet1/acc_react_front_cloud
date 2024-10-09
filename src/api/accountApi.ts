import axios from 'axios';

export default axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}`,
    headers: {
        'Content-Type': 'application/json'
    }
});
