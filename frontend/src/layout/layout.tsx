import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Header from "@/components/header";

type Props = {
  children: React.ReactNode
}

const Layout = ({children}: Props) => {
    return (
        //using flex box to make sure it takes up the entire height
        <div className="flex flex-col min-h-screen">
        <Header />
        <Hero/>
            {/* adding space on left and right */}
        <div className="container mx-auto flex-1 py-10">{children}</div>
        <Footer />

       </div>
  )
}

export default Layout;