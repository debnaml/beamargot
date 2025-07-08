// lib/sanityClient.ts
import { createClient } from 'next-sanity'

export const sanity = createClient({
  projectId: 'chn5i0ta',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-07-01',
})

export async function getCategories() {
  return sanity.fetch(`*[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }`)
}


export async function getRecentPosts() {
    return sanity.fetch(`*[_type == "post"] | order(publishedAt desc)[0...6]{
      _id,
      title,
      excerpt,
      publishedAt,
      "author": author->{
        name,
        column,
        "avatar": avatar.asset->url,
        "slug": slug.current
      },
      "slug": slug.current,
      "image": mainImage.asset->url
    }`)
  }

  export async function getPostBySlug(slug) {
    return sanity.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        excerpt,
        publishedAt,
        "slug": slug.current,
        "image": mainImage.asset->url,
        "body": body[],
        "author": author->{
          name,
          column,
          slug,
          bio,
          "avatar": avatar.asset->url
        },
        categories[]->{
            _id,
            title,
            slug
        }
      }`,
      { slug }
    )
  }

  export async function getRelatedPosts(categoryId, currentPostId) {
    const query = `
      *[_type == "post" && references($categoryId) && _id != $currentPostId][0...4]{
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        "mainImage": mainImage.asset->url
      }
    `
    const params = { categoryId, currentPostId }
    return await sanity.fetch(query, params)
  }


  export async function getAllTopics() {
    const query = `*[_type == "category"]{ slug }`
    return await sanity.fetch(query)
  }
  

  
  export async function getTopicBySlug(slug) {
    const query = `*[_type == "category" && slug.current == $slug][0]{
      title,
      description,
      image,
      slug
    }`
    return await sanity.fetch(query, { slug })
  }
  
  export async function getAllTopicsWithPosts() {
    const query = `
      *[_type == "category"] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        "posts": *[_type == "post" && references(^._id)] | order(publishedAt desc)[0...3] {
          _id,
          title,
          "slug": slug.current,
          publishedAt,
          excerpt,
          "image": mainImage.asset->url,
          author->{
            name,
            "slug": slug.current,
            "avatar": avatar.asset->url
          }
        }
      }
    `
    return await sanity.fetch(query)
  }

  export async function getPostsByTopic(slug) {
    const query = `*[_type == "post" && references(*[_type == "category" && slug.current == $slug]._id)] | order(publishedAt desc){
      _id,
      title,
      slug,
      publishedAt,
      "image": mainImage.asset->url,
      excerpt,
      author->{
        name,
        slug,
        avatar
      }
    }`
    return await sanity.fetch(query, { slug })
  }

export async function getHomePageContent() {
  return sanity.fetch(`*[_type == "home"][0]{
    title,
    description,
    "articles": *[_type == "post"] | order(publishedAt desc)[0...5]{
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset -> {
          url
        }
      },
      publishedAt
    }
  }`)
}