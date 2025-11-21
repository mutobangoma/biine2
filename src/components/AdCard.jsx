import { Link } from 'react-router-dom'
import { useState } from 'react'
export default function AdCard({ ad }){
  const [showPhone,setShowPhone]=useState(false)
  const img = (ad.imageUrls && ad.imageUrls[0]) || '/placeholder.png'
  return (
    <div className="bg-white shadow rounded overflow-hidden">
      <div className="h-48 w-full"><img src={img} className="object-cover w-full h-48" alt={ad.title}/></div>
      <div className="p-3">
        <h3 className="font-semibold">{ad.title}</h3>
        <p className="text-sm text-gray-600">ZMK {ad.price}</p>
        <div className="mt-3 flex items-center justify-between">
          <Link to={`/ad/${ad.id}`} className="text-sm text-blue-600">View</Link>
          <button onClick={()=>setShowPhone(!showPhone)} className="text-sm border px-2 py-1 rounded">Call</button>
        </div>
        {showPhone && <div className="mt-2 text-sm">{ad.phone}</div>}
      </div>
    </div>
  )
}
