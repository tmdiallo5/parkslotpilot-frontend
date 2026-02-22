import React from "react";
import Nav from "../Nav";

function PublicHeader() {
  return (
    <>
      <header className="w-full border-b border-gray-200 bg-white rounded-md">
        <div className="mx-auto flex h-16 items-center">
          <div className="text-lg font-semibold text-green-600 ml-2">Logo</div>
          <Nav />
        </div>
      </header>
    </>
  );
}

export default PublicHeader;
