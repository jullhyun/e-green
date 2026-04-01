import { useState } from "react";
import { useNavigate } from "react-router";
import { X } from "lucide-react";
import { Button, Input, Select, cn } from "../components/ui";

function ReceiptModal({ isOpen, onClose, data, onConfirm }: any) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#1e3a8a] w-full max-w-3xl flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#1e3a8a] text-white flex justify-between items-center px-4 py-2">
           <span className="font-bold text-sm tracking-wide">공시송달 - 공시송달 접수</span>
           <button onClick={onClose} className="hover:bg-white/20 p-0.5 rounded"><X className="w-4 h-4" /></button>
        </div>
        {/* Body */}
        <div className="p-5 flex flex-col gap-5">
           {/* 사건정보 */}
           <div className="flex gap-4">
              <div className="flex gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300">사건번호</div>
                 <Input readOnly value={data?.caseNo} className="h-8 border-blue-300 flex-1 text-xs rounded-none bg-white" />
              </div>
              <div className="flex gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300">사업명</div>
                 <Input readOnly value={data?.project} className="h-8 border-blue-300 flex-1 text-xs rounded-none bg-white" />
              </div>
           </div>

           {/* 첨부파일 */}
           <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                 <div className="bg-yellow-50 w-32 text-center text-xs font-bold py-1.5 border border-b-0 border-gray-300">첨부파일</div>
                 <div className="flex gap-1 border-b border-transparent">
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">추가</Button>
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">선택삭제</Button>
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">전체삭제</Button>
                 </div>
              </div>
              <div className="border border-blue-300 h-32 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-blue-50 transition-colors">
                 <span className="text-gray-400 font-bold text-lg tracking-widest">드래그 앤 드롭</span>
              </div>
           </div>

           {/* 대상자 목록 */}
           <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gray-700"></div>
                    <span className="text-[13px] font-bold text-gray-800 tracking-tight">공시송달대상자 목록</span>
                 </div>
                 <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">엑셀 내보내기</Button>
              </div>
              <table className="w-full text-center text-xs border border-gray-400">
                 <thead className="bg-gray-50 border-b border-gray-400">
                    <tr>
                       <th className="py-2.5 border-r border-gray-300 font-bold w-12">순번</th>
                       <th className="py-2.5 border-r border-gray-300 font-bold w-24">성명</th>
                       <th className="py-2.5 border-r border-gray-300 font-bold">주소</th>
                       <th className="py-2.5 border-r border-gray-300 font-bold">상세주소</th>
                       <th className="py-2.5 font-bold w-20">비고</th>
                    </tr>
                 </thead>
                 <tbody>
                    <tr className="border-b border-gray-200 bg-white">
                       <td className="py-2.5 border-r border-gray-200">1</td>
                       <td className="py-2.5 border-r border-gray-200 font-medium">{data?.target || "홍길동"}</td>
                       <td className="py-2.5 border-r border-gray-200">서울시 서초구</td>
                       <td className="py-2.5 border-r border-gray-200">방배동 52-10</td>
                       <td className="py-2.5"></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                       <td className="py-2.5 border-r border-gray-200">2</td>
                       <td className="py-2.5 border-r border-gray-200 font-medium">김철수</td>
                       <td className="py-2.5 border-r border-gray-200">서울시 강남구</td>
                       <td className="py-2.5 border-r border-gray-200">역삼동 123-45</td>
                       <td className="py-2.5"></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                       <td className="py-2.5 border-r border-gray-200">3</td>
                       <td className="py-2.5 border-r border-gray-200 font-medium">이영희</td>
                       <td className="py-2.5 border-r border-gray-200">서울시 송파구</td>
                       <td className="py-2.5 border-r border-gray-200">잠실동 67-89</td>
                       <td className="py-2.5"></td>
                    </tr>
                    <tr className="border-b border-gray-200 bg-white">
                       <td className="py-2.5 border-r border-gray-200">4</td>
                       <td className="py-2.5 border-r border-gray-200 font-medium">박민수</td>
                       <td className="py-2.5 border-r border-gray-200">경기도 성남시</td>
                       <td className="py-2.5 border-r border-gray-200">분당구 11-22</td>
                       <td className="py-2.5"></td>
                    </tr>
                    <tr className="bg-white">
                       <td className="py-2.5 border-r border-gray-200">5</td>
                       <td className="py-2.5 border-r border-gray-200 font-medium">정수진</td>
                       <td className="py-2.5 border-r border-gray-200">인천시 연수구</td>
                       <td className="py-2.5 border-r border-gray-200">송도동 33-44</td>
                       <td className="py-2.5"></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-center gap-4 py-5">
           <button onClick={() => onConfirm(data?.id)} className="bg-[#1e3a8a] text-white px-10 py-2 text-[13px] font-bold rounded-none shadow-sm hover:bg-blue-900 transition-colors">공시송달 접수</button>
           <button onClick={onClose} className="bg-[#1e3a8a] text-white px-10 py-2 text-[13px] font-bold rounded-none shadow-sm hover:bg-blue-900 transition-colors">닫기</button>
        </div>
      </div>
    </div>
  )
}

