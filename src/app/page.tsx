"use client";
import HomeContent from "@/components/content";
import HeaderHome from "@/components/header";
import { Layout } from "antd";

export default function Home() {
  return (
    <Layout>
      <HeaderHome />
      <HomeContent />
    </Layout>
  );
}
