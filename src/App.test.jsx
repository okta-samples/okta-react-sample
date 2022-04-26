import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import { OktaAuth } from '@okta/okta-auth-js';

let container;

jest.mock('broadcast-channel', () => {
  const actual = jest.requireActual('broadcast-channel');
  class FakeBroadcastChannel {
    close() {}
  }
  return {
    createLeaderElection: actual.createLeaderElection,
    BroadcastChannel: FakeBroadcastChannel
  };
});

const mocked = {
  broadcastChannel: require('broadcast-channel'),
};

function createAuth(options) {
  options = options || {};
  options.tokenManager = options.tokenManager || {};
  options.services = options.services || {};
  return new OktaAuth({
    issuer: 'https://auth-js-test.okta.com',
    clientId: 'NPSfOkH5eZrTy8PMDlvx',
    redirectUri: 'https://example.com/redirect',
    tokenManager: {
      syncStorage: options.tokenManager.syncStorage || false,
      autoRenew: options.tokenManager.autoRenew || false,
      autoRemove: options.tokenManager.autoRemove || false,
    },
    services: options.services
  });
}

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders title link', async () => {
  const options = { tokenManager: { syncStorage: false, autoRenew: true } };
  const client = createAuth(options);
  client.serviceManager.start();

  await act(async () => {
    ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, container);
  });

  const linkElement = container.querySelector('a');
  expect(linkElement.textContent.trim()).toBe('Okta-React Sample Project');

  client.serviceManager.stop();
});
