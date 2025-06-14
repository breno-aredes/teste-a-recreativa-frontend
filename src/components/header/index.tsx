"use client";

import React from "react";
import { Layout, Typography } from "antd";
import "./styles.css";
const { Title } = Typography;
import { FaGraduationCap } from "react-icons/fa";

const { Header } = Layout;

export default function HeaderHome() {
  return (
    <Header className="header-home">
      <FaGraduationCap className="header-home-icon" />
      <Title className="h1-home">Sistema de Planos de Aula</Title>
    </Header>
  );
}
