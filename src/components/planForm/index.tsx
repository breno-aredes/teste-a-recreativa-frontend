import React from "react";
import { Form, Input, Button, FormInstance } from "antd";
import { Plan } from "@/types/plansTypes";
import "../../styles/globalStyles.css";
const { TextArea } = Input;
import { SaveOutlined } from "@ant-design/icons";

interface PlanFormProps {
  form: FormInstance<Plan>;
  onFinish: (values: Plan) => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ form, onFinish }) => {
  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item label="Título" name="title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Disciplina" name="subject" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Ano/Série" name="grade" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Duração" name="duration" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Objetivos"
        name="objectives"
        rules={[{ required: true }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        label="Atividades"
        name="activities"
        rules={[{ required: true }]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item label="Recursos" name="resources" rules={[{ required: true }]}>
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item
        label="Avaliação"
        name="evaluation"
        rules={[{ required: true }]}
      >
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item label="Tarefa de Casa" name="homework">
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item label="Observações" name="notes">
        <TextArea rows={2} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="custom-button ">
          <SaveOutlined />
          Salvar Plano
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PlanForm;
