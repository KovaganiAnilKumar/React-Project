import axios from "axios";

export const getProducts = async () => {
    try{
        const response = await axios.get('http://localhost:8081/api/v1/getProducts')
        console.log('API Response:', response.data);
        return response.data;
    }
    catch(error)
    {   console.log(error)
        return [];
    }
};