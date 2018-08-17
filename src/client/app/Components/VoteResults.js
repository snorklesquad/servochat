import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
        <BarChart layout="vertical" barCategoryGap={1} width={630} height={250} data={data}>
          <CartesianGrid/>
          <XAxis type="number" />
          <YAxis type="category" dataKey="question" width={150} padding={{ left: 20 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#1678c2" />
        </BarChart>
      </div>
    );
  }
}
