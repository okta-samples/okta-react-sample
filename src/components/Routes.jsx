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

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { LoginCallback } from '@okta/okta-react';
import { RequiredAuth } from './SecureRoute';
import Home from '../pages/Home';
import Loading from './Loading';
import ExtAuthCallback from '../pages/ExtAuthCallback';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact={true} element={<Home/>}/>
      <Route path="login/callback" element={<LoginCallback loadingElement={<Loading/>}/>}/>
      <Route path="/authorize/callback" element={<RequiredAuth/>}>
        <Route path="" element={<ExtAuthCallback/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
