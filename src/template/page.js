import React from 'react';
import {graphql} from 'gatsby';
import {RichText} from 'prismic-reactjs';

export const query = graphql`
query PageQuery($id: String){
    prismic {
      allPages(id: $id) {
        edges {
          node {
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

const Page = ({data}) => {
    const pageTite = data.prismic.allPages.edges[0].node.page_title;
    const content = data.prismic.allPages.edges[0].node.content;
    return(
        <>
        <RichText render={pageTite}/>
        <RichText render={content}/>
        </>
    )
}

export default Page;