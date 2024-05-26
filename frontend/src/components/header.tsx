import { Link } from "react-router-dom";
import MobileNav from "./mobileNav";
import MainNav from "./MainNav";

const Header = () => {
    return (
        //py adds padding to top and bottom
        <div className="border-b-2 border-b-orange-500 py-6">
            {/* content of the Header with page */}
            {/* flex box to position children and space between the children */}
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/"  className="text-3xl font-bold tracking-tight text-orange-500">
                    MernEats.com
                </Link>
                {/* md- predefined breakpoint */}
                {/* from medium to large it will not display */}
                <div className="md:hidden">
                    {/* hide this for larger screen size */}
                    <MobileNav/>
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
      </div>
  )
}

export default Header;