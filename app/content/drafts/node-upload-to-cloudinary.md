```js
const cloudinary = require('cloudinary').v2

cloud_image = cloudinary.uploader.upload(
	image,
	{
		secure: true,
		public_id: image_path
	},
	function() {
	}
);
