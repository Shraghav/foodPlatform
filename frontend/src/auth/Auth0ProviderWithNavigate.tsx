
import { useCreateMyUser } from "@/API/MyUserAPI";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
    children: React.ReactNode;
}
//it will wrap allthe components which needs authentication
const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    if (!domain || !clientID || !redirectURI) {
        throw new Error("Unable to connect");
    }
    //gets called when the user is re directed
    const onRedirect = (appState?: AppState, user?: User) => {
       navigate("/auth-callback")
    }
    return (
        <Auth0Provider domain={domain}
            clientId={clientID}
            authorizationParams={{ redirect_uri: redirectURI }}
            onRedirectCallback={onRedirect}>
            {children}
        </Auth0Provider>
    )
}

export default Auth0ProviderWithNavigate;