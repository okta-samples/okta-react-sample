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
import { Link, useLocation } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';

const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth, location]);

  const login = async () => oktaAuth.signInWithRedirect();
  const logout = async () => oktaAuth.signOut();

  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          {process.env.SUPPORT_URL !== "" && (
            <Menu.Item id="help-button">
              <Link to={process.env.SUPPORT_URL}>Help</Link>
            </Menu.Item>
          )}
          {authState && authState?.isAuthenticated && !userInfo?.eduPersonPrincipalName && (
            <Menu.Item id="cancel-button" onClick={logout}>
              Cancel </Menu.Item>
          )}
        </Container>
      </Menu>
    </div>
  );
};
export default Navbar;
