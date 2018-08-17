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
      <Header style={{ textAlign: "center" }}>Vote Results</Header>
        <BarChart layout="vertical" barCategoryGap={1} width={400} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis type="number"/>
          <YAxis type="category" dataKey="question" width={80} padding={{ left: 20 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#1678c2" />
        </BarChart>
      </div>
    );
  }
}
