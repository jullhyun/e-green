import { useState } from "react";
import { UserCheck, X, FileCheck, Download, Hash } from "lucide-react";
import { Button, Input, Badge, cn } from "./ui";

interface InPersonReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  caseData: any;
}

export function InPersonReceiptModal({ isOpen, onClose, caseData }: InPersonReceiptModalProps) {
  if (!isOpen) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "미접수": return <Badge variant="danger" className="bg-red-50 text-red-600 border-red-200">미접수</Badge>;
      case "송달중": return <Badge variant="warning" className="bg-yellow-50 text-yellow-600 border-yellow-200">송달중</Badge>;
      case "방문수령완료": return <Badge variant="success" className="bg-green-50 text-green-600 border-green-200 font-bold">방문수령완료</Badge>;
      case "공시송달접수": return <Badge variant="info" className="bg-blue-50 text-blue-600 border-blue-200">공시송달접수</Badge>;
      default: return <Badge variant="default">{status || '미접수'}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[800px] overflow-hidden flex flex-col max-h-[90vh] border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#1e3a8a] text-white shrink-0">
          <div className="flex items-center gap-3">
            <FileCheck className="w-5 h-5 opacity-80" />
            <h3 className="text-lg font-bold tracking-tight">방문수령 처리</h3>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white rounded-full hover:bg-white/10 p-1 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content Body */}
        <div className="flex flex-1 overflow-hidden bg-slate-50">
          {/* Left Column: Form */}
          <div className="w-2/3 p-6 flex flex-col gap-6 overflow-y-auto border-r border-gray-200">
            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <Hash className="w-4 h-4 text-blue-600" /> 사건 정보
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">사건번호</label>
                  <Input readOnly value={caseData?.trackingNo || '26수용0001'} className="bg-gray-50 text-gray-700 font-medium h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">사업명</label>
                  <Input readOnly value={caseData?.project || '방배동 도로정비사업'} className="bg-gray-50 text-gray-700 font-medium h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">소유자</label>
                  <Input readOnly value={caseData?.name} className="bg-gray-50 text-gray-700 font-medium h-9" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase">송달상태</label>
                  <div className="h-9 flex items-center">{getStatusBadge(caseData?.status || "송달중")}</div>
                </div>
                <div className="flex flex-col gap-1.5 col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">주소</label>
                  <div className="flex gap-2">
                    <Input readOnly value={caseData?.address} className="bg-gray-50 text-gray-700 font-medium h-9 flex-1" />
                    <Input readOnly value={caseData?.detail} placeholder="상세주소" className="bg-gray-50 text-gray-700 font-medium h-9 flex-1" />
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50 font-bold bg-white h-11 flex items-center justify-center shadow-sm">
              <Download className="w-4 h-4 mr-2" /> 방문수령증 양식 다운로드
            </Button>

            <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
              <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                <UserCheck className="w-4 h-4 text-blue-600" /> 수령 정보
              </h4>
              <div className="flex flex-col gap-1.5">
                 <label className="text-xs font-bold text-gray-500 uppercase">방문수령증 업로드</label>
                 <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 transition-colors h-24 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                    <p className="text-sm font-medium text-gray-500">방문수령증 파일(PDF, JPG)을 드래그 앤 드롭하세요</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Preview/Actions */}
          <div className="w-1/3 p-6 bg-slate-100 flex flex-col items-center gap-6 border-l border-gray-200">
             <div className="w-full aspect-[1/1.414] bg-white border border-gray-300 shadow-sm flex flex-col pt-8 px-5 pb-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-8 bg-gray-200 flex items-center justify-center">
                   <span className="text-xs font-bold text-gray-500">방문수령증 미리보기</span>
                </div>
                
                <div className="flex flex-col flex-1 h-full text-[9px] text-gray-900 mt-4">
                   <h2 className="text-center text-lg font-bold tracking-widest mb-6 whitespace-nowrap">수 령 증 (수용재결서 정본)</h2>
                   
                   <table className="w-full border-collapse border border-gray-800 text-center mb-6">
                      <tbody>
                         <tr className="border-b border-gray-800">
                            <td className="w-[30%] py-1.5 border-r border-gray-800 font-medium">사 업 명</td>
                            <td className="py-1.5 font-medium">사건번호</td>
                         </tr>
                         <tr className="border-b border-gray-400 border-dashed">
                            <td className="w-[30%] py-1.5 border-r border-gray-800">26경정0016</td>
                            <td className="py-1.5 text-left pl-2">강릉-제진 철도건설사업, 강릉시 13차</td>
                         </tr>
                         <tr className="border-b border-gray-400 border-dashed">
                            <td className="w-[30%] py-1.5 border-r border-gray-800">26경정0013</td>
                            <td className="py-1.5 text-left pl-2">여주-원주 복선전철건설사업, 여주시 2차</td>
                         </tr>
                         <tr className="border-b border-gray-800">
                            <td className="w-[30%] py-1.5 border-r border-gray-800">26경정0009</td>
                            <td className="py-1.5 text-left pl-2">강릉-제진 철도건설사업 강릉시 12차</td>
                         </tr>
                         <tr className="border-b border-gray-400 border-dashed"><td className="py-2.5 border-r border-gray-800"></td><td></td></tr>
                         <tr className="border-b border-gray-400 border-dashed"><td className="py-2.5 border-r border-gray-800"></td><td></td></tr>
                         <tr className="border-b border-gray-800"><td className="py-2.5 border-r border-gray-800"></td><td></td></tr>
                         
                         <tr className="border-b border-gray-800">
                            <td className="py-2 border-r border-gray-800 font-medium">수령장소</td>
                            <td className="py-2 text-left pl-2 text-xs">중앙토지수용위원회</td>
                         </tr>
                         <tr className="border-b border-gray-800">
                            <td className="py-2 border-r border-gray-800 font-medium">수령일자</td>
                            <td className="py-2 text-left pl-4 text-lg tracking-widest" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>2026. 2. 2</td>
                         </tr>
                         <tr>
                            <td className="border-r border-gray-800 font-medium py-4">수 령 인</td>
                            <td className="p-0">
                               <table className="w-full h-full text-center">
                                  <tbody>
                                     <tr className="border-b border-gray-800">
                                        <td className="w-12 py-1.5 border-r border-gray-800">주 소</td>
                                        <td className="py-1.5 text-left pl-2 text-[15px] leading-tight" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>강원도 원주시 북원로 2650<br/>국가철도공단 강원본부</td>
                                     </tr>
                                     <tr>
                                        <td className="w-12 py-1.5 border-r border-gray-800">성 명</td>
                                        <td className="py-1.5 text-center text-lg" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>윤나경</td>
                                     </tr>
                                  </tbody>
                               </table>
                            </td>
                         </tr>
                      </tbody>
                   </table>


                   <div className="flex justify-center mt-auto mb-4">
                      <div className="border border-gray-800 w-28 h-20 flex flex-col">
                         <div className="border-b border-gray-800 py-1 text-center">수령인 서명</div>
                         <div className="flex-1 flex items-center justify-center text-2xl pr-4" style={{ fontFamily: "'Nanum Pen Script', cursive" }}>
                            윤나경
                         </div>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="flex w-full gap-2">
                <Button variant="outline" className="flex-1 border-blue-600 text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-1.5 font-bold h-11 text-[11px] px-2">
                   <Download className="w-3.5 h-3.5" /> PDF 저장
                </Button>
                <Button variant="primary" className="bg-[#1e3a8a] text-white hover:bg-blue-800 flex items-center justify-center gap-1.5 font-bold text-[11px] whitespace-nowrap">
   <UserCheck className="w-3.5 h-3.5" /> 방문수령 완료
      </Button>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-100 border-t border-gray-200 shrink-0">
          <Button variant="outline" onClick={onClose} className="bg-white text-gray-700 font-bold w-24 h-10 shadow-sm border-gray-300">닫기</Button>
        </div>
      </div>
    </div>
  );
}