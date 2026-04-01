import { Download, FileText, User, X } from "lucide-react";
import { Button, Input, Badge } from "./ui";
import { useMemo } from "react";

interface InPersonReceiptProcessModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export function InPersonReceiptProcessModal({
  isOpen,
  onClose,
  caseData,
}: InPersonReceiptProcessModalProps) {
  const statusText = useMemo(() => {
    if (caseData?.s4Res === "방문수령 완료") return "방문수령완료";
    if (caseData?.s3Res) return "공시송달";
    if (caseData?.s2Res) return "재송달";
    return "송달중";
  }, [caseData]);

  const statusBadge = useMemo(() => {
    switch (statusText) {
      case "송달중":
        return (
          <Badge className="h-7 rounded-full border border-amber-300 bg-amber-50 px-3 text-xs font-bold text-amber-600">
            송달중
          </Badge>
        );
      case "방문수령완료":
        return (
          <Badge className="h-7 rounded-full border border-emerald-300 bg-emerald-50 px-3 text-xs font-bold text-emerald-700">
            방문수령완료
          </Badge>
        );
      case "공시송달":
        return (
          <Badge className="h-7 rounded-full border border-blue-300 bg-blue-50 px-3 text-xs font-bold text-blue-700">
            공시송달
          </Badge>
        );
      default:
        return (
          <Badge className="h-7 rounded-full border border-gray-300 bg-gray-50 px-3 text-xs font-bold text-gray-700">
            {statusText}
          </Badge>
        );
    }
  }, [statusText]);

  const fullAddress = [caseData?.address, caseData?.detail].filter(Boolean).join(" ");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/45 p-4">
      <div className="flex max-h-[90vh] w-full max-w-[800px] flex-col overflow-hidden rounded-[10px] bg-[#f3f4f6] shadow-2xl">
        {/* header */}
        <div className="flex h-14 items-center justify-between bg-[#1f3f95] px-5 text-white">
          <div className="flex items-center gap-2">
            <FileText className="h-[18px] w-[18px]" />
            <h2 className="text-[17px] font-bold leading-none">방문수령 처리</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/85 transition hover:bg-white/10 hover:text-white"
            aria-label="닫기"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* 사건 정보 */}
          <section className="rounded-[12px] border border-[#d9dde5] bg-white px-5 py-5 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-[28px] font-bold leading-none text-[#2563eb]">#</span>
              <h3 className="text-[16px] font-bold text-[#1f2937]">사건 정보</h3>
            </div>

            <div className="mb-5 border-t border-[#e5e7eb]" />

            <div className="grid grid-cols-2 gap-x-3 gap-y-4">
              <Field label="사건번호">
                <Input
                  value={caseData?.id ?? ""}
                  readOnly
                  className="h-10 bg-[#f9fafb] text-[15px]"
                />
              </Field>

              <Field label="사업명">
                <Input
                  value={caseData?.project ?? ""}
                  readOnly
                  className="h-10 bg-[#f9fafb] text-[15px]"
                />
              </Field>

              <Field label="소유자">
                <Input
                  value={caseData?.name ?? ""}
                  readOnly
                  className="h-10 bg-[#f9fafb] text-[15px]"
                />
              </Field>

              <Field label="송달상태">
                <div className="flex h-10 items-center">{statusBadge}</div>
              </Field>

              <Field label="주소" className="col-span-1">
                <Input
                  value={caseData?.address ?? ""}
                  readOnly
                  className="h-10 bg-[#f9fafb] text-[15px]"
                />
              </Field>

              <Field label="" className="col-span-1">
                <Input
                  value={caseData?.detail ?? ""}
                  readOnly
                  className="h-10 bg-[#f9fafb] text-[15px]"
                  placeholder="상세주소"
                />
              </Field>
            </div>
          </section>

          {/* 다운로드 버튼 */}
          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="h-[44px] w-full rounded-[6px] border border-[#2457ff] bg-white text-[18px] font-bold text-[#2457ff] hover:bg-blue-50"
            >
              <Download className="mr-2 h-4 w-4" />
              방문수령증 양식 다운로드
            </Button>
          </div>

          {/* 수령 정보 */}
          <section className="mt-6 rounded-[12px] border border-[#d9dde5] bg-white px-5 py-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-[18px] w-[18px] text-[#2563eb]" />
                <h3 className="text-[16px] font-bold text-[#1f2937]">수령 정보</h3>
              </div>

              <Button
                type="button"
                className="h-9 rounded-[4px] bg-[#1f3f95] px-5 text-sm font-bold text-white hover:bg-[#19357e]"
              >
                저장
              </Button>
            </div>

            <div className="mb-5 border-t border-[#e5e7eb]" />

            <div>
              <label className="mb-2 block text-[14px] font-semibold text-[#4b5563]">
                방문수령증 업로드
              </label>

              <div className="flex h-[96px] items-center justify-center rounded-[10px] border-2 border-dashed border-[#d1d5db] bg-[#fafafa] px-6 text-center text-[15px] text-[#6b7280]">
                방문수령증 파일(PDF, JPG)을 드래그 앤 드롭하세요
              </div>
            </div>
          </section>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 border-t border-[#d9dde5] bg-[#f3f4f6] px-5 py-4">
          <Button
            type="button"
            variant="outline"
            className="h-10 rounded-[6px] border border-[#2457ff] bg-white px-6 text-[15px] font-bold text-[#2457ff] hover:bg-blue-50"
          >
            <Download className="mr-2 h-4 w-4" />
            PDF 저장
          </Button>

          <Button
            type="button"
            className="h-10 rounded-[6px] bg-[#1f3f95] px-6 text-[15px] font-bold text-white hover:bg-[#19357e]"
          >
            방문수령 완료
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-10 rounded-[6px] border border-[#d1d5db] bg-white px-6 text-[15px] font-bold text-[#374151] hover:bg-gray-50"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function Field({ label, children, className = "" }: FieldProps) {
  return (
    <div className={className}>
      {label ? (
        <label className="mb-2 block text-[14px] font-semibold text-[#4b5563]">
          {label}
        </label>
      ) : (
        <div className="mb-2 h-[20px]" />
      )}
      {children}
    </div>
  );
}