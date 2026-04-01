import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Search, Download } from "lucide-react";
import { Button, Select, Badge, Input, cn } from "../components/ui";

const mockDetails = {
  id: "26수용0001",
  round: "2026-1",
  project: "방배동도로개선사업",
  date: "2026.3.10",
  manager: "박00",
  owner: "홍길동 외 3인",
  relation: "김둘리 외 3인",
};

const mockExecutor = {
  id: 1,
  date: "2026.3.12",
  name: "방배동재개발조합",
  address: "서울시 서초구 방배동",
  detail: "방배로 52",
  registeredAddress: "서울시 서초구 방배동",
};

const mockAddresses = [
  { id: 1, type: "소유자", name: "홍길동", address: "서울시 서초구", detail: "52-10", dispatchStatus: "반송", proxyName: "법무법인00", proxyAddress: "서울시 강서구", proxyDetail: "등촌동 689" },
  { id: 2, type: "관계인", name: "김둘리", address: "서울시 강남구", detail: "10-2", dispatchStatus: "미발송", proxyName: "없음", proxyAddress: "-", proxyDetail: "-" },
  { id: 3, type: "소유자", name: "이몽룡", address: "서울시 종로구", detail: "15", dispatchStatus: "미발송", proxyName: "없음", proxyAddress: "-", proxyDetail: "-" },
];

export function DeliveryAddressCheck() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState("전체");
  const [targetType, setTargetType] = useState("전체");
  const [ownerRelationFilter, setOwnerRelationFilter] = useState("전체");
  
  const [addressSelections, setAddressSelections] = useState<Record<number, string>>(
    mockAddresses.reduce((acc, row) => ({ ...acc, [row.id]: row.type }), {})
  );

  const handleSelectionChange = (id: number, value: string) => {
    setAddressSelections(prev => ({ ...prev, [id]: value }));
  };

  const filteredAddresses = mockAddresses.filter(row => {
    if (ownerRelationFilter === "전체") return true;
    return row.type === ownerRelationFilter;
  });

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">송달관리 - 송달주소 확인</h1>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <span className="text-lg font-medium text-gray-600">{id}</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate("/delivery")} 
          className="border-gray-300 text-gray-700 font-bold bg-white shadow-sm hover:bg-gray-50 h-9 px-5"
        >
          이전단계
        </Button>
      </div>

      {/* Info Header Table Style */}
      <div className="bg-white border-2 border-[#1e3a8a] rounded-t-lg overflow-hidden">
         <table className="w-full text-sm text-center border-collapse">
            <tbody>
               <tr className="border-b border-gray-200">
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">심의차수</th>
                  <td className="py-3 px-4 border-r border-gray-200 w-[15%] bg-white">{mockDetails.round}</td>
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">사건번호</th>
                  <td className="py-3 px-4 border-r border-gray-200 w-[15%] font-medium text-black bg-white">{mockDetails.id}</td>
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">심의일자</th>
                  <td className="py-3 px-4 border-r border-gray-200 w-[15%] bg-white">{mockDetails.date}</td>
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">담당자</th>
                  <td className="py-3 px-4 w-[15%] bg-white">{mockDetails.manager}</td>
               </tr>
               <tr className="border-b border-gray-200">
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200">사업명</th>
                  <td colSpan={7} className="py-3 px-4 text-left font-bold text-gray-900 bg-white">{mockDetails.project}</td>
               </tr>
               <tr>
                  <th className="bg-yellow-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200">소유자</th>
                  <td colSpan={3} className="py-3 px-4 font-medium text-gray-900 border-r border-gray-200 bg-white">{mockDetails.owner}</td>
                  <th className="bg-yellow-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200">관계인</th>
                  <td colSpan={3} className="py-3 px-4 font-medium text-gray-900 bg-white">{mockDetails.relation}</td>
               </tr>
            </tbody>
         </table>
      </div>

      {/* Search Filter Area */}
      <div className="bg-gray-50 border border-gray-200 p-4 flex items-center justify-between shadow-sm rounded-sm">
         <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">검색</span>
            <Select 
               className="w-32 bg-white"
               options={[{label: "소유자", value: "name"},{label: "관계인", value: "name"}, {label: "주소", value: "address"}, {label: "대리인명", value: "proxy"}]}
            />
            <Input 
               className="w-64 bg-white"
               placeholder="검색어를 입력하세요"
            />
            {/* 109행 시작 */}
