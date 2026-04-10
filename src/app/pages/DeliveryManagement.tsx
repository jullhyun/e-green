import { useNavigate } from "react-router";
import { Search, ChevronDown, ListFilter } from "lucide-react";
import { Button, Input, Select, Badge } from "../components/ui";
import { useState } from "react";

const mockAgendas = [
  { id: 15, round: "2026년 3차", date: "2026-03-27", project: "제기제6구역 주택재개발정비사업" },
  { id: 14, round: "2026년 2차", date: "2026-02-27", project: "명동구역 제2지구 도시정비형 재개발사업 2차 외 9" },
  { id: 13, round: "2026년 1차", date: "2026-01-23", project: "한남2재정비촉진구역 주택재개발정비사업(3차) 외 7" },
  { id: 12, round: "2025년 12차", date: "2025-12-19", project: "한남2재정비촉진구역 주택재개발정비사업(2차) 외 8" },
  { id: 11, round: "2025년 11차", date: "2025-11-21", project: "미성동(신림동 산121-3일대) 도로개선사업 잔여지 매수청구 외 2" },
];

const mockData: Record<number, any[]> = {
  15: [
    { id: "26수용0001", round: "2026년 3차", receiveDate: "2026.03.02", project: "제기제6구역 주택재개발정비사업", executor: "방배동재개발조합", date: "2026.03.12", manager: "박00", owner: "홍길동 외 3인", relation: "김둘리 외 3인" },
    { id: "26수용0002", round: "2026년 3차", receiveDate: "2026.03.05", project: "제기제6구역 주택재개발정비사업", executor: "조합", date: "2026.03.15", manager: "김00", owner: "이몽룡 외 2인", relation: "성춘향 외 1인" },
  ],
  14: [
    { id: "26수용0003", round: "2026년 2차", receiveDate: "2026.02.02", project: "명동구역 제2지구 도시정비형 재개발사업 2차 외 9", executor: "조합", date: "2026.02.12", manager: "최00", owner: "박문수", relation: "이순신" },
  ],
  13: [
    { id: "26수용0004", round: "2026년 1차", receiveDate: "2026.01.02", project: "한남2재정비촉진구역 주택재개발정비사업(3차) 외 7", executor: "조합", date: "2026.01.12", manager: "이00", owner: "김선달", relation: "홍경래" },
  ],
  12: [],
  11: []
};

