import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import blogStyles from "./blog.module.scss"

import Head from "../components/head"

const BlogPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            excerpt(truncate: true, pruneLength: 200)
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
          }
        }
        pageInfo {
          itemCount
        }
      }
    }
  `)

  return (
    <Layout>
      <Head title="Blog"></Head>
      <h2>{data.allMarkdownRemark.pageInfo.itemCount}건</h2>
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
