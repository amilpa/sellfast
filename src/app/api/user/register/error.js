
export default function Error({ error }) {
  return (
    <div>
      <h1>Internal server error occured.{error.message}</h1>
    </div>
  )
}