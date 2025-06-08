import { useParams } from 'react-router-dom'

function CamperDetails() {
  const { id } = useParams()
  return (
    <div>
      <h2>Camper Details {id}</h2>
      <p>More details coming soon.</p>
    </div>
  )
}

export default CamperDetails