const districts = [
  "종로구", "중구", "용산구", "성동구", "광진구", "동대문구", "중랑구", "성북구", "강북구", "도봉구", 
  "노원구", "은평구", "서대문구", "마포구", "양천구", "강서구", "구로구", "금천구", "영등포구", "동작구", 
  "관악구", "서초구", "강남구", "송파구", "강동구"
];

function CompleteModal({ isOpen, onClose, data, onConfirm }: any) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [receiveDate, setReceiveDate] = useState("");
  
  const [targets, setTargets] = useState([
    { id: 1, name: data?.target || "홍길동", address: "서울시 서초구", detail: "방배동 52-10", district: "", sendDate: "", receiveDate: "", note: "" },
    { id: 2, name: "김철수", address: "서울시 강남구", detail: "역삼동 123-45", district: "", sendDate: "", receiveDate: "", note: "" },
    { id: 3, name: "이영희", address: "서울시 송파구", detail: "잠실동 67-89", district: "", sendDate: "", receiveDate: "", note: "" },
    { id: 4, name: "박민수", address: "경기도 성남시", detail: "분당구 11-22", district: "", sendDate: "", receiveDate: "", note: "" },
    { id: 5, name: "정수진", address: "인천시 연수구", detail: "송도동 33-44", district: "", sendDate: "", receiveDate: "", note: "" },
  ]);

  const handleApply = () => {
    setTargets(prev => prev.map(t => 
      ({ ...t, district: selectedDistrict, sendDate: sendDate, receiveDate: receiveDate })
    ));
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#1e3a8a] w-full max-w-4xl flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-[#1e3a8a] text-white flex justify-between items-center px-4 py-2">
           <span className="font-bold text-sm tracking-wide">공시송달 - 공시송달 완료</span>
           <button onClick={onClose} className="hover:bg-white/20 p-0.5 rounded"><X className="w-4 h-4" /></button>
        </div>
        {/* Body */}
        <div className="p-5 flex flex-col gap-5">
           {/* 사건정보 */}
           <div className="flex gap-4">
              <div className="flex gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300">사건번호</div>
                 <Input readOnly value={data?.caseNo} className="h-8 border-blue-300 flex-1 text-xs rounded-none bg-white" />
              </div>
              <div className="flex gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300">사업명</div>
                 <Input readOnly value={data?.project} className="h-8 border-blue-300 flex-1 text-xs rounded-none bg-white" />
              </div>
           </div>

           {/* 첨부파일 */}
           <div className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                 <div className="bg-yellow-50 w-32 text-center text-xs font-bold py-1.5 border border-b-0 border-gray-300">첨부파일</div>
                 <div className="flex gap-1 border-b border-transparent">
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">추가</Button>
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">선택삭제</Button>
                    <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">전체삭제</Button>
                 </div>
              </div>
              <div className="border border-blue-300 h-28 flex flex-col items-center justify-center bg-white cursor-pointer hover:bg-blue-50 transition-colors">
                 <span className="text-gray-400 font-bold text-lg tracking-widest">드래그 앤 드롭</span>
              </div>
           </div>

           {/* 날짜, 자치구 선택 행 */}
           <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300 h-8">발송일</div>
                 <Input type="date" value={sendDate} onChange={(e) => setSendDate(e.target.value)} className="h-8 border-blue-300 text-xs w-full rounded-none" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300 h-8">도달일</div>
                 <Input type="date" value={receiveDate} onChange={(e) => setReceiveDate(e.target.value)} className="h-8 border-blue-300 text-xs w-full rounded-none" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                 <div className="bg-yellow-50 text-gray-700 w-24 flex items-center justify-center text-xs font-bold border border-gray-300 h-8">자치구</div>
                 <Select 
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="h-8 border-blue-300 text-xs flex-1 rounded-none" 
                    options={[
                       {label: "자치구 선택", value: ""}, 
                       ...districts.map(d => ({label: d, value: d}))
                    ]} 
                 />
              </div>
              <Button variant="primary" onClick={handleApply} className="bg-[#1e3a8a] text-white h-8 px-6 text-xs font-bold rounded-none w-24 shrink-0">적용</Button>
           </div>

           {/* 대상자 목록 */}
           <div className="flex flex-col gap-2 mt-2">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-gray-700"></div>
                    <span className="text-[13px] font-bold text-gray-800 tracking-tight">공시송달대상자 목록</span>
                 </div>
                 <Button variant="primary" className="bg-[#1e3a8a] text-white h-7 px-4 text-[11px] font-bold rounded-none">엑셀 내보내기</Button>
              </div>
              <table className="w-full text-center text-xs border border-gray-400">
                 <thead className="bg-gray-50 border-b border-gray-400">
                    <tr>
                       <th rowSpan={2} className="py-1 border-r border-b border-gray-300 font-bold w-12">순번</th>
                       <th rowSpan={2} className="py-1 border-r border-b border-gray-300 font-bold w-20">성명</th>
                       <th rowSpan={2} className="py-1 border-r border-b border-gray-300 font-bold">주소</th>
                       <th rowSpan={2} className="py-1 border-r border-b border-gray-300 font-bold">상세주소</th>
                       <th rowSpan={2} className="py-1 border-r border-b border-gray-300 font-bold w-20">자치구</th>
                       <th colSpan={2} className="py-1 border-r border-b border-gray-300 font-bold bg-white">송달여부</th>
                       <th rowSpan={2} className="py-1 border-b border-gray-300 font-bold w-16">비고</th>
                    </tr>
                    <tr>
                       <th className="py-1 border-r border-gray-300 font-medium bg-white w-24 text-[11px]">발송일</th>
                       <th className="py-1 border-r border-gray-300 font-medium bg-white w-24 text-[11px]">도달일</th>
                    </tr>
                 </thead>
                 <tbody>
                    {targets.map((t, i) => (
                       <tr key={t.id} className="border-b border-gray-200 bg-white hover:bg-gray-50">
                          <td className="py-2 border-r border-gray-200">{i + 1}</td>
                          <td className="py-2 border-r border-gray-200 font-medium">{t.name}</td>
                          <td className="py-2 border-r border-gray-200">{t.address}</td>
                          <td className="py-2 border-r border-gray-200">{t.detail}</td>
                          <td className="py-2 border-r border-gray-200 text-blue-700 font-bold">{t.district}</td>
                          <td className="py-2 border-r border-gray-200 text-gray-700">{t.sendDate}</td>
                          <td className="py-2 border-r border-gray-200 text-gray-700">{t.receiveDate}</td>
                          <td className="py-2">{t.note}</td>
                       </tr>
                    ))}
                    {/* Empty rows filler */}
                    {Array.from({ length: 3 }).map((_, i) => (
                       <tr key={`empty-${i}`} className="border-b border-gray-200 bg-white">
                          <td className="py-2 border-r border-gray-200 text-transparent">0</td>
                          <td className="border-r border-gray-200"></td><td className="border-r border-gray-200"></td><td className="border-r border-gray-200"></td><td className="border-r border-gray-200"></td><td className="border-r border-gray-200"></td><td className="border-r border-gray-200"></td><td></td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-center gap-4 py-5">
           <button onClick={() => onConfirm(data?.id)} className="bg-[#1e3a8a] text-white px-10 py-2 text-[13px] font-bold rounded-none shadow-sm hover:bg-blue-900 transition-colors">공시송달 완료</button>
           <button onClick={onClose} className="bg-[#1e3a8a] text-white px-10 py-2 text-[13px] font-bold rounded-none shadow-sm hover:bg-blue-900 transition-colors">닫기</button>
        </div>
      </div>
    </div>
  )
}

const mockData = [
  { id: 1, caseNo: "26수용0001", project: "방배동 도로정비사업", manager: "박00", target: "홍길동",type: "소유자",address: "서울시 서초구",detail: "방배동 52-10", status: "미접수" },
  { id: 2, caseNo: "", project: "", manager: "", target: "", status: "" },
  { id: 3, caseNo: "", project: "", manager: "", target: "", status: "" },
  { id: 4, caseNo: "", project: "", manager: "", target: "", status: "" },
];

const mockDetails = {
  id: "26수용0001",
  round: "2026-1",
  project: "방배동도로개선사업",
  date: "2026.3.10",
  status: "진행중",
  manager: "박00"
};

export function PublicNotificationExport() {
  const [cases, setCases] = useState(mockData);
  const [modalConfig, setModalConfig] = useState<{type: "receipt" | "complete" | null, caseData: any}>({type: null, caseData: null});
  const navigate = useNavigate();

  const onReceiptConfirm = (caseId: number) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: "접수" } : c));
    setModalConfig({type: null, caseData: null});
  };

  const onCompleteConfirm = (caseId: number) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, status: "완료" } : c));
    setModalConfig({type: null, caseData: null});
  };

  return (
    <div className="flex flex-col gap-6 w-full relative min-h-screen bg-white">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b pb-4 mt-2">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">공시송달 - 공시송달대상</h1>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)} 
          className="border-gray-300 text-gray-700 font-bold bg-white shadow-sm hover:bg-gray-50 h-9 px-5"
        >
          이전단계
        </Button>
      </div>

      {/* Search Area */}
      <div className="bg-white border-2 border-[#1e3a8a] rounded-t-lg overflow-hidden">
         <table className="w-full text-sm text-center border-collapse">
            <tbody>
               <tr className="border-b border-gray-200">
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">심의차수</th>
                  <td className="py-2 px-4 border-r border-gray-200 w-[15%] bg-white">{mockDetails.round}</td>
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">심의상태</th>
                  <td className="py-2 px-4 border-r border-gray-200 w-[15%] bg-white">{mockDetails.status}</td>
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200 w-[10%]">심의일자</th>
                  <td className="py-2 px-4 w-[15%] bg-white">{mockDetails.date}</td>
               </tr>
               <tr className="border-b border-gray-200">
                  <th className="bg-blue-50/50 font-bold text-gray-700 py-3 px-4 border-r border-gray-200">사업명</th>
                  <td colSpan={7} className="py-2 px-4 bg-white text-left font-bold text-gray-900">{mockDetails.project}</td>
               </tr>
            </tbody>
         </table>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 flex items-center justify-between shadow-sm rounded-sm">
         <div className="flex items-center gap-4">
            <span className="font-bold text-gray-700 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">검색</span>
            <Select 
               className="w-32 bg-white"
               options={[{label: "전체", value: "all"}, {label: "접수", value: "receipt"}, {label: "완료", value: "complete"}]}
            />
            <Input className="h-9 w-64 bg-white border-blue-300" />
            <Button variant="primary" className="bg-[#1e3a8a] font-bold px-6 shadow-sm">검색</Button>
         </div>

         <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">
               {["전체", "선택 사건", "내 사건"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer">
                     <input 
                        type="radio" 
                        name="target" 
                        defaultChecked={opt === "전체"}
                        className="text-blue-600 focus:ring-blue-500" 
                     />
                     <span className={cn("text-sm font-medium", opt === "전체" ? "text-blue-700 font-bold" : "text-gray-600")}>{opt}</span>
                  </label>
               ))}
            </div>
            
            <Button variant="outline" className="border-gray-800 text-gray-800 bg-white hover:bg-gray-100 font-bold shadow-sm">
               엑셀 다운로드
            </Button>
         </div>
      </div><div className="flex items-center justify-between mb-3 mt-6">
  <div className="flex items-center gap-2">

    
  </div>
  
  <div className="flex items-center gap-2">
    {/* A 영역: 클릭 시 7P 팝업 오픈 [cite: 184, 186] */}
    <Button 
      className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold h-9 px-5 rounded-sm shadow-sm text-[13px]"
      onClick={() => setModalConfig({ type: 'receipt', caseData: cases[0] })} 
    >
      접수용 첨부파일 등록 
    </Button>

    {/* B 영역: 클릭 시 8P 팝업 오픈 [cite: 188, 190] */}
    <Button 
      className="bg-[#1e3a8a] hover:bg-blue-800 text-white font-bold h-9 px-5 rounded-sm shadow-sm text-[13px]"
      onClick={() => setModalConfig({ type: 'complete', caseData: cases[0] })}
    >
      자치구 첨부파일 등록
    </Button>

    <Button variant="outline" className="border-gray-800 text-gray-800 font-bold h-9 px-4 text-[13px]">
      엑셀 내보내기
    </Button>
  </div>
