import type { NextPage } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Post from "../components/Post";
import { sortByDate } from "../utils";
import IPost from "../interfaces/Post";

const Home: NextPage<{ posts: IPost[] }> = ({ posts }) => (
  <div>
    <div className="posts">
      {posts.map((post, index) => (
        <Post post={post} key={String(index)} />
      ))}
    </div>
  </div>
);

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((fileName) => {
    const slug = fileName.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", fileName),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return { slug, frontmatter };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
};

export default Home;
