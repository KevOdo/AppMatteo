//import axios from "axios";

const CMS_URI = "//localhost:1337/";

export const POST_IMAGE = data => API_POST("gallery", data);

async function API_POST(url, data) {
    try {
        const response = await axios.post(CMS_URI + url, data);
        return response;
    } catch (error) {
        return error;
    }
}