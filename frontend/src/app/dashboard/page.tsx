"use client";
import React, { useState } from "react";

import OrganizerTab from "./OrganizerTab";
import SportEventTab from "./SportEventTab";

type DashboardPageProps = {};

const DashboardPage: React.FC<DashboardPageProps> = () => {
  const [selectedTab, setselectedTab] = useState(1);

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8 border-b-2 mb-4 sticky top-0 bg-white z-10"
        aria-label="Global"
      >
        <div className="lg:flex lg:gap-x-12 ">
          <button
            className={`text-sm font-semibold leading-6 text-gray-900 ${
              selectedTab === 1
                ? "bg-gray-300 text-white rounded-md"
                : "bg-gray-100"
            } p-2`}
            onClick={() => setselectedTab(1)}
          >
            Organize
          </button>
          <button
            className={`text-sm font-semibold leading-6 text-gray-900 ${
              selectedTab === 2
                ? "bg-gray-300 text-white rounded-md"
                : "bg-gray-100"
            } p-2`}
            onClick={() => setselectedTab(2)}
          >
            Sport Event
          </button>
        </div>
        <div className="lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Account <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      {selectedTab === 1 ? <OrganizerTab /> : <SportEventTab />}
    </header>
  );
};

export default DashboardPage;