<div className="flex items-center gap-2.5 bg-white px-2 py-2 border border-gray-300 rounded shadow-sm h-9">
  {["전체", "미송달", "반송", "송달완료"].map((opt) => (
    <label key={opt} className="flex items-center gap-1 cursor-pointer shrink-0">
      <input
        type="radio"
        name="filter_status"
        checked={filterType === opt}
        onChange={() => setFilterType(opt)}
        className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500"
      />
      <span className={cn(
        "text-[12px] font-medium whitespace-nowrap transition-colors", 
        filterType === opt ? "text-blue-700 font-bold" : "text-gray-600"
      )}>
        {opt}
      </span>
    </label>
  ))}
</div>
            <Button variant="primary" className="bg-[#1e3a8a] font-bold px-6 shadow-sm">검색</Button>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">
               {["전체", "선택"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                     <input 
                        type="radio" 
                        name="filter_target" 
                        checked={targetType === opt}
                        onChange={() => setTargetType(opt)}
                        className="text-blue-600 focus:ring-blue-500" 
                     />
                     <span className={cn("text-sm font-medium", targetType === opt ? "text-blue-700 font-bold" : "text-gray-600")}>{opt}</span>
                  </label>
               ))}
            </div>
            
            <Button variant="outline" className="border-gray-800 text-gray-800 bg-white hover:bg-gray-100 font-bold shadow-sm">
               엑셀 내보내기
            </Button>
            <Button 
               variant="primary" 
               className="bg-[#1e3a8a] hover:bg-blue-800 font-bold shadow-sm"
               onClick={() => navigate(`/delivery/${id}/work`)}
            >
               e송달작업하기
            </Button>
         </div>
      </div>

      {/* Executor Table */}
      <div className="flex flex-col gap-2 mt-4">
         <div className="flex items-center gap-2">
            <div className="w-2 h-4 bg-yellow-400 rounded-sm"></div>
            <h3 className="font-bold text-gray-800 text-[15px]">사업시행자</h3>
         </div>
         <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm custom-scrollbar">
            <table className="w-full text-sm text-center whitespace-nowrap">
               <thead className="text-xs text-gray-700 uppercase bg-slate-100 border-b border-gray-300">
                  <tr>
                     <th className="px-4 py-3 font-bold border-r border-gray-300 w-16">순번</th>
                     <th className="px-4 py-3 font-bold border-r border-gray-300 w-32">접수일</th>
                     <th className="px-4 py-3 font-bold border-r border-gray-300 w-48">사업시행자</th>
                     <th className="px-4 py-3 font-bold border-r border-gray-300">주소</th>
                     <th className="px-4 py-3 font-bold">상세주소</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="bg-white">
                     <td className="px-4 py-3 text-gray-500 border-r border-gray-200">{mockExecutor.id}</td>
                     <td className="px-4 py-3 text-gray-600 border-r border-gray-200">{mockExecutor.date}</td>
                     <td className="px-4 py-3 font-bold text-gray-900 border-r border-gray-200">{mockExecutor.name}</td>
                     <td className="px-4 py-3 text-gray-700 border-r border-gray-200">{mockExecutor.address}</td>
                     <td className="px-4 py-3 text-gray-600">{mockExecutor.detail}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* Targets Table */}
      <div className="flex flex-col gap-2 mt-4">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-4 bg-yellow-400 rounded-sm"></div>
                  <h3 className="font-bold text-gray-800 text-[15px]">소유자 / 관계인</h3>
               </div>
               
               <div className="flex items-center gap-3 bg-white px-3 py-1.5 border border-gray-300 rounded shadow-sm">
                  {["전체", "소유자", "관계인"].map((opt) => (
                     <label key={opt} className="flex items-center gap-1.5 cursor-pointer">
                        <input 
                           type="radio" 
                           name="filter_owner_relation" 
                           checked={ownerRelationFilter === opt}
                           onChange={() => setOwnerRelationFilter(opt)}
                           className="text-blue-600 focus:ring-blue-500 w-3.5 h-3.5" 
                        />
                        <span className={cn("text-sm", ownerRelationFilter === opt ? "font-bold text-blue-700" : "font-medium text-gray-600")}>{opt}</span>
                     </label>
                  ))}
               </div>
            </div>
            
            <Button variant="outline" className="h-8 px-4 text-sm font-bold border-[#2b3a72] text-[#2b3a72] bg-white hover:bg-slate-50 shadow-sm">
               상태저장
            </Button>
         </div>
         <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm custom-scrollbar">
            <table className="w-full text-sm text-center min-w-[1200px] whitespace-nowrap">
               <thead className="text-xs text-gray-700 bg-slate-100 border-b border-gray-300">
                  <tr>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-10">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                     </th>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-12">순번</th>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-16">구분</th>
                     <th rowSpan={2} className="px-3 py-2 font-bold border-r border-gray-300 w-24">성명</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-48">주소</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-32">상세주소</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-24">발송상태</th>
                     <th colSpan={3} className="px-4 py-2 font-bold border-r border-gray-300 border-b border-gray-300 bg-slate-50">대리인</th>
                     <th colSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 border-b border-gray-300 bg-slate-50">E송달 주소선택</th>
                     <th rowSpan={2} className="px-3 py-2 font-bold w-28">송달받을주소</th>
                  </tr>
                  <tr>
                     <th className="px-3 py-1.5 font-bold border-r border-gray-300 bg-white">대리인명</th>
                     <th className="px-4 py-1.5 font-bold border-r border-gray-300 bg-white">주소</th>
                     <th className="px-4 py-1.5 font-bold border-r border-gray-300 bg-white">상세주소</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white">소유자</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white">대리인</th>
                  </tr>
               </thead>
               <tbody>
                  {filteredAddresses.map((row, index) => (
                     <tr key={row.id} className="bg-white border-b hover:bg-gray-50/50 transition-colors">
                        <td className="px-2 py-3 border-r border-gray-200">
                           <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300" />
                        </td>
                        <td className="px-2 py-3 text-gray-500 border-r border-gray-200">{index + 1}</td>
                        <td className="px-2 py-3 border-r border-gray-200">
                           <Badge variant={row.type === "소유자" ? "danger" : "warning"} className={cn(
                              "text-[11px] px-2 py-0.5 rounded-sm font-bold",
                              row.type === "소유자" ? "bg-red-100 text-red-700 border-red-200" : "bg-yellow-100 text-yellow-800 border-yellow-200"
                           )}>
                              {row.type}
                           </Badge>
                        </td>
                        <td className="px-3 py-3 font-bold text-gray-900 border-r border-gray-200">{row.name}</td>
                        <td className="px-4 py-3 text-gray-700 text-left border-r border-gray-200">{row.address}</td>
                        <td className="px-4 py-3 text-gray-600 text-left border-r border-gray-200">{row.detail}</td>
                        <td className="px-4 py-3 text-gray-800 font-medium border-r border-gray-200">{row.dispatchStatus}</td>
                        <td className="px-3 py-3 text-gray-800 border-r border-gray-200 font-medium">{row.proxyName}</td>
                        <td className="px-4 py-3 text-gray-700 text-left border-r border-gray-200">{row.proxyAddress}</td>
                        <td className="px-4 py-3 text-gray-600 text-left border-r border-gray-200">{row.proxyDetail}</td>
                        
                        <td className="px-2 py-3 border-r border-gray-200 bg-red-50/30">
                           <input 
                              type="radio" 
                              name={`dest_${row.id}`} 
                              checked={addressSelections[row.id] === row.type}
                              onChange={() => handleSelectionChange(row.id, row.type)}
                              className="w-3.5 h-3.5 text-blue-600 cursor-pointer" 
                           />
                        </td>
                        <td className="px-2 py-3 border-r border-gray-200 bg-red-50/30">
                           <input 
                              type="radio" 
                              name={`dest_${row.id}`} 
                              disabled={!row.proxyName} 
                              checked={addressSelections[row.id] === "대리인"}
                              onChange={() => handleSelectionChange(row.id, "대리인")}
                              className="w-3.5 h-3.5 text-blue-600 cursor-pointer" 
                           />
                        </td>
                        
                        <td className="px-3 py-3 font-bold text-gray-900">
                           {addressSelections[row.id]}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
