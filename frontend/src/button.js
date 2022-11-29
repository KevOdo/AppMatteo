const CMS_URI = "https://formula3e14.redirectme.net/strapi/api/";

var wp = document.getElementById("wrong_password");
var nf = document.getElementById("no_file");
var fsz = document.getElementById("file_size");
var success_modal = document.getElementById("success_modal");
var loading_modal = document.getElementById("loading_modal");

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
        fsz.textContent = "";
        nf.textContent = "";
        tmp = destination.value + selectedFile.name;
        const image = createFile([selectedFile], tmp, {type: selectedFile.type});

        if(selectedFile.type.includes("image")) {
            GET_TOKEN(code.value).then(response => {
                if(response.status == 400) {
                    wp.textContent = "Password Errata";
                } else if (response.status == 200){
                    wp.textContent = ""
                    loading_modal.style.display = "block";
                    loading_modal.style.display = "flex";
                    POST_IMAGE(response.data.jwt, image).then(res => {
                        if(res.status == 413) {
                            loading_modal.style.display = "none";
                            fsz = "Errore: immagine troppo pesante!";    
                        } else if(res.status == 200) {
                            clearInputs();
                            loading_modal.style.display = "none";
                            success_modal.style.display = "block";
                            success_modal.style.display = "flex";
                        }
                    })
                }
            })
        } else {
            nf.textContent = "Errore: il file che stai provando a caricare non è un'immagine";
        }
    } else {
        nf.textContent = "Seleziona un'immagine";
    }    
}

function clearInputs() {
    var code = document.getElementById("code");
    var image = document.getElementById("image");
    code.value = "";
    image.value = "";
}

window.onclick = function(event) {
    if (event.target == success_modal) {
        success_modal.style.display = "none";
    }
}