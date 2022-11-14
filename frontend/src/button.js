const CMS_URI = "//formula3e14.redirectme.net:1337/api/";

var wp = document.getElementById("wrong_password");
var nf = document.getElementById("no_file");
var modal = document.getElementById("success_modal");

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
        return error.response;
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
        return error.response;
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

    if(selectedFile) {
        nf.textContent = "";
        tmp = destination.value + selectedFile.name;
        const image = createFile([selectedFile], tmp, {type: selectedFile.type});

        if(selectedFile.type.includes("image")) {
            GET_TOKEN(code.value).then(response => {
                if(response.status == 400) {
                    wp.textContent = "Password Errata"
                } else {
                    wp.textContent = ""
                    POST_IMAGE(response.data.jwt, image).then(res => {
                        console.log(res.status)
                        if(res.status == 200) {
                            clearInputs();
                            modal.style.display = "block"
                            modal.style.display = "flex"
                        }
                    })
                }
            })
        } else {
            console.log("NOT AN IMAGE")
            nf.textContent = "Seleziona un'immagine"
        }
    } else {
        nf.textContent = "Seleziona un'immagine"
    }    
}

function clearInputs() {
    var code = document.getElementById("code");
    var image = document.getElementById("image");
    code.value = "";
    image.value = "";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none"
    }
}