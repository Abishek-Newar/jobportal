import Navbar from "../../components/Navbar"
import Footer from "../../Model/Landing/Footer"
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
            <Footer/>
        </>
    )
}
export default Landing