import React from "react"

import Layout from "../components/layout"
import Calendar from "../components/Calendar/index.js"

import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Calendar />
  </Layout>
)

export default IndexPage