export function DeliveryManagement() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [caseFilter, setCaseFilter] = useState("my");
  const [selectedAgendaId, setSelectedAgendaId] = useState<number | null>(15);

  const currentCases = selectedAgendaId && mockData[selectedAgendaId] ? mockData[selectedAgendaId] : [];

  return (
    <div className="flex flex-col gap-6 w-full pb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">송달관리 - 대상조회</h1>
      </div>

      {/* Search Area */}
      <div className="bg-[#f8fafc] p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-semibold min-w-max">
          <Search className="w-5 h-5" />
          <span>검색조건</span>
        </div>
        
        <div className="h-8 w-px bg-slate-300 mx-2" />
        
        <div className="flex items-center gap-4 bg-white px-4 h-10 border border-slate-200 rounded-md shadow-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="case_filter" 
              value="my"
              checked={caseFilter === "my"}
              onChange={() => setCaseFilter("my")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
            />
            <span className="text-sm font-medium text-gray-700">내사건</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="radio" 
              name="case_filter" 
              value="all"
              checked={caseFilter === "all"}
              onChange={() => setCaseFilter("all")}
              className="w-4 h-4 text-blue-600 focus:ring-blue-500" 
            />
            <span className="text-sm font-medium text-gray-700">전체</span>
          </label>
        </div>

        <Select 
          className="w-40 bg-white shadow-sm" 
          value={searchType}
          onChange={(e: any) => setSearchType(e.target.value)}
          options={[
            { label: "전체 검색", value: "all" },
            { label: "심의차수", value: "round" },
            { label: "심의일자", value: "date" },
            { label: "사업명", value: "project" },
          ]} 
        />
        
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input 
            className="pl-10 h-10 w-full" 
            placeholder="심의차수, 심의일자 또는 사업명을 입력하세요."
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Button variant="primary" className="min-w-[100px] h-10 bg-[#1e3a8a]">검색</Button>
      </div>

      {/* Agenda Table Area */}
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-[17px] font-bold text-[#1e3a8a]">심의 차수</h2>
          <div className="flex items-center ml-2 text-[13px]">
             <span className="text-gray-500 font-medium">Total : </span>
             <span className="text-gray-900 font-bold ml-1">{mockAgendas.length}</span>
             <span className="text-gray-300 mx-3">Page : </span>
             <span className="text-gray-900 font-bold">1/2</span>
          </div>
        </div>

        <div className="overflow-x-auto border-t-2 border-[#2b3a72] bg-white shadow-sm custom-scrollbar">
          <table className="w-full text-sm text-center whitespace-nowrap">
            <thead className="bg-[#f8fafc] text-[#2b3a72] font-bold border-b border-[#2b3a72]">
              <tr>
                <th className="px-4 py-3 border-r border-gray-200 w-16">연번</th>
                <th className="px-4 py-3 border-r border-gray-200 w-32">심의차수</th>
                <th className="px-4 py-3 border-r border-gray-200 w-32">심의 일자</th>
                <th className="px-6 py-3 border-r border-gray-200">사업명</th>
                <th className="px-4 py-3 w-40">심사 진행</th>
              </tr>
            </thead>
            <tbody>
              {mockAgendas.map((agenda) => (
                <tr key={agenda.id} className={`border-b border-gray-200 transition-colors ${selectedAgendaId === agenda.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                  <td className="px-4 py-3 border-r border-gray-200 text-gray-500">{agenda.id}</td>
                  <td className="px-4 py-3 border-r border-gray-200 text-gray-700">{agenda.round}</td>
                  <td className="px-4 py-3 border-r border-gray-200 text-gray-700">{agenda.date}</td>
                  <td className="px-6 py-3 border-r border-gray-200 text-gray-900 font-medium">{agenda.project}</td>
                  <td className="px-4 py-2">
                     <Button 
                        size="sm"
                        variant={selectedAgendaId === agenda.id ? "primary" : "outline"}
                        className={`h-7 px-3 text-[12px] font-bold shadow-none ${selectedAgendaId === agenda.id ? 'bg-[#3b5998] hover:bg-[#2b3a72] text-white border-none' : 'text-gray-700 border-gray-300 bg-white hover:bg-gray-50'}`}
                        onClick={() => setSelectedAgendaId(agenda.id)}
                     >
                        사건 목록
                     </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="flex items-center justify-center gap-2 mt-4">
           <Button variant="primary" className="w-8 h-8 rounded-full p-0 flex items-center justify-center bg-[#2b3a72] text-white font-bold border-none">1</Button>
           <Button variant="outline" className="w-8 h-8 rounded-full p-0 flex items-center justify-center border border-gray-200 bg-[#f8fafc] text-gray-600 font-bold hover:bg-gray-100">2</Button>
        </div>
      </div>

      {/* Table Area (Search Results) */}
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-[#1e3a8a] rounded-sm"></div>
          <h2 className="text-[15px] font-bold text-gray-800">검색 결과</h2>
          <span className="text-sm text-gray-500 ml-2">총 {currentCases.length}건</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm custom-scrollbar">
          <table className="w-full text-[13px] text-left whitespace-nowrap min-w-[1200px]">
            <thead className="text-[12px] text-gray-700 uppercase bg-slate-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-16">연번</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-24">심의차수</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-28">접수일</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-32">사건번호</th>
                <th className="px-6 py-3.5 text-center font-bold border-r border-gray-200">사업명</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-40">사업시행자</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-28">재결일</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-20">담당자</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-32">소유자</th>
                <th className="px-4 py-3.5 text-center font-bold border-r border-gray-200 w-32">관계인</th>
                <th className="px-6 py-3.5 text-center font-bold border-r border-gray-200 w-32">송달결과보기</th>
              </tr>
            </thead>
            <tbody>
              {currentCases.map((row, index) => (
                <tr 
                  key={row.id} 
                  className="bg-white border-b border-gray-200 hover:bg-blue-50/60 cursor-pointer transition-colors"
                  onClick={() => navigate(`/delivery/${row.id}/address`)}
                >
                  <td className="px-4 py-3 text-center text-gray-500 border-r border-gray-200">{index + 1}</td>
                  <td className="px-4 py-3 text-center text-gray-700 border-r border-gray-200">{row.round}</td>
                  <td className="px-4 py-3 text-center text-gray-600 border-r border-gray-200">{row.receiveDate}</td>
                  <td className="px-4 py-3 text-center font-medium text-black hover:underline border-r border-gray-200">{row.id}</td>
                  <td className="px-6 py-3 text-gray-900 border-r border-gray-200">{row.project}</td>
                  <td className="px-4 py-3 text-gray-600 border-r border-gray-200">{row.executor}</td>
                  <td className="px-4 py-3 text-center text-gray-500 border-r border-gray-200">{row.date}</td>
                  <td className="px-4 py-3 text-center text-gray-600 border-r border-gray-200">{row.manager}</td>
                  <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{row.owner}</td>
                  <td className="px-4 py-3 text-gray-700">{row.relation}</td>
                  <td className="px-4 py-3 border-r border-gray-200 text-center">
                    <Button
                     onClick={() => navigate(`/delivery/${row.id}/result`)}
                     ant="outline"
                     className="h-8 bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs border-none shadow-sm px-4"
                     >
                    송달결과보기  </Button>
                    </td>
                </tr>
              ))}
              {currentCases.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-6 py-12 text-center text-gray-500">
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
