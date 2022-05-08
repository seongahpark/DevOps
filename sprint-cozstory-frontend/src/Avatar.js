export default function Avatar({ name, picture }) {
  return (
    <div className="flex items-center">
      <img src={picture} className="w-8 h-8 rounded-full mr-2" alt={name} />
      <div className="text-base text-gray-600 font-bold">{name}</div>
    </div>
  )
}
