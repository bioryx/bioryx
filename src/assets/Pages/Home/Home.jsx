import Banner from "../../Components/Banner/Banner";
import Corousal from "../../Components/Corousal/Corousal";
import Footer from "../../Components/Footer/Footer";
import Homebody from "../../Components/Homebody/Homebody";
import Navbar from "../../Components/Navbar/Navbar";

export default function Home()
{
    return(
        <>
            <Navbar></Navbar>
            <Banner></Banner>
            <Homebody></Homebody>
            <Footer></Footer>
        </>
    )
}