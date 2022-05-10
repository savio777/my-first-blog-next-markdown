import type { NextPage } from "next";
import Link from "next/link";

import IPost from "../interfaces/Post";

const Post: NextPage<{ post: IPost }> = ({ post }) => (
  <div className="card">
    <img src={post.frontmatter.cover_image} alt={post.frontmatter.title} />

    <h3 className="post-date">Posted on {post.frontmatter.date}</h3>

    <h3>{post.frontmatter.title}</h3>

    <p>{post.frontmatter.excerpt}</p>

    <Link href={`/blog/${post.slug}`}>
      <a className="btn">Read More</a>
    </Link>
  </div>
);

export default Post;
