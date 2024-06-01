import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Header from "@/components/header";

type Props = {
  children: React.ReactNode;
  showHero?: boolean; //this prop is optional
}

const Layout = ({children,showHero=false}: Props) => {
    return (
        //using flex box to make sure it takes up the entire height
        <div className="flex flex-col min-h-screen">
        <Header />
        {showHero && <Hero />}
        
            {/* adding space on left and right */}
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer />

       </div>
  )
}

export default Layout;