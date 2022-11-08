const CMS_URI = "//localhost:1337/api/";

const POST_IMAGE = (token) => AUTH_POST("upload", token);
const GET_TOKEN = code => AUTH_GET("auth/local", code);

async function AUTH_POST(url, token) {
    const form = new FormData();
    const selectedFile = document.getElementById('image').files[0];
    form.append('files', selectedFile)
    try {
        console.log(form)
        const response = await axios.post(CMS_URI + url, form, {
            headers: {
                Authorization:`Bearer ${token}`
        }});
        return response;
    } catch (error) {
        return error;
    }
}

async function AUTH_GET(url, code) {
    const form = {
        identifier: "mat@strapi.io",
        password: code
    }
    try {
        const response = await axios.post(CMS_URI + url, form);
        return response;
    } catch (error) {
        return error;
    }
}

function activate(code) {
    console.log(code.value)
    GET_TOKEN(code.value).then(response => {
        POST_IMAGE(response.data.jwt).then(res => console.log(res))
    })
}