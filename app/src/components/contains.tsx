export default function Contains() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-md-4 offset-md-4 text-center">
            <video id="video"></video>
            <button className="btn btn-primary mb-2" id="cambiar-camara">
              Cambiar camara
            </button>
            <canvas
              id="canvas"
              width="400"
              height="400"
              className="d-block h-36 w-1/2 border mx-auto mb-2"
            ></canvas>
            <canvas
              id="otrocanvas"
              width="150"
              height="150"
              className="d-block h-36 w-1/2 border mx-auto mb-2"
            ></canvas>
            <div id="resultado"></div>
          </div>
        </div>
      </div>
    );
}