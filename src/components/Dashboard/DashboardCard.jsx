import React from "react";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, to, children }) => {
  return (
    <Link to={to} className="dashboard-item-card">
      {children}
      <p className="text-slate-200 mt-3 ">{title}</p>
    </Link>
  );
};

export default DashboardCard;
