import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import {Header} from 'semantic-ui-react';

export default class VoteResults extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {
    const data = this.props.votes;
    return (
      <div>
      <div className="section-header" style={{ textAlign: "center" }}>Vote Results</div>
        <BarChart layout="vertical" barCategoryGap={1} width={500} height={350} data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis tick={{fill: "#e5e6e7"}} type="number"/>
          <YAxis tick={{fill: '#e5e6e7'}}type="category" dataKey="question" width={80} padding={{ left: 20 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#98C379" />
        </BarChart>
      </div>
    );
  }
}
