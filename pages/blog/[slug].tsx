import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";

import IPost from "../../interfaces/Post";

const PostPage: NextPage<IPost> = ({
  frontmatter: { title, date, cover_image },
  slug,
  content,
}) => (
  <>
    <Link href="/">
      <a className="btn btn-back">Go Back</a>
    </Link>

    <div className="card card-page">
      <h1 className="post-title">{title}</h1>
      <div className="post-date">Posted on {date}</div>
      <img src={cover_image} alt={title} />
      <div className="post-boddy">
        <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    </div>
  </>
);

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IParams {
  params: { slug: string };
}

export async function getStaticProps({ params: { slug } }: IParams) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      slug,
      content,
    },
  };
}

export default PostPage;
