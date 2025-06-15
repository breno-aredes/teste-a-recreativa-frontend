import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Tag,
  Badge,
  Button,
  Space,
  Modal,
  message as antdMessage,
} from "antd";
import {
  CalendarOutlined,
  FilePdfOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { plansServices } from "@/services/plansServices";
import { PlanResponse } from "@/types/plansTypes";
import "./styles.css";
import "../../styles/globalStyles.css";
import { useLoading } from "@/hooks/useLoading";
import { renderAsync } from "docx-preview";
import { generatePlanPdf } from "@/utils/generatePlanPdf";

export default function PlansList() {
  const [plans, setPlans] = useState<PlanResponse[]>([]);
  const { setLoading } = useLoading();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<"pdf" | "docx" | null>(null);
  const [previewFileName, setPreviewFileName] = useState<string>("");
  const [docxReady, setDocxReady] = useState(false);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchPlans() {
      setLoading(true);
      try {
        const res = await plansServices.GetPlans();
        setPlans(res.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  const handleGeneratePdf = (plan: PlanResponse) => {
    generatePlanPdf(plan);
  };

  const handlePreviewOriginal = async (plan: PlanResponse) => {
    if (!plan.filePath) return;

    const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const fileUrl = `${BACKEND_URL}/${plan.filePath}`;
    setPreviewFileName("Arquivo Original");
    setDocxReady(false);

    if (fileUrl.endsWith(".pdf")) {
      setPreviewUrl(fileUrl);
      setPreviewType("pdf");
      setIsModalOpen(true);
    } else if (fileUrl.endsWith(".docx")) {
      setPreviewType("docx");
      setPreviewUrl(fileUrl);
      setIsModalOpen(true);
    } else {
      antdMessage.warning(
        "Visualização disponível apenas para arquivos PDF e DOCX."
      );
    }
  };

  useEffect(() => {
    const renderDocx = async () => {
      if (
        isModalOpen &&
        previewType === "docx" &&
        previewUrl &&
        docxReady &&
        docxContainerRef.current
      ) {
        docxContainerRef.current.innerHTML = "";
        try {
          const response = await fetch(previewUrl);
          const arrayBuffer = await response.arrayBuffer();
          await renderAsync(
            arrayBuffer,
            docxContainerRef.current as HTMLElement,
            undefined,
            {
              inWrapper: false,
              ignoreWidth: true,
              ignoreHeight: true,
              ignoreFonts: true,
              breakPages: false,
              ignoreLastRenderedPageBreak: true,
              experimental: false,
              trimXmlDeclaration: true,
              debug: false,
            }
          );
        } catch (error) {
          antdMessage.error("Erro ao pré-visualizar o DOCX.");
        }
      }
    };
    renderDocx();
  }, [isModalOpen, previewType, previewUrl, docxReady]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPreviewUrl(null);
    setPreviewType(null);
    setPreviewFileName("");
    setDocxReady(false);
    if (docxContainerRef.current) {
      docxContainerRef.current.innerHTML = "";
    }
  };

  return (
    <div>
      <div className="plans-header">
        <h2 className="plans-title">Planos de Aula</h2>
        <Badge count={plans.length} className="plans-badge" />
      </div>
      <div className="plans-list">
        {plans.map((plan) => (
          <Card className="plan-card" key={plan.id}>
            <div className="plan-title">
              {plan.title}{" "}
              <Space className="plan-actions">
                <Button
                  icon={<EyeOutlined />}
                  type="primary"
                  className="custom-button"
                  onClick={() => handlePreviewOriginal(plan)}
                  disabled={!plan.filePath}
                >
                  Original
                </Button>
                <Button
                  icon={<FilePdfOutlined />}
                  type="primary"
                  className="custom-button"
                  onClick={() => handleGeneratePdf(plan)}
                >
                  Gerar PDF
                </Button>
              </Space>
            </div>
            <div className="plan-tags">
              <Tag color="blue">{plan.subject}</Tag>
              <Tag color="green">{plan.grade}</Tag>
              <Tag color="cyan">{plan.duration}</Tag>
            </div>
            <div className="plan-date">
              <CalendarOutlined className="plan-date-icon" />
              {new Date(plan.createdAt).toLocaleDateString()}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={previewFileName}
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="90vw"
        className="custom-modal"
      >
        {previewType === "pdf" && previewUrl && (
          <iframe
            src={previewUrl}
            title="file Preview"
            width="100%"
            height="100%"
          />
        )}
        {previewType === "docx" && (
          <div
            ref={(el) => {
              docxContainerRef.current = el;
              setDocxReady(!!el);
            }}
            className="docx-style"
          />
        )}
      </Modal>
    </div>
  );
}
