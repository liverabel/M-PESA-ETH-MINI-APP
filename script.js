var video = document.querySelector('#videoElement');
var stopVideo = document.querySelector('#stop');
var canvas, ctx;

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log('Something went wrong!');
    });
}

stopVideo.addEventListener('click', stop, false);

function stop(e) {
  var stream = video.srcObject;
  var tracks = stream.getTracks();

  for (var i = 0; i < tracks.length; i++) {
    var track = tracks[i];
    track.stop();
  }

  video.srcObject = null;
}

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
}

function snapshot() {
  // Draws current image from the video element into the canvas
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function getDocument() {
  console.log('trying to get mini app document');
  try {
    my.call(
      'downloadFile',
      {
        url: 'https://wealth-test.sc.com/wm/data/gbl/omf/ms/doc/Document/26f582bcc78c00056e04e1076a681a58.msdoc/?key=277c7034c4553750ca72946ac58565acdcb4077c205711b55d7737590705b5c6',
        // url: 'https://av.sc.com/ke/content/docs/ke-online-mutual-funds-faq.pdf',
      },
      ({ apFilePath }) => {
        my.call(
          'openDocument',
          {
            filePath: apFilePath,
            fileType: 'pdf',
          },
          ({ res }) => {
            console.log('res', res);
          }
        );
      }
    );
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

// my.call('jsAPI', {}, ()=> {}, () =>{})

function makePayWithMPESA() {
  try {
    my.call(
      'payWithMpesa',
      {
        businessID: '6060',
        billReference: 'Test Payment',  // optional field
        amount: '30.0',
        currency: 'ETB', // currencyCode to be used - only ETB supported
        reason: 'Buy Electronics', // optional field
      },
      (res) => {
        console.log('success', res);
        alert(`payWithMpesa, ${JSON.stringify(res)}`);
        // my.call
        //   'alert',{ title: 'Success', content: JSON.stringify(res) },
        //   () => {},
        //   () => {}
        // );
        //
      },
      (res) => {
        alert(res);
        console.log(('errror', res));
        my.call(
          'alert',
          { title: 'Fail', content: JSON.stringify(res) },
          () => {},
          () => {}
        );
      }
    );
  } catch (error) {
    console.log('error', error);
    alert(error);
  }
}

function singleSignOn() {
  my.call("userScopes", {
    scopes: [
      "USER_NAME",
      "USER_LNAME",
      "USER_MNAME",
      "USER_DOB",
      "USER_ID",
      "USER_IDNO",
      "USER_MOBILE",
    ],
    success: (res) => {
      console.log("Login successful:", res);
      try {
        this.setData({
          permissions: res,
        });
        my.call('hideLoading');
        my.call('alert', {
          title: "Login Successful",
          content: "You have successfully logged in.",
          buttonText: "okay",
        });
      } catch (error) {
        console.error("Error handling success callback:", error);
      }
    },
    fail: (error) => {
      console.error("Login failed:", error);
      try {
        my.call('hideLoading');
        my.call('alert', {
          title: "Error",
          content: "Login failed. Please try again.",
          buttonText: "okay",
        });
      } catch (error) {
        console.error("Error handling fail callback:", error);
      }
    }
  });
}
