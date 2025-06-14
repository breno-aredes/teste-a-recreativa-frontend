import React, { useEffect, useState } from "react";
import { Card, Tabs, Layout, Form } from "antd";
import { FileAddOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { FaEdit, FaUpload } from "react-icons/fa";
import "./styles.css";
import FileUpload from "@/components/FileInput";
import { plansServices } from "@/services/plansServices";
import { useLoading } from "@/hooks/useLoading";
import PlanForm from "../planForm";
import { Plan, PlanWithOptionalFields } from "@/types/plansTypes";

const { Content } = Layout;

export default function HomeContent({}) {
  const [activeTab, setActiveTab] = useState("1");
  const { setLoading } = useLoading();
  const [plan, setPlan] = useState<Plan | undefined>(undefined);
  const [form] = Form.useForm<Plan>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = async (file: File) => {
    try {
      setLoading(true);
      setSelectedFile(file);
      const res = await plansServices.ScanPlan(file);
      if (res.data && res.data.plan) {
        setPlan(res.data.plan);
      }
    } catch (err) {
      console.error("Erro ao enviar arquivo:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (plan) {
      form.setFieldsValue(plan);
    }
  }, [plan, Form]);

  const handlePlanFinish = async (values: Plan) => {
    try {
      setLoading(true);

      const planWithFile: PlanWithOptionalFields = {
        ...values,
        file: selectedFile || undefined,
      };

      await plansServices.CreatePlan(planWithFile);
    } catch (err) {
      console.error("Erro ao criar plano:", err);
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
                    >
                      <PlanForm onFinish={handlePlanFinish} form={form} />
                    </Card>
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
