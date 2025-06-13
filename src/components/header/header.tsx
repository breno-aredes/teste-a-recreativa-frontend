"use client";

import React from "react";
import { Layout, Typography } from "antd";
import { SnippetsFilled } from "@ant-design/icons";
import "./styles.css";
const { Title } = Typography;

const { Header } = Layout;

export default function HeaderHome() {
  return (
    <Header className="header-home">
      <SnippetsFilled className="header-home-icon" />{" "}
      <Title className="h1-home">Sistema de Planos de Aula</Title>
    </Header>
  );
}
