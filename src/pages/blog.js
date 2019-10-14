import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"

import Head from "../components/head"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query($category: String!) {
      allMarkdownRemark(
        filter: { frontmatter: { category: { eq: $category } } }
      ) {
        edges {
          node {
            excerpt(truncate: true, pruneLength: 100)
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Blog"></Head>
      <h1>Blog</h1>
      <ol className={blogStyles.posts}>
        {data.allMarkdownRemark.edges.map(edge => {
          return (
            <li className={blogStyles.post}>
              <Link to={`/blog/${edge.node.fields.slug}`}>
                <h2>{edge.node.frontmatter.title}</h2>
                <p>{edge.node.frontmatter.date}</p>
                <p>{edge.node.excerpt}</p>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogPage
