import React from "react"
import Layout from "../components/layout"
import Head from "../components/head"

const ContactPage = () => {
  return (
    <div>
      <Layout>
        <Head title="Contact"></Head>
        <h1>Contact</h1>
        <p>
          The best way to reach me is via{" "}
          <a href="https://github.com/Bziaco" target="_blank">
            {" "}
            Bziaco
          </a>{" "}
          on github
        </p>
      </Layout>
    </div>
  )
}

export default ContactPage
