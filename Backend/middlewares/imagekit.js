var ImageKit = require("imagekit");
exports.initimagekit = function(){
    var imagekit = new ImageKit({
        publicKey: process.env.IMGPUBLIC_KEY,
        privateKey: process.env.IMGPRIVATE_KEY,
        urlEndpoint: process.env.IMGENDPOINT_URL
      });

      return imagekit;
}

