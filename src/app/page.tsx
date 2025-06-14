"use client";
import HomeContent from "@/components/layout/content";
import HeaderHome from "@/components/layout/header";
import { Layout } from "antd";

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <HomeContent />
    </Layout>
  );
}
