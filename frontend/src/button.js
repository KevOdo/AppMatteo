const CMS_URI = "//localhost:1337/api/";

const POST_IMAGE = data => API_POST("upload", data);
const GET_IMAGE = () => API_GET("galleries")

async function API_POST(url, data) {
    const form = new FormData();
    const selectedFile = document.getElementById('image').files[0];
    form.append('files', selectedFile)
    try {
        console.log(form)
        const response = await axios.post(CMS_URI + url, form);
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
    console.log("CODE: " + code.value);
    //POST_IMAGE(image).then(response => console.log(response));
}