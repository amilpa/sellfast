export async function UploadImage(formData) {
  fetch(`${process.env.IMAGEKIT_URL}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.IMAGEKIT_AUTHORIZATION,
    },
    body: formData,
  })
}