</div>

      {/* Main Table */}
      <div className="flex flex-col mt-4">
         <div className="flex items-center gap-2 mb-3 px-2">
            <div className="w-2.5 h-2.5 bg-yellow-400"></div>
            <h3 className="font-bold text-gray-800 text-[15px]">공시송달 대상자</h3>
         </div>

         <div className="border border-gray-300 bg-white">
            <table className="w-full text-center text-xs">
               <thead className="bg-[#9ca3af] text-white border-b border-gray-400">
                  <tr>
                     <th rowSpan={2} className="border-r border-white py-3.5 px-2 w-12 font-bold">순번</th>
                     <th rowSpan={2} className="border-r border-white py-3.5 px-2 w-12 font-bold">선택</th>
                     <th rowSpan={2} className="border-r border-white py-3.5 px-4 w-32 font-bold">사건번호</th>
                     <th rowSpan={2} className="border-r border-white py-3.5 px-4 font-bold">사업명</th>
                     <th rowSpan={2} className="border-r border-white py-3.5 px-4 w-20 font-bold">담당자</th>
                     <th colSpan={4} className="border-r border-white py-2 px-4 font-bold bg-[#6b7280]">공시송달 대상자</th>                  
                     <th rowSpan={2} className="py-3.5 px-4 w-24 font-bold">진행상태</th>
                  </tr>
                  <tr className="bg-[#e5e7eb] text-gray-700">
                     <th className="border-r border-t border-white py-2 px-3 text-[11px] font-bold whitespace-nowrap">구분</th>
                     <th className="border-r border-t border-white py-2 px-3 text-[11px] font-bold whitespace-nowrap">성명</th>
                     <th className="border-r border-t border-white py-2 px-3 text-[11px] font-bold whitespace-nowrap">주소</th>
                     <th className="border-r border-t border-white py-2 px-3 text-[11px] font-bold whitespace-nowrap">상세주소</th>
                  </tr>
               </thead>
               <tbody>
                  {cases.map((row, index) => (
                     <tr key={row.id} className="border-b border-gray-200 bg-[#f8fafc] hover:bg-gray-100 transition-colors">
                        <td className="border-r border-gray-200 py-3">{index + 1}</td>
                        <td className="border-r border-gray-200 py-3">
                           {row.caseNo && <input type="checkbox" className="w-3 h-3 text-[#1e3a8a]" defaultChecked={index === 0} />}
                           {!row.caseNo && <input type="checkbox" className="w-3 h-3 text-[#1e3a8a]" />}
                        </td>
                        <td className="border-r border-gray-200 py-3 text-gray-800 font-medium">{row.caseNo}</td>
                        <td className="border-r border-gray-200 py-3 text-gray-800font-medium">{row.project}</td>
                        <td className="border-r border-gray-200 py-3 text-gray-800 font-medium">{row.manager}</td>
                        <td className="py-3 border-r border-gray-200 bg-slate-50/50 font-medium">{row.type}</td>
                        <td className="py-3 border-r border-gray-200 bg-slate-50/50 font-medium">{row.target}</td>
                        <td className="py-3 border-r border-gray-200 bg-slate-50/50 font-medium">{row.address}</td>
                        <td className="py-3 border-r border-gray-200 bg-slate-50/50 font-medium">{row.detail}</td>
                        
                        
                        <td className={cn(
                           "py-3 font-bold",
                           row.status === '미접수' ? "bg-[#ffe4e6] text-red-600" :
                           row.status === '접수' ? "bg-blue-50 text-blue-600" :
                           row.status === '완료' ? "bg-gray-100 text-gray-600" : "bg-[#ffe4e6]"
                        )}>
                           {row.status}
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <ReceiptModal 
         isOpen={modalConfig.type === 'receipt'} 
         onClose={() => setModalConfig({type: null, caseData: null})} 
         data={modalConfig.caseData} 
         onConfirm={onReceiptConfirm} 
      />
      
      <CompleteModal 
         isOpen={modalConfig.type === 'complete'} 
         onClose={() => setModalConfig({type: null, caseData: null})} 
         data={modalConfig.caseData} 
         onConfirm={onCompleteConfirm} 
      />
    </div>
  );
}
