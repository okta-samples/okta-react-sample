# FASRC HarvardKey Linker (Frontend)

Notes:
* This repo is forked from upstream so the upstream `README.md` is presented below intact to make incorporating future changes easier.
* This repo is **PUBLIC** and must remain so in order to track and merge changes from the public upstream repo through the GitHub UI. **DO NOT COMMIT SECRETS HERE!**

Amendments:
* Configuration:
  1. Copy `.example.env` to `.development.env` and fill in values.
  2. Edit `env/env.js` to load `.development.env` instead of production env (FIXME: this should be paramaterized).
  2. To include the env in the Docker build, edit the `.dockerignore` and uncomment its non-exclusion. ONLY do this in a local dev env where you will NOT push or share the build image!
* To start the app use `npm install` instead of `npm ci`
* The test suite is currently untested.

Original `README.md` follows...

# Okta React + Okta Hosted Login Example

This example shows how to use the [Okta React Library][] and [React Router](https://github.com/ReactTraining/react-router) to login a user to a React application.  The login is achieved through the [PKCE Flow][], where the user is redirected to the Okta-Hosted login page.  After the user authenticates they are redirected back to the application with an ID token and access token.

## Prerequisites

Before running this sample, you will need the following:

* [The Okta CLI Tool](https://github.com/okta/okta-cli#installation)
* An Okta Developer Account (create one using `okta register`, or configure an existing one with `okta login`)

## Configure Okta resources

**Enable Refresh Tokens**

Sign into your [Okta Developer Edition account](https://developer.okta.com/login/) to add a required setting to your React Okta app to avoid third-party cookies. Navigate to **Applications** > **Applications** and select "okta-react-sample" application to edit. Find the **General Settings** and press **Edit**. Enable **Refresh Token** in the **Grant type** section. **Save** your changes.

**Verify Authorization Server**

This repo calls a custom resource server to demonstrate making a protected resource request using an access token. Ensure that your default custom authorization server has an access policy. Add an access policy if it's not there. See [Create access polices](https://help.okta.com/okta_help.htm?type=oie&id=ext-create-access-policies).

## Get the Code

Grab and configure this project using `okta start react`.

Follow the instructions printed to the console.

## Run the Example

To run this application, install its dependencies:

```
npm ci 
```

With variables set, start your app:

```
npm start
```

Navigate to http://localhost:3000 in your browser.

If you see a home page that prompts you to login, then things are working!  Clicking the **Log in** button will redirect you to the Okta hosted sign-in page.

You can sign in with the same account that you created when signing up for your Developer Org, or you can use a known username and password from your Okta Directory.

> **Note:** If you are currently using your Developer Console, you already have a Single Sign-On (SSO) session for your Org.  You will be automatically logged into your application as the same user that is using the Developer Console.  You may want to use an incognito tab to test the flow from a blank slate.

## Integrating The Resource Server

If you were able to successfully login in the previous section you can continue with the resource server example. Please download and run one of these sample applications in another terminal:

* [Node/Express Resource Server Example](https://github.com/okta/samples-nodejs-express-4/tree/master/resource-server)
* [Java/Spring MVC Resource Server Example](https://github.com/okta/samples-java-spring/tree/master/resource-server)
* [ASP.NET](https://github.com/okta/samples-aspnet/tree/master/resource-server) and [ASP.NET Core](https://github.com/okta/samples-aspnetcore/tree/master/samples-aspnetcore-3x/resource-server) Resource Server Examples

Once you have the resource server running (it will run on port 8000) you can visit the `/messages` page within the React application to see the authentication flow. The React application will use its stored access token to authenticate itself with the resource server, you will see this as the `Authorization: Bearer <access_token>` header on the request if you inspect the network traffic in your browser.

[Okta React Library]: https://github.com/okta/okta-react
[OIDC SPA Setup Instructions]: https://developer.okta.com/docs/guides/sign-into-spa/react/before-you-begin
[PKCE Flow]: https://developer.okta.com/docs/guides/implement-auth-code-pkce
[Okta Sign In Widget]: https://github.com/okta/okta-signin-widget
