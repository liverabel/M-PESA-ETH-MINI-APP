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

function openWebPage() {
  window.open('https://youtube.com', '_blank');
}

function getDocument() {
  console.log('trying to get mini app document');
  try {
    AlipayJSBridge.call(
      'downloadFile',
      {
        url: 'https://wealth-test.sc.com/wm/data/gbl/omf/ms/doc/Document/26f582bcc78c00056e04e1076a681a58.msdoc/?key=277c7034c4553750ca72946ac58565acdcb4077c205711b55d7737590705b5c6',
        // url: 'https://av.sc.com/ke/content/docs/ke-online-mutual-funds-faq.pdf',
      },
      ({ apFilePath }) => {
        AlipayJSBridge.call(
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

// AlipayJSBridge.call('jsAPI', {}, ()=> {}, () =>{})

function makePayBillPayment() {
  try {
    AlipayJSBridge.call(
      'payBill',
      {
        businessID: '1112223',
        billReference: '123456789',
        amount: '30.0',
        currency: 'KES', // currencyCode to be used - only KES supported for now
        reason: 'Electricity bill', // optional field
      },
      (res) => {
        console.log('success', res);
        alert(`paybill, ${JSON.stringify(res)}`);
        // AlipayJSBridge.call
        //   'alert',{ title: 'Success', content: JSON.stringify(res) },
        //   () => {},
        //   () => {}
        // );
        //
      },
      (res) => {
        alert(res);
        console.log(('errror', res));
        AlipayJSBridge.call(
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

function makeTillPayment() {
  alert(`paybill,`);
  try {
    AlipayJSBridge.call(
      'buyGoods',
      {
        tillNumber: '89900',
        amount: '25.0',
        currency: 'KES', // currencyCode to be used - only KES supported for now
        reason: 'Jon Groceries', // optional field
      },
      (res) => {
        alert(`BuyGoods ${JSON.stringify(res)}`);
        // AlipayJSBridge.alert({
        //   content: JSON.stringify(res),
        // });
      },
      (res) => {
        alert(res);
        AlipayJSBridge.call(
          'alert',
          {
            title: 'Fail',
            content: JSON.stringify(res),
          },
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

function openDomainUsingWindow() {
  window.open('https://www.youtube.com/', '_blank');
}

function myOpenURL() {
  const url = encodeURIComponent('https://youtube.com');
  console.log('url being passed', url);
  my.navigateTo({ url: `/pages/domainb/domainb?url=${url}` });
}

function openDomainUsingAlipayJSBridge() {
  try {
    AlipayJSBridge.call('pushWindow', {
      url: 'https://www.youtube.com/',
      param: { closeCurrentWindow: false },
    });
  } catch (error) {
    alert(`error on pushwindow`);
  }
}

/**
 * Gobanga => Risk team
 * Fares => CyberSecurity
 */
