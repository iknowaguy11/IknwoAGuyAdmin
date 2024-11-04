"use client";
import React from "react";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import MapOne from "../Maps/MapOne";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import TableThree from "../Tables/TableThree";
import TableProjects from "../Tables/TableProjects";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <div className="gap-3 pt-3 pb-3">
      <TableThree />
      <TableProjects />
      </div>
    </>
  );
};

export default ECommerce;
