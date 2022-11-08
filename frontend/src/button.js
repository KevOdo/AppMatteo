const CMS_URI = "//localhost:1337/api/";

const POST_IMAGE = data => API_POST("gallery", data);
const GET_IMAGE = () => API_GET("gallery")

async function API_POST(url, data) {
    try {
        const response = await axios.post(CMS_URI + url, data);
        return response;
    } catch (error) {
        return error;
    }
}

async function API_GET(url) {
    try {
        const response = await axios.get(CMS_URI + url);
        return response;
    } catch (error) {
        return error;
    }
}

function activate(code, image) { 
    console.log("ACTIVATE");
    console.log(code.value);
    console.log(image.value);
    res = GET_IMAGE("gallery");
    //res = POST_IMAGE("gallery", image.value);
    console.log(res);
}