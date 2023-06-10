import { useRouter } from "next/router";
import React from "react";
import ProfileOrders from "../../components/Profile/ProfileOrders";
import Link from "next/link";
import ProfileOverview from "../../components/Profile/ProfileOverview";

function ProfileLeftSidebar({ section }) {
  const links = [
    { query: "overview", text: "Overview" },
    { query: "orders", text: "Orders" },
  ];

  return (
    <div className="profile-left-sidebar">
      {links.map((link) => (
        <Link key={link.query} href={`?section=${link.query}`}>
          <a className={link.query === section ? "active" : "notactive"}>
            {link.text}
          </a>
        </Link>
      ))}
    </div>
  );
}

function profile_section(section) {
  switch (section) {
    case "overview":
      return <ProfileOverview />;
    case "orders":
      return <ProfileOrders />;
    default:
      return <ProfileOverview />;
  }
}

function profile() {
  const router = useRouter();
  const { query } = router;
  const { section } = query;

  return (
    <div className="profile-container">
      <ProfileLeftSidebar section={section} />
      <div className="profile-section">{profile_section(section)}</div>
    </div>
  );
}

export default profile;
