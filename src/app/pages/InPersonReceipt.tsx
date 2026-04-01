import { useState } from "react";
import { Search, Printer, Download, UserCheck, X, FileCheck, User, Home, Hash } from "lucide-react";
import { Button, Input, Select, Badge, cn } from "../components/ui";

const mockData = [
  { id: "26수용0001", round: "2026-1", date: "2026.01.02", project: "방배동 도로정비사업", type: "소유자", name: "홍길동", address: "서울시 서초구", status: "송달중" },
  { id: "26수용0001", round: "2026-1", date: "2026.01.02", project: "방배동 도로정비사업", type: "관계인", name: "김둘리", address: "서울시 강남구", status: "미접수" },
  { id: "26수용0003", round: "2026-2", date: "2026.02.15", project: "강남역 사거리 확장", type: "소유자", name: "박문수", address: "서울시 송파구", status: "공시송달접수" },
];

export function InPersonReceipt() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [filterType, setFilterType] = useState("전체");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "미접수": return <Badge variant="danger" className="bg-red-50 text-red-600 border-red-200">미접수</Badge>;
      case "송달중": return <Badge variant="warning" className="bg-yellow-50 text-yellow-600 border-yellow-200">송달중</Badge>;
      case "방문수령완료": return <Badge variant="success" className="bg-green-50 text-green-600 border-green-200 font-bold">방문수령완료</Badge>;
      case "공시송달접수": return <Badge variant="info" className="bg-blue-50 text-blue-600 border-blue-200">공시송달접수</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  const handleReceipt = (row: any) => {
    setSelectedCase(row);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">방문수령</h1>
      </div>

      {/* Search Area */}
      <div className="bg-[#f8fafc] p-6 rounded-lg border border-slate-200 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold min-w-max">
            <Search className="w-5 h-5" />
            <span>검색조건</span>
          </div>
          <div className="h-8 w-px bg-slate-300 mx-2" />
          
          <div className="flex items-center gap-6 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm flex-1 max-w-xl">
            {["전체", "미접수", "송달/재송달", "송달완료"].map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="receipt_status" 
                  checked={filterType === status}
                  onChange={() => setFilterType(status)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500" 
                />
                <span className={cn(
                  "text-sm font-medium transition-colors",
                  filterType === status ? "text-blue-700 font-bold" : "text-gray-600 group-hover:text-gray-900"
                )}>{status}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4 items-center pl-32">
          <Select 
            className="w-32 bg-white"
            options={[{label: "이름", value: "name"}, {label: "주소", value: "address"}]}
          />
          <Input className="w-96 bg-white" placeholder="주소, 소유자, 관계인 검색" />
          <Button variant="primary" className="w-24 bg-[#1e3a8a] shadow-sm font-bold">조회</Button>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex flex-col gap-3 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-[#1e3a8a] rounded-sm"></div>
          <h2 className="text-lg font-bold text-gray-800">조회 결과</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm custom-scrollbar">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-center font-bold">순번</th>
                <th className="px-6 py-4 font-bold text-center">심의차수</th>
                <th className="px-6 py-4 font-bold text-center">심의일자</th>
                <th className="px-6 py-4 font-bold">사업명</th>
                <th className="px-6 py-4 font-bold text-center">사건번호</th>
                <th className="px-6 py-4 font-bold text-center">구분</th>
                <th className="px-6 py-4 font-bold">성명</th>
                <th className="px-6 py-4 font-bold">주소</th>
                <th className="px-6 py-4 font-bold text-center">송달상태</th>
                <th className="px-6 py-4 font-bold text-center">수령처리</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((row, index) => (
                <tr key={`${row.id}-${index}`} className="bg-white border-b hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700">{row.round}</td>
                  <td className="px-6 py-4 text-center text-gray-500">{row.date}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{row.project}</td>
                  <td className="px-6 py-4 text-center text-black font-medium">{row.id}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={row.type === "소유자" ? "info" : row.type === "관계인" ? "warning" : "default"}>{row.type}</Badge>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="px-6 py-4 text-gray-600 truncate max-w-[200px]">{row.address}</td>
                  <td className="px-6 py-4 text-center">{getStatusBadge(row.status)}</td>
                  <td className="px-6 py-4 text-center">
                    {row.status === "송달중" ? (
                      <Button 
                        size="sm" 
                        onClick={() => handleReceipt(row)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 rounded-full shadow-sm flex items-center gap-1.5 mx-auto"
                      >
                        <UserCheck className="w-3.5 h-3.5" /> 수령
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="px-4 rounded-full border-gray-300 text-gray-500" disabled>
                        완료됨
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-[800px] overflow-hidden flex flex-col max-h-[90vh] border border-gray-200">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#1e3a8a] text-white shrink-0">
              <div className="flex items-center gap-3">
                <FileCheck className="w-5 h-5 opacity-80" />
                <h3 className="text-lg font-bold tracking-tight">방문수령 처리</h3>
              </div>
              <button onClick={() => setShowModal(false)} className="text-white/70 hover:text-white rounded-full hover:bg-white/10 p-1 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content Body */}
            <div className="flex flex-1 overflow-hidden bg-slate-50">
              {/* Left Column: Form */}
              <div className="w-full p-6 flex flex-col gap-6 overflow-y-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2">
                    <Hash className="w-4 h-4 text-blue-600" /> 사건 정보
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">사건번호</label>
                      <Input readOnly value={selectedCase?.id} className="bg-gray-50 text-gray-700 font-medium h-9" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">사업명</label>
                      <Input readOnly value={selectedCase?.project} className="bg-gray-50 text-gray-700 font-medium h-9" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">소유자</label>
                      <Input readOnly value={selectedCase?.name} className="bg-gray-50 text-gray-700 font-medium h-9" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-gray-500 uppercase">송달상태</label>
                      <div className="h-9 flex items-center">{getStatusBadge(selectedCase?.status)}</div>
                    </div>
                    <div className="flex flex-col gap-1.5 col-span-2">
                      <label className="text-xs font-bold text-gray-500 uppercase">주소</label>
                      <div className="flex gap-2">
                        <Input readOnly value={selectedCase?.address} className="bg-gray-50 text-gray-700 font-medium h-9 flex-1" />
                        <Input placeholder="상세주소" className="bg-white h-9 flex-1" />
                      </div>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-blue-600 text-blue-700 hover:bg-blue-50 font-bold bg-white h-11 flex items-center justify-center shadow-sm">
                  <Download className="w-4 h-4 mr-2" /> 방문수령증 양식 다운로드
                </Button>

                <div className="bg-white rounded-lg border border-gray-200 p-5 shadow-sm space-y-4">
                  <h4 className="font-bold text-gray-800 flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                       <UserCheck className="w-4 h-4 text-blue-600" /> 수령 정보
                    </div>
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none shadow-sm">저장</Button>
                  </h4>
                  <div className="flex flex-col gap-1.5">
                     <label className="text-xs font-bold text-gray-500 uppercase">방문수령증 업로드</label>
                     <div className="border-2 border-dashed border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50 transition-colors h-24 rounded-lg flex flex-col items-center justify-center cursor-pointer">
                        <p className="text-sm font-medium text-gray-500">방문수령증 파일(PDF, JPG)을 드래그 앤 드롭하세요</p>
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 bg-gray-100 border-t border-gray-200 shrink-0">
               <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 flex items-center justify-center gap-1.5 font-bold h-10 px-4">
                  <Download className="w-3.5 h-3.5" /> PDF 저장
               </Button>
               <Button variant="primary" className="bg-[#1e3a8a] text-white hover:bg-blue-800 flex items-center justify-center gap-1.5 font-bold h-10 px-4 shadow-sm" onClick={() => setShowModal(false)}>
                  <UserCheck className="w-3.5 h-3.5" /> 방문수령 완료
               </Button>
              <Button variant="outline" onClick={() => setShowModal(false)} className="bg-white text-gray-700 font-bold w-24 h-10 shadow-sm border-gray-300 ml-2">닫기</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
