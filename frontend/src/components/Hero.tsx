import hero from "../assets/hero.png"
const Hero = () => {
    return (
        <div>
            {/* takes entire width
            object -cover keeps up the aspect ratio
            */}
            <img src={hero} className="w-full max-h-[600] object-cover"/> 
      </div>
  )
}

export default Hero;