import React, { useState } from "react";
import { Card, Tabs, Layout } from "antd";
import { FileAddOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./styles.css";
import FileUpload from "@/components/FileInput";
import { plansServices } from "@/services/plansServices";
import { useLoading } from "@/hooks/useLoading";

const { Content } = Layout;

export default function HomeContent({}) {
  const [activeTab, setActiveTab] = useState("1");
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const { setLoading } = useLoading();

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    try {
      setLoading(true);
      const res = await plansServices.ScanPlan(file);
      console.log(res.data);
    } catch (err) {
      console.error("Erro ao enviar plano:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Content className="content">
      <Card className="card">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="custom-tabs"
          size="large"
          items={[
            {
              key: "1",
              label: (
                <span>
                  <FileAddOutlined />
                  Novo Plano de Aula
                </span>
              ),
              children: (
                <div className="flex-row">
                  <div className="col">
                    <Card
                      title={
                        <span>
                          <FaUpload style={{ marginRight: "4px" }} />
                          1. Carregar Documento
                        </span>
                      }
                      className="custom-header-card"
                    >
                      <FileUpload onFileUpload={handleFileUpload} />
                    </Card>
                  </div>
                  <div className="col">
                    <Card
                      className="custom-header-card"
                      title={
                        <span>
                          <FaEdit
                            style={{ marginRight: "4px", fontSize: "19px" }}
                          />
                          2. Preencher Informações
                        </span>
                      }
                    ></Card>
                  </div>
                </div>
              ),
            },
            {
              key: "2",
              label: (
                <span>
                  <UnorderedListOutlined />
                  Planos de Aula
                </span>
              ),
            },
          ]}
        />
      </Card>
    </Content>
  );
}
