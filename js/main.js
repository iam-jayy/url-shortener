let UrlInput = document.getElementById('UrlInput')
var text = document.getElementById("shortUrl");
var errortxt = document.getElementById("errortxt");
var msg = document.getElementById("msg");


chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
    var url = tabs[0].url;
    var apiurl = `https://is.gd/create.php?format=json&url=${url}`;

    document.getElementById("CopyBtn").disabled = true;

    fetch(apiurl)
        .then((res) => res.json())
        .then((data) => {
            if (data.shorturl) {
                text.innerText = data.shorturl;
                document.getElementById("CopyBtn").disabled = false;
            } else {
                errortxt.innerText = data.errormessage;
                document.getElementById("CopyBtn").disabled = true;
            }
        }).catch(error => {
            errortxt.innerText = "Something Went Wrong";
            console.log(error);
            document.getElementById("CopyBtn").disabled = true;
        });


    document.getElementById('CopyBtn').addEventListener('click', function () {

        const str = document.getElementById('shortUrl').innerText
        const el = document.createElement('textarea')

        el.value = str
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
        msg.innerText = "Short URL Copied";

        setTimeout(() => {
            msg.innerText = "";
        }, 2000);

    });

    document.getElementById('CreateBtn').addEventListener('click', function () {
        var InputUrl = UrlInput.value;
        var apiurl = `https://is.gd/create.php?format=json&url=${InputUrl}`;

        document.getElementById("CopyBtn").disabled = true;
        fetch(apiurl)
            .then((res) => res.json())
            .then((data) => {
                if (data.shorturl) {
                    text.innerText = data.shorturl;
                    document.getElementById("CopyBtn").disabled = false;
                    msg.innerText = "Short URL Generated";
                    console.log(data.shorturl);

                    // Removing Msg After Some Seconds
                    setTimeout(() => {
                        msg.innerText = "";
                    }, 2500);

                } else {
                    errortxt.innerText = data.errormessage;
                    document.getElementById("CopyBtn").disabled = true;
                }
            }).catch(error => {
                errortxt.innerText = "Something Went Wrong";
                console.log(error);
                document.getElementById("CopyBtn").disabled = true;
            });

        setTimeout(() => {
            errortxt.innerText = "";
        }, 2500);

    });

});


/*
// https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Jay&download=1
// Generate QR code
function setQrcode(url) {
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: url,
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}
*/