import jsPDF from "jspdf";
import { PlanResponse } from "@/types/plansTypes";

function safeString(val: any) {
  if (typeof val === "string") return val;
  if (val instanceof File) return val.name;
  return val ? String(val) : "";
}

export function generatePlanPdf(plan: PlanResponse) {
  const doc = new jsPDF();
  const left = 16;
  const right = 16;
  const top = 22;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const width = pageWidth - left - right;
  let y = top;

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Plano de Aula", pageWidth / 2, y, { align: "center" });
  y += 12;

  doc.setFontSize(12);

  function printMetadata(label: string, value: string) {
    doc.setFont("helvetica", "bold");
    doc.text(`${label}:`, left, y);
    doc.setFont("helvetica", "normal");
    doc.text(safeString(value), left + 32, y);
    y += 8;
  }

  printMetadata("Título", plan.title);
  printMetadata("Disciplina", plan.subject);
  printMetadata("Ano/Série", plan.grade);
  printMetadata("Duração", plan.duration);

  y += 6;

  function sectionBox(label: string, text?: string) {
    const minBoxHeight = 20;

    if (!text || !safeString(text).trim()) return;
    const value = safeString(text).replace(/\r\n/g, "\n").replace(/\r/g, "\n");
    const lines = doc.splitTextToSize(value, width - 8);
    const lineHeight = 7;
    const labelHeight = 6;
    const boxPadding = 8;
    const boxHeight = Math.max(
      lines.length * lineHeight + boxPadding,
      minBoxHeight
    );
    const sectionHeight = labelHeight + boxHeight + 6;

    if (y + sectionHeight > pageHeight - 16) {
      doc.addPage();
      y = top;
    }

    doc.setFont("helvetica", "bold");
    doc.text(label, left, y + 2);
    y += labelHeight;

    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.rect(left, y, width, boxHeight, "S");
    doc.setFont("helvetica", "normal");
    doc.text(lines, left + 4, y + 7);

    y += boxHeight + 6;
  }

  sectionBox("Objetivos", plan.objectives);
  sectionBox("Atividades", plan.activities);
  sectionBox("Recursos", plan.resources);
  sectionBox("Avaliação", plan.evaluation);

  if (plan.homework && safeString(plan.homework).trim())
    sectionBox("Tarefa de Casa", plan.homework);

  if (plan.notes && safeString(plan.notes).trim())
    sectionBox("Observações", plan.notes);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");

  doc.save(
    `Plano de Aula - ${
      safeString(plan.title).replace(/[\\/:*?"<>|]+/g, "") || "Sem título"
    }.pdf`
  );
}
