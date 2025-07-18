import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="z-10 footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            @Shresth
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
