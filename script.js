function handleFiles(files) {
  const file = files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const img = new Image();
    img.onload = function () {
      document.getElementById('compression-options').classList.remove('hidden');
      window.originalImage = img;
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function compressImage() {
  const compressionType = document.getElementById('compressionType').value;
  const quality = document.getElementById('quality').value / 100;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = window.originalImage;

  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  let mimeType = compressionType === "lossless" ? "image/png" : "image/jpeg";
  const dataUrl = canvas.toDataURL(mimeType, quality);

  document.getElementById('output-image').src = dataUrl;
  document.getElementById('download-link').href = dataUrl;
  document.getElementById('preview').classList.remove('hidden');
}
