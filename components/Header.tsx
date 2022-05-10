import type { NextPage } from "next";
import Link from "next/link";

const Header: NextPage = () => {
  return (
    <header>
      <div className="container">
        <Link href="/">My Dev Blog</Link>
      </div>
    </header>
  );
};

export default Header;
