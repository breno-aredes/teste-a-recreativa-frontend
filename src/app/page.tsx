"use client";
import { Layout } from "antd";
import { SnippetsFilled } from "@ant-design/icons";
import HeaderHome from "@/components/header/header";

const { Header, Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
    </Layout>
  );
}
