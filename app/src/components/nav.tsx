export default function Nav (){
    return (
      <nav className=" shadow-gray-700 shadow-xl drop-shadow-md   flex justify-around text-secondary px-14 text-center border w-1/2 py-5 rounded-full">
        <div>
          <a href="/" className="text-white hover:text-yellow-500 text-xl">
            Image Classification
          </a>
        </div>
        <div>
          <a
            href="/video-classification"
            className="text-white hover:text-yellow-500 text-xl"
          >
            Video Classification
          </a>
        </div>
      </nav>
    );
}