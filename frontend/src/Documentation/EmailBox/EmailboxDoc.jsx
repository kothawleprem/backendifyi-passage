import React from 'react'
import { Container } from 'react-bootstrap';
import './EmailBoxDoc.css'
import NavBar from '../../Components/NavBar/NavBar';

const EmailboxDoc = () => {
  const jsonSnippet = `{
  "email": "johndoe@example.com"
}`;

const jsonResponseSnippet = `{
    "status": "success",
    "message": "Email added in Emailbox."
}`;

  return (
    <>
      <NavBar />
      <Container>
        <article className="page sans">
          <header>
            <h1 className="page-title">Overview</h1>
            <p className="page-description"></p>
          </header>
          <div className="page-body">
            <p>
              This is a technical documentation that will assist you with
              integrating <strong>Backendifyi’s EmailBox</strong>. EmailBox is a
              powerful tool that provides API which could be easily integrated
              in Frontend using JavaScript. With EmailBox, you can send and
              receive emails directly from your application without any hassle.
              This means you can automate email notifications, send newsletters
              and updates to your users, or even create email marketing
              campaigns right from your app.
            </p>
            <p>
              To get started with EmailBox, you will need to follow a few simple
              steps. First, you will need to create an account with Backendifyi
              and generate your API key. Once you have your API key, you can
              start using EmailBox right away. The API documentation is
              comprehensive and easy to understand, with plenty of examples to
              help you get started.
            </p>
            <p>
              In conclusion, integrating EmailBox with your Frontend using
              JavaScript is a smart choice that will help you streamline your
              email communications and take your application to the next level.
              With its powerful features and easy-to-use API, EmailBox is the
              perfect tool for any developer looking to create a seamless email
              experience for their users.
            </p>
            <hr />
            <h2>1. Sign In to Backendifyi</h2>
            <p>
              The <a href="http://backendifyi.com">home page</a> features a
              &quot;Sign in with Google&quot; option. Once logged in, the
              dashboard with the EmailBox page will be displayed.
            </p>

            <hr />
            <h2>2. Create EmailBox</h2>

            <p>
              To get started with your project, enter its name. You will then be
              redirected to the main page, where you can update your project's
              name, copy its API key, or replace it with a new one.
              Additionally, on this page, you can view all of your email
              addresses.
            </p>
            <p>
              <blockquote>
                Note: Maximum of 3 EmailBox are allowed per user.
              </blockquote>
            </p>

            <hr />
            <h2>3. Integrate with your application.</h2>

            <p>
              To use the EmailBox API, you will need to send requests to the
              following endpoint:
            </p>
            <pre className="code code-wrap">
              <code>http://127.0.0.1:8000/api/emailbox/addEmail/</code>
            </pre>
            <p>The request should include the following data:</p>
            <ol type="1" className="numbered-list" start="1">
              <li>In your headers, add Authorization Field.</li>
            </ol>
            <pre className="code code-wrap">
              <code>Authorization: APIKey emailbox_api_key</code>
            </pre>
            <ol type="1" className="numbered-list" start="2">
              <li>In you body, in JSON format add the following data.</li>
            </ol>
            <pre className="code code-wrap">
              <code>
                <div dangerouslySetInnerHTML={{ __html: jsonSnippet }} />
              </code>
            </pre>
            <p>The response will include the following data:</p>
            <pre className="code code-wrap">
              <code>
                <div
                  dangerouslySetInnerHTML={{ __html: jsonResponseSnippet }}
                />
              </code>
            </pre>
            <p>
              <strong>Sample Code</strong>
            </p>
            <p>
              Reference templates are available on Github at this &nbsp;
              <a href="https://github.com/kothawleprem/backendifyi-react-subscription-template">
                Link
              </a>
              .
            </p>
            <hr />
            <p></p>
          </div>
        </article>
      </Container>
    </>
  );
}

export default EmailboxDoc