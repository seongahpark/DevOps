export default function ErrorPage() {
  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="flex flex-wrap md:px-12 px-5">
        <div className="group max-w-md mx-auto w-full md:w-9/12 border-gray-300 border-2 border-dashed rounded-xl overflow-hidden md:max-w-screen-lg m-6">
          <div className="md:flex">
            <div className="p-8 grow">
              <div className="block mt-1 text-lg text-center leading-tight text-gray-400 mb-2">서버랑 연결되지 않은 것 같아요.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}