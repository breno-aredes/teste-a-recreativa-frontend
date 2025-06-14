"use client";
import HomeContent from "@/components/content";
import HeaderHome from "@/components/header";
import { Layout } from "antd";

const { Header, Content } = Layout;

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <HomeContent />
    </Layout>
  );
}
