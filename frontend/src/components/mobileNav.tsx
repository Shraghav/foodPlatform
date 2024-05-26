import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import  MobileNavLinks  from "./MobileNavLinks";

const mobileNav = () => {
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                {/* will  cause thesheet to open */}
                <Menu className="text-orange-500"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated ? (
                        <span className="flex items-center font-bold gap-2">
                        <CircleUserRound className="text-orange-500"/>
                        {user?.email}
                        </span>
                    ) :
                        (<span>Welcome to Merneats.com</span>)}
                    
                </SheetTitle>
                <Separator />
                {/* will hold login button */}
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated ? (
                        <MobileNavLinks />
                    ) : (
                        <Button onClick={() => loginWithRedirect()
                    } className="flex-1 font-bold bg-orange-500">
                            Login
                        </Button>)}
                    {/* flex - 1 will take full space available to parent */}
                </SheetDescription>
            </SheetContent>
      </Sheet>
  )
}

export default mobileNav;