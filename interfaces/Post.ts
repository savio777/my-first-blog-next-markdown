export default interface IPost {
  frontmatter: {
    title: string
    cover_image: string
    date: string
    excerpt: string
  }
  slug: string
  content: string
}