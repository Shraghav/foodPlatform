
import { useCreateMyUser } from "@/API/MyUserAPI";
import { AppState, Auth0Provider, User } from "@auth0/auth0-react";

type Props = {
    children: React.ReactNode;
}
//it will wrap allthe components which needs authentication
const Auth0ProviderWithNavigate = ({ children }: Props) => {
    const { createUser } = useCreateMyUser();
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientID = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectURI = import.meta.env.VITE_AUTH0_CALLBACK_URL;


    if (!domain || !clientID || !redirectURI) {
        throw new Error("Unable to connect");
    }
    const onRedirect = (appState?: AppState, user?: User) => {
        if (user?.sub && user?.email) {
            //user.sub is the id
            createUser({ auth0Id: user.sub, email: user.email })
        }
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