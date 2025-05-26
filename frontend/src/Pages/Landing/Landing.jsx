import Navbar from "../../components/Navbar"
import Hero from "../../Model/Landing/Hero"
import Review from "../../Model/Landing/Review"
import Description from "../../Model/Landing/Description"

function Landing() {
    return (
        <>
            <Navbar/>
            <Hero />
            <Description/>
            <Review/>
        </>
    )
}
export default Landing