import React, { useRef, useState, useEffect } from "react";
import { Upload, message as antdMessage, Space, Button, Modal } from "antd";
import {
  InboxOutlined,
  EyeOutlined,
  DownloadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";
import { renderAsync } from "docx-preview";
import "antd/dist/reset.css";
import "./styles.css";
import "../../styles/globalStyles.css";

const { Dragger } = Upload;

export interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [docxReady, setDocxReady] = useState(false);
  const docxContainerRef = useRef<HTMLDivElement | null>(null);

  const uploadProps: UploadProps = {
    name: "document",
    multiple: false,
    accept: ".pdf,.docx,.doc",
    showUploadList: false,
    beforeUpload: (incomingFile) => {
      const isValidType =
        incomingFile.type === "application/pdf" ||
        incomingFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        incomingFile.type === "application/msword";

      if (!isValidType) {
        messageApi.error("Apenas arquivos PDF e DOCX são permitidos!");
        return Upload.LIST_IGNORE;
      }

      const isLt10M = incomingFile.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        messageApi.error("O arquivo deve ter menos de 10MB!");
        return Upload.LIST_IGNORE;
      }

      setFile(incomingFile);
      onFileUpload(incomingFile);
      return false;
    },
  };

  const handlePreview = async () => {
    if (!file) return;

    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsModalOpen(true);
      setDocxReady(false);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setIsModalOpen(true);
      setDocxReady(false);
      setPreviewUrl(null);
    } else {
      messageApi.warning(
        "Visualização disponível apenas para arquivos PDF e DOCX (.docx)."
      );
    }
  };

  useEffect(() => {
    const renderDocx = async () => {
      if (
        isModalOpen &&
        file &&
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
        docxReady &&
        docxContainerRef.current
      ) {
        docxContainerRef.current.innerHTML = "";
        setUploading(true);
        try {
          const arrayBuffer = await file.arrayBuffer();
          await renderAsync(arrayBuffer, docxContainerRef.current, undefined, {
            inWrapper: false,
            ignoreWidth: true,
            ignoreHeight: true,
            ignoreFonts: true,
            breakPages: false,
            ignoreLastRenderedPageBreak: true,
            experimental: false,
            trimXmlDeclaration: true,
            debug: false,
          });
        } catch (error) {
          messageApi.error("Erro ao pré-visualizar o DOCX.");
        }
        setUploading(false);
      }
    };
    renderDocx();
  }, [isModalOpen, file, messageApi, docxReady]);

  const handleCloseModal = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setIsModalOpen(false);
    setDocxReady(false);
    if (docxContainerRef.current) {
      docxContainerRef.current.innerHTML = "";
    }
  };

  const handleDownload = () => {
    if (file) {
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.name || "arquivo";
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    }
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <Space direction="vertical" className="input-content">
      {contextHolder}
      {!file && (
        <Dragger {...uploadProps} disabled={uploading}>
          <p className="ant-upload-drag-icon icon-content">
            <InboxOutlined className="anticon-inbox" />
          </p>
          <p className="ant-upload-text">
            Clique ou arraste um arquivo para esta área
          </p>
          <p className="ant-upload-hint">Suporte para arquivos PDF e DOCX</p>
        </Dragger>
      )}

      {file && (
        <Space className="file">
          <span>{file.name}</span>
          <div className="file-buttons">
            <Button
              icon={<EyeOutlined />}
              type="primary"
              onClick={handlePreview}
              loading={uploading}
              className="custom-button "
            >
              Visualizar
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              type="primary"
              className="custom-button "
            >
              Baixar
            </Button>
            <Button
              icon={<DeleteOutlined />}
              type="primary"
              danger
              className="custom-button-red"
              onClick={handleRemove}
            >
              Remover
            </Button>
          </div>
        </Space>
      )}

      <Modal
        title="Pré-visualização do arquivo"
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width="90vw"
        className="custom-modal"
        destroyOnHidden={true}
      >
        {previewUrl && (
          <iframe
            src={previewUrl}
            title="file Preview"
            width="100%"
            height="100%"
          />
        )}
        {isModalOpen &&
          file?.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && (
            <div
              ref={(el) => {
                docxContainerRef.current = el;
                setDocxReady(!!el);
              }}
              className="docx-style"
            />
          )}
      </Modal>
    </Space>
  );
};

export default FileUpload;
