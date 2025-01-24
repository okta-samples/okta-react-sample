/*
 * Copyright (c) 2021-Present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import Loading from '../components/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }

    if (location.state?.error) {
      setError(location.state.error);
    }

    // Clearing the location state
    navigate(location.pathname, { replace: true });
  }, [authState, oktaAuth]);

  const login = async () => {
    await oktaAuth.signInWithRedirect();
  };

  const handleFASRCSupport = () => {
    return `mailto:${process.env.SUPPORT_EMAIL}?subject=FASRC%20HarvardKey%20Linker`;
  }

  const getErrorMailToLink = (error) => {
    const subject = encodeURIComponent("Error Report");
    const body = encodeURIComponent(`
      FASRC HarvardKey Linker Error Details:
      Time: ${new Date().toISOString()}

      User: ${userInfo.email}

      Error Message: ${error}
      `);

    return `mailto:${process.env.SUPPORT_EMAIL}?subject=${subject}&body=${body}`;
  };

  // External IDP Login 
  const extLogin = async () => {
    // Create the Authorization URL
    const authorizationUrl = new URL(process.env.EXT_AUTH_URL);
    authorizationUrl.searchParams.append("client_id", process.env.EXT_CLIENT_ID);
    authorizationUrl.searchParams.append("response_type", "code");
    authorizationUrl.searchParams.append("scope", "openid profile email");
    authorizationUrl.searchParams.append("redirect_uri", process.env.EXT_REDIRECT_URI);
    authorizationUrl.searchParams.append("state", crypto.randomUUID());

    // ext_oidc_state variable is set for security purposes and will be confirmed when we get a response back (in ExtAuthCallback.jsx)
    sessionStorage.setItem("ext_oidc_state", authorizationUrl.searchParams.get("state"));

    window.location.href = authorizationUrl.toString();
  }

  if (!authState) {
    return <Loading />;
  }

  return (
    <div className="center-container">
      <div>
        <img src="/logo.jpg"/>
      </div>
      <div>
        <h1 className="title">FASRC HarvardKey Linker</h1>
      </div>
      <div>
        <div className="content">
          {authState.isAuthenticated && !userInfo
            && <Loading />}

          {error && userInfo
            && (
              <div className="content">
                <div className="container-with-border error">
                  <p>An Unexprected Error Occurred</p>
                </div>
                <div>
                  <Button id="report_error-button" color="red" as="a" href={getErrorMailToLink(error)}>
                    Report this error
                  </Button>
                </div>
              </div>
            )}

          {authState.isAuthenticated && userInfo && userInfo.eduPersonPrincipalName && !error
            && (
              <div className="content">
                <div className="container-with-border">
                  <p>Your FASRC identity "{userInfo?.sam_account_name ? userInfo.sam_account_name : '(no account name)'}" is now linked to your HarvardKey identity "{userInfo?.eduPersonPrincipalName ? userInfo.eduPersonPrincipalName : '(no identity)'}". ✅</p>
                  <p>If this is not what you expect, please <a href={handleFASRCSupport()}>contact FASRC Support</a>.</p>
                  <p>If you were trying to log in to an FASRC service, please return to that service to log in again.</p>
                </div>
              </div>
            )}

          {authState.isAuthenticated && userInfo && !userInfo.eduPersonPrincipalName && !error
            && (
              <div className="content">
                <div className="container-with-border">
                  <p>You are now logged in to your FASRC "{userInfo?.sam_account_name ? userInfo.sam_account_name : 'no account name present'}" account.</p>
                  <p>Click the button below to authenticate to HarvardKey and link your HarvardKey to your FASRC account.</p>
                  <p>After your accounts are linked, you will be able to use your HarvardKey to sign in to some FASRC services instead of using your FASRC account.</p>
                </div>
                <div>
                  <Button id="login-button" primary onClick={extLogin}>Step 2: Sign in with HarvardKey</Button>
                </div>
              </div>
            )}

          {!authState.isAuthenticated
            && (
              <div className="content">
                <div className="container-with-border">
                  <p>This app will link your HarvardKey to your FAS Research Computing account.</p>
                  <p>You will be required to sign in to both accounts to confirm your identity.</p>
                  <p>After your accounts are linked, you will be able to use your HarvardKey to sign in to some FASRC services instead of using your FASRC account.</p>
                </div>
                <div>
                  <Button id="login-button" primary onClick={login}>Step 1: Sign in with FASRC</Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Home;
