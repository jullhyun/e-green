import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, CloudUpload, ChevronRight, FileText, Download, Eye, Play, Send } from "lucide-react";
import { Button, cn } from "../components/ui";

const mockDetails = {
  id: "26수용0001",
  project: "방배동도로개선사업"
};

const mockTargets = [
  { id: 1, name: "홍길동", address: "서울시 서초구", detail: "방배동 52-10", trackingNo: "1111-2222-3333", date: "2026.03.17", generated: true },
  { id: 2, name: "김둘리", address: "서울시 강남구", detail: "역삼동 10-2", trackingNo: "1111-2222-3334", date: "-", generated: false },
  { id: 3, name: "이몽룡", address: "서울시 종로구", detail: "삼청동 15", trackingNo: "1111-2222-3335", date: "2026.03.17", generated: true },
  { id: 4, name: "성춘향", address: "서울시 마포구", detail: "공덕동 20-5", trackingNo: "1111-2222-3336", date: "-", generated: false },
];

export function DeliveryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [showTrackingStock, setShowTrackingStock] = useState(false);

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">송달관리 - e송달작업</h1>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <span className="text-lg font-medium text-gray-600">{id}</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/delivery/${id}/address`)} 
          className="border-gray-300 text-gray-700 font-bold bg-white shadow-sm hover:bg-gray-50 h-9 px-5"
        >
          이전단계
        </Button>
      </div>

      {/* Top Info Inputs */}
      <div className="flex items-center gap-6 bg-white p-4 border border-gray-200 rounded-sm shadow-sm">
         <div className="flex items-center gap-3">
            <div className="bg-yellow-50 px-4 py-2 font-bold text-gray-700 border border-gray-200 min-w-[100px] text-center">사건번호</div>
            <div className="border border-blue-400 px-4 py-2 font-medium text-black min-w-[160px] bg-blue-50/30">{mockDetails.id}</div>
         </div>
         <div className="flex items-center gap-3 flex-1">
            <div className="bg-yellow-50 px-4 py-2 font-bold text-gray-700 border border-gray-200 min-w-[100px] text-center">사업명</div>
            <div className="border border-blue-400 px-4 py-2 font-medium text-gray-900 flex-1 bg-blue-50/30">{mockDetails.project}</div>
         </div>
      </div>

      {/* Document Upload Area */}
      <div className="flex flex-col gap-3">
         {["공문", "재결서", "정본서", "안내문"].map((docType) => (
            <div key={docType} className="flex gap-2 h-16">
               <div className="w-32 bg-yellow-50 border border-gray-200 flex items-center justify-center font-bold text-gray-700 shrink-0">
                  {docType}
               </div>
               
               <div 
                  className={cn(
                     "flex-1 border border-blue-200 flex items-center justify-center transition-colors relative cursor-pointer group bg-white",
                     dragActive ? "bg-blue-50 border-blue-500" : "hover:bg-gray-50"
                  )}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
               >
                  <span className="text-sm font-medium text-gray-400 group-hover:text-blue-500">드래그 앤 드롭</span>
               </div>
               
               <div className="flex flex-col justify-between w-20 shrink-0">
                  <Button variant="outline" className="h-[30px] text-xs font-bold bg-white text-gray-700 border-gray-800 rounded-none">추가</Button>
                  <Button variant="outline" className="h-[30px] text-xs font-bold bg-white text-gray-700 border-gray-800 rounded-none">삭제</Button>
               </div>
               
               <Button variant="primary" className="w-24 h-full bg-[#1e3a8a] text-white font-bold rounded-none shadow-sm flex items-center justify-center">
                  미리보기
               </Button>
            </div>
         ))}
      </div>

      {/* PDF Generation Buttons */}
      <div className="flex gap-4 mt-2 justify-end">
         <div className="w-64 flex flex-col">
            <Button variant="primary" className="w-full h-14 text-sm font-bold bg-[#1e3a8a] rounded-none shadow-sm flex flex-col items-center justify-center leading-tight">
               <span>재결서 생성</span>
               <span>(통합PDF)</span>
            </Button>
            <div className="h-8 border border-blue-300 flex items-center justify-center text-xs font-bold text-blue-800 bg-white">
               완료 (2건/50%)
            </div>
         </div>
         <div className="w-64 flex flex-col">
            <Button variant="primary" className="w-full h-14 text-sm font-bold bg-[#1e3a8a] rounded-none shadow-sm flex flex-col items-center justify-center leading-tight">
               <span>재결서 재생성</span>
               <span>(통합PDF)</span>
            </Button>
            <div className="h-8 border border-blue-300 flex items-center justify-center text-xs font-bold text-blue-800 bg-white">
               완료 (0건/0%)
            </div>
         </div>
      </div>

      {/* Targets Table */}
      <div className="flex flex-col gap-2 mt-4">
         <div className="flex items-center gap-2">
            <div className="w-2 h-4 bg-yellow-400 rounded-sm"></div>
            <h3 className="font-bold text-gray-800 text-[15px]">송달대상자</h3>
         </div>

         <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm custom-scrollbar">
            <table className="w-full text-sm text-center whitespace-nowrap">
               <thead className="text-xs text-gray-700 bg-slate-100 border-b border-gray-300">
                  <tr>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-16">순번</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-24">성명</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 text-left">주소</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 text-left w-48">상세주소</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-36">등기번호</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-32">자료생성일자</th>
                     <th colSpan={3} className="px-4 py-2 font-bold border-b border-gray-300">첨부 통합 재결서</th>
                  </tr>
                  <tr>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">생성</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">미리보기</th>
                     <th className="px-2 py-1.5 font-bold bg-white w-24">다운로드</th>
                  </tr>
               </thead>
               <tbody>
                  {mockTargets.map((row, index) => (
                     <tr key={row.id} className="bg-white border-b hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-4 text-gray-500 border-r border-gray-200">{index + 1}</td>
                        <td className="px-4 py-4 font-bold text-gray-900 border-r border-gray-200">{row.name}</td>
                        <td className="px-4 py-4 text-gray-700 text-left border-r border-gray-200">{row.address}</td>
                        <td className="px-4 py-4 text-gray-600 text-left border-r border-gray-200">{row.detail}</td>
                        <td className="px-4 py-4 font-mono text-blue-600 font-medium border-r border-gray-200">{row.trackingNo}</td>
                        <td className="px-4 py-4 text-gray-500 border-r border-gray-200">{row.date}</td>
                        
                        <td className="px-2 py-3 border-r border-gray-200 text-center">
                           <div className={cn("w-3 h-3 rounded-full mx-auto shadow-inner", row.generated ? "bg-green-500" : "bg-red-500")} />
                        </td>
                        <td className="px-2 py-3 border-r border-gray-200">
                           <Button variant="outline" size="sm" disabled={!row.generated} className="h-7 w-16 text-[11px] font-bold text-white bg-gray-600 hover:bg-gray-700 border-none mx-auto shadow-sm rounded-sm disabled:opacity-40">
                              버튼
                           </Button>
                        </td>
                        <td className="px-2 py-3">
                           <Button variant="outline" size="sm" disabled={!row.generated} className="h-7 w-16 text-[11px] font-bold text-white bg-gray-600 hover:bg-gray-700 border-none mx-auto shadow-sm rounded-sm disabled:opacity-40">
                              버튼
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Bottom Action Area */}
      <div className="flex flex-col gap-2 mt-6">
         <div className="flex items-center justify-end gap-2">
            <div 
               className="bg-[#1e3a8a] text-white px-6 py-3 font-bold flex items-center justify-center min-w-[200px] shadow-sm cursor-pointer hover:bg-blue-800 transition-colors"
               onClick={() => navigate(`/delivery/${id}/result`)}
            >
               e송달 발송하기
            </div>
            <div 
               className="bg-[#1e3a8a] text-white px-6 py-3 font-bold flex items-center justify-center min-w-[200px] shadow-sm cursor-pointer hover:bg-blue-800 transition-colors"
               onClick={() => setShowTrackingStock(!showTrackingStock)}
            >
               등기번호 사용량보기
            </div>
         </div>
         
         {showTrackingStock && (
            <div className="flex justify-end items-center gap-1.5 pr-4 text-sm text-gray-600 font-medium">
               <span className="text-red-600">🔔</span>
               전체 : 10000 | 사용가능 : 9924
            </div>
         )}
      </div>
    </div>
  );
}
