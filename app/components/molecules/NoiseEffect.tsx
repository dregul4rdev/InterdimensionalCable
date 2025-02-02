
const NoiseEffect = ({ visible= false }: { visible:boolean }) => {

    return (<>
    {visible?< >
            <audio autoPlay
              src="/InterdimensionalCable/assets/tv-static.mp3">
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            <video className="absolute z-10 w-auto 
            min-w-full min-h-full max-w-none" autoPlay >
              <source src="/InterdimensionalCable/assets/tv_1.mov" type="video/mp4" />
              <track
                src="/assets/"
                kind="subtitles"
                srcLang="en"
                label="English"
              />
              Your browser does not support the video tag.
            </video>
          </> : <></>}
    </>)

}

export default NoiseEffect

