import React from 'react';
import { graphql } from 'gatsby';
import RichText from '../components/richText';
import Layout from '../components/layout';
import SliceZone from '../components/sliceZone';
import styled from "styled-components"

export const query = graphql`
query PageQuery($id: String){
    prismic {
      allPages(id: $id) {
        edges {
          node {
            body {
              ... on PRISMIC_PageBodyCall_to_action_grid {
                type
                label
                fields {
                  button_destination {
                    ... on PRISMIC_Contact_page {
                      form_title
                      form_description
                      _meta {
                        uid
                      }
                    }
                  }
                  button_label
                  call_to_action_title
                  content
                  featured_image
                }
                primary {
                  section_title
                }
              }
            }
            _meta {
              uid
              id
            }
            page_title
            content
          }
        }
      }
    }
  }
`

const PageWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
`

const Page = ({ data }) => {
  const pageTite = data.prismic.allPages.edges[0].node.page_title;
  const content = data.prismic.allPages.edges[0].node.content;
  return (
    <Layout>
      <PageWrapper>

        <RichText render={pageTite} />
        <RichText render={content} />
        {!!data.prismic.allPages.edges[0].node.body && (
          <SliceZone body={data.prismic.allPages.edges[0].node.body} />
        )}
      </PageWrapper>
    </Layout>
  )
}

export default Page;