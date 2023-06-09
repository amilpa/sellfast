export async function UploadImage(formData) {
  const res = await fetch(`${process.env.IMAGEKIT_URL}`, {
    method: 'POST',
    headers: {
      Authorization: process.env.IMAGEKIT_AUTHORIZATION,
    },
    body: formData,
  })
  return res.json()
}