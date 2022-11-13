const CMS_URI = "//formula3e14.redirectme.net:1337/api/";

const POST_IMAGE = (token, image) => AUTH_POST("upload", token, image);
const GET_TOKEN = code => AUTH_GET("auth/local", code);

async function AUTH_POST(url, token, image) {
    const form = new FormData();
    form.append('files', image)
    try {
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

async function SEND_SERVER() {
    try {
        const response = await axios.post("./", "hello");
        return response;
    } catch (error) {
        return error;
    }
}

const createFile = (bits, name, options) => {
    try {
        // If this fails, we go for Blob
        return new File(bits, name, options);
    } catch (e) {
        // If we're here a new File could not be constructed
        var myBlob = new Blob(bits, options || {});
        myBlob.lastModified = new Date();
        myBlob.name = name;
        return myBlob;
    }
};

function activate(code, destination) {
    const selectedFile = document.getElementById('image').files[0];
    tmp = destination.value + selectedFile.name;

    const image = createFile([selectedFile], tmp, {type: selectedFile.type});

    if(selectedFile.type.includes("image")) {
        GET_TOKEN(code.value).then(response => {
            POST_IMAGE(response.data.jwt, image).then(res => console.log(res))
        })
    } else {
        console.log("NOT AN IMAGE")
        //SEND_SERVER().then(response => console.log("response: " + response));  
    }
}