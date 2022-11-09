const CMS_URI = "//192.168.0.18:1337/api/";

const POST_IMAGE = (token, destination) => AUTH_POST("upload/" + destination, token);
const GET_TOKEN = code => AUTH_GET("auth/local", code);

async function AUTH_POST(url, token,) {
    const form = new FormData();
    const selectedFile = document.getElementById('image').files[0];
    console.log(selectedFile.type)
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

function activate(code, destination) {
    const selectedFile = document.getElementById('image').files[0];
    if(selectedFile.type.includes("image")) {
        GET_TOKEN(code.value).then(response => {
            console.log(destination.value)
            POST_IMAGE(response.data.jwt, destination.value).then(res => console.log(res))
        })
    } else {
        console.log("NOT AN IMAGE")
    }
}