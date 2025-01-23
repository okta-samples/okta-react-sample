import axios from "axios";
import React, { useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "./../components/Loading";

const ExtAuthCallback = () => {
    const { authState, oktaAuth } = useOktaAuth();

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Handling callback from the External IDP
        const handleAuthCallback = async () => {
            const params = new URLSearchParams(location.search);
            const code = params.get("code");
            const state = params.get("state");

            const storedState = sessionStorage.getItem("ext_oidc_state");

            // Compare the state values to ensure the call was not manipulated
            if (state !== storedState) {
                navigate("/", { state: { error: "Invalid state parameter. Authentication failed." } })
                return;
            }

            // Remove the ext_oidc_state variable as we have already verified the call and in case of a failure new ext_oidc_state needs to be set
            sessionStorage.removeItem("ext_oidc_state");

            if (!code) {
                navigate("/", { state: { error: "No authorization code received." } })
            }

            const accessToken = await oktaAuth.getAccessToken();

            try {
                // Calling the backend linking application with the authorization code
                await axios.post(process.env.LINK_API, { code }, {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });

                navigate("/");
            } catch (error) {
                console.error("Error in authentication callback: ", error);
                // Navigate to the home page with error stored in state variable which the page handles
                navigate("/", { state: { error: error.response?.data?.message || "Failed to process authentication" } });
            }
        };

        handleAuthCallback()
    }, [authState, oktaAuth, location, navigate]);

    return <Loading />;
};

export default ExtAuthCallback;