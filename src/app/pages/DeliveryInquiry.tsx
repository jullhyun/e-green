import { useState, Fragment } from "react";
import { useNavigate } from "react-router";
import { Download, X, ListCollapse } from "lucide-react";
import { Button, Input, Select, Badge, cn } from "../components/ui";
import { InPersonReceiptModal } from "../components/InPersonReceiptModal";

const mockCases = [
  { id: "26수용0001", round: "2026-1", date: "2026.01.05", project: "방배동 도로정비사업", status: "완료" },
  { id: "26수용0002", round: "2026-2", date: "2026.02.10", project: "강남역 사거리 확장", status: "미완료" },
  { id: "26수용0003", round: "2026-3", date: "2026.03.15", project: "송파구 주거환경개선", status: "진행중" },
  { id: "26수용0004", round: "2026-4", date: "2026.04.20", project: "여의도 복합개발사업", status: "진행중" },
];

const mockOwnerCases = [
  { id: "26수용0001", round: "2026-1", date: "2026.01.05", project: "방배동 도로정비사업", owner: "김둘리 외 3인", relation: "홍길동 외 1인", agent: "이몽룡" },
  { id: "26수용0002", round: "2026-2", date: "2026.02.10", project: "강남역 사거리 확장", owner: "박문수 외 2인", relation: "김선달", agent: "-" },
  { id: "26수용0003", round: "2026-3", date: "2026.03.15", project: "송파구 주거환경개선", owner: "이순신", relation: "-", agent: "성춘향 외 1인" },
  { id: "26수용0004", round: "2026-4", date: "2026.04.20", project: "여의도 복합개발사업", owner: "강감찬 외 5인", relation: "유관순 외 2인", agent: "-" },
];

const mockInquiries = [
  { id: 1, type: "소유자", name: "홍길동", address: "서울시 서초구", detail: "방배동 52-10", zip: "06000", trackingNo: "1111-2222-3333", s1Date: "26.01.01", s1Res: "본인수령", s2Date: "", s2Res: "", s3Date: "", s3Res: "", s4Date: "", s4Res: "", activePhase: 1 },
  { id: 2, type: "관계인", name: "김둘리", address: "서울시 강남구", detail: "역삼동 10-2", zip: "06001", trackingNo: "1111-2222-3334", s1Date: "26.01.01", s1Res: "폐문부재", s2Date: "26.02.01", s2Res: "대리수령", s3Date: "", s3Res: "", s4Date: "", s4Res: "", activePhase: 2 },
  { id: 3, type: "소유자", name: "박문수", address: "서울시 종로구", detail: "사직동 10", zip: "06002", trackingNo: "1111-2222-3335", s1Date: "26.01.01", s1Res: "폐문부재", s2Date: "26.02.01", s2Res: "폐문부재", s3Date: "26.03.01", s3Res: "공시완료", s4Date: "", s4Res: "", activePhase: 3 },
  { id: 4, type: "소유자", name: "이몽룡", address: "서울시 마포구", detail: "잠실동 100", zip: "06003", trackingNo: "1111-2222-3336", s1Date: "26.01.01", s1Res: "수취거절", s2Date: "26.02.01", s2Res: "이사불명", s3Date: "26.03.01", s3Res: "진행중", s4Date: "26.04.01", s4Res: "방문수령 완료", activePhase: 4 },
];

export function DeliveryInquiry() {
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [showInPersonModal, setShowInPersonModal] = useState(false);
  const [inPersonCaseData, setInPersonCaseData] = useState<any>(null);
  const [searchMode, setSearchMode] = useState<"case" | "owner">("case");
  const navigate = useNavigate();
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  // [추가] 모달을 여는 함수
  const openCertificateModal = (row: any) => {
    setSelectedRowData(row);
    setShowCertificateModal(true);
  };
  
  const realTimeLink = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=2027278003144&displayHeader=N#";
  const logLink = "https://service.epost.go.kr/trace.RetrieveDomRigiTraceList.comm?sid1=2027278002940&displayHeader=N#";

  const handleInPersonClick = (row: any) => {
    setInPersonCaseData({
      ...row,
      id: selectedCase.id,
      project: selectedCase.project,
      status: row.s4Res === "방문수령 완료" ? "방문수령완료" : "송달중"
    });
    setShowInPersonModal(true);
  };

  if (selectedCase) {
    return (
      <div className="flex flex-col gap-6 w-full max-w-[1500px] mx-auto pb-10 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800 tracking-tight">e송달결과정보조회 - 상세내용</h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => setSelectedCase(null)} 
            className="border-gray-300 text-gray-700 font-bold bg-white shadow-sm hover:bg-gray-50 h-9 px-5"
          >
            이전단계
          </Button>
        </div>

        <div className="flex flex-col gap-6">
           {/* Top Summary Form */}
           <div className="border-[1.5px] border-[#1e3a8a] rounded-md overflow-hidden text-[13px] bg-white w-full shadow-sm grid grid-cols-[100px_1fr_100px_1fr_100px_1fr_100px_1fr]">
              {/* Row 1 */}
              <div className="bg-[#f4f7fb] text-gray-700 font-bold flex items-center justify-center py-2.5 border-b border-r border-gray-200">심의차수</div>
              <div className="py-2.5 px-4 flex items-center justify-center text-gray-700 border-b border-r border-gray-200">{selectedCase.round}</div>
              <div className="bg-[#f4f7fb] text-gray-700 font-bold flex items-center justify-center py-2.5 border-b border-r border-gray-200">사건번호</div>
              <div className="py-2.5 px-4 flex items-center justify-center text-black font-medium border-b border-r border-gray-200">{selectedCase.id}</div>
              <div className="bg-[#f4f7fb] text-gray-700 font-bold flex items-center justify-center py-2.5 border-b border-r border-gray-200">심의일자</div>
              <div className="py-2.5 px-4 flex items-center justify-center text-gray-700 border-b border-r border-gray-200">{selectedCase.date}</div>
              <div className="bg-[#f4f7fb] text-gray-700 font-bold flex items-center justify-center py-2.5 border-b border-r border-gray-200">담당자</div>
              <div className="py-2.5 px-4 flex items-center justify-center text-gray-700 border-b border-gray-200">박00</div>

              {/* Row 2 */}
              <div className="bg-[#f4f7fb] text-gray-700 font-bold flex items-center justify-center py-2.5 border-b border-r border-gray-200">사업명</div>
              <div className="col-span-7 py-2.5 px-6 font-bold text-gray-800 border-b border-gray-200 flex items-center">{selectedCase.project}</div>

              {/* Row 3 */}
              <div className="bg-[#fefce8] text-gray-700 font-bold flex items-center justify-center py-2.5 border-r border-gray-200">소유자</div>
              <div className="col-span-3 py-2.5 px-4 flex items-center justify-center text-gray-700 border-r border-gray-200">홍길동 외 3인</div>
              <div className="bg-[#fefce8] text-gray-700 font-bold flex items-center justify-center py-2.5 border-r border-gray-200">관계인</div>
              <div className="col-span-3 py-2.5 px-4 flex items-center justify-center text-gray-700">김둘리 외 3인</div>
           </div>

           {/* Complex Targets Table */}
           <div className="flex flex-col gap-2">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-4 bg-[#1e3a8a] rounded-sm"></div>
                 <h2 className="text-[15px] font-bold text-gray-800">송달대상자</h2>
               </div>
               
               <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 bg-white h-8 text-xs font-bold px-3 flex items-center gap-1.5 shadow-sm">
                  <Download className="w-3.5 h-3.5" /> 엑셀 내보내기
               </Button>
             </div>

             <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm custom-scrollbar">
               <table className="w-full text-center whitespace-nowrap text-xs min-w-[1500px]">
                 <thead className="bg-slate-100 border-b border-gray-300 text-gray-700">
                    {/* Row 1 */}
                    <tr>
                       <th rowSpan={3} className="px-2 py-2 font-bold border-r border-b border-gray-300 w-10">순번</th>
                       <th rowSpan={3} className="px-2 py-2 font-bold border-r border-b border-gray-300 w-14">구분</th>
                       <th rowSpan={3} className="px-3 py-2 font-bold border-r border-b border-gray-300 w-16">성명</th>
                       <th rowSpan={3} className="px-4 py-2 font-bold border-r border-b border-gray-300 w-32 text-left">주소</th>
                       <th rowSpan={3} className="px-4 py-2 font-bold border-r border-b border-gray-300 w-40 text-left">상세주소</th>
                       <th rowSpan={3} className="px-3 py-2 font-bold border-r border-b border-gray-300 w-24">등기번호</th>
                       
                       <th colSpan={8} className="px-2 py-2 font-bold border-r border-b border-gray-300 bg-slate-200/50 text-[13px]">송달상태</th>
                       
                       <th rowSpan={3} className="px-2 py-2 font-bold border-r border-b border-gray-300 w-20 bg-slate-200/50">상세보기</th>
                       <th rowSpan={3} className="px-2 py-2 font-bold border-b border-gray-300 w-24 bg-slate-200/50">방문수령등록</th>
                    </tr>
                    {/* Row 2 */}
                    <tr>
                       <th colSpan={2} className="px-1 py-1.5 font-bold border-r border-b border-gray-300 bg-slate-50 text-[12px]">송달</th>
                       <th colSpan={2} className="px-1 py-1.5 font-bold border-r border-b border-gray-300 bg-slate-50 text-[12px]">재송달</th>
                       <th colSpan={2} className="px-1 py-1.5 font-bold border-r border-b border-gray-300 bg-slate-50 text-[12px]">공시송달</th>
                       <th colSpan={2} className="px-1 py-1.5 font-bold border-r border-b border-gray-300 bg-slate-50 text-[12px]">방문수령</th>
                    </tr>
                    {/* Row 3 */}
                    <tr>
                       {[...Array(4)].map((_, i) => (
                          <Fragment key={i}>
                             <th className="px-1.5 py-1.5 font-bold border-r border-b border-gray-300 bg-white text-[11px] text-gray-500">일자</th>
                             <th className="px-1.5 py-1.5 font-bold border-r border-b border-gray-300 bg-white text-[11px] text-gray-500">결과</th>
                          </Fragment>
                       ))}
                    </tr>
                 </thead>
                 <tbody>
                    {mockInquiries.map((row, index) => {
                       const ResultCell = ({ date, res, phase }: { date: string, res: string, phase: number }) => (
                          <Fragment>
                             <td className="px-1.5 py-3 border-r border-b border-gray-200 text-[11px] text-gray-700 font-medium align-middle">{date}</td>
                             <td className="px-1.5 py-2 border-r border-b border-gray-200 bg-slate-50/30 align-middle min-w-[70px]">
                                <div className="flex flex-col items-center justify-center gap-1.5">
                                   <span className={cn("font-bold text-[12px]", res === "본인수령" || res === "대리수령" || res === "방문수령 완료" ? "text-green-600" : res ? "text-blue-700" : "")}>
                                      {res}
                                   </span>
                                   {res && row.activePhase === phase && (phase === 1 || phase === 2) && (
                                      <div className="flex gap-1 justify-center w-full">
                                         <a href={realTimeLink} target="_blank" rel="noreferrer" className="text-[10px] bg-[#92d050] text-gray-900 font-bold rounded-sm border border-[#689934] px-1 py-0.5 leading-none hover:bg-[#82bd47] transition-colors">실시간</a>
                                         <span className="text-[10px] bg-gray-200 text-gray-500 font-bold rounded-sm border border-gray-300 px-1 py-0.5 leading-none cursor-not-allowed">로그</span>
                                      </div>
                                   )}
                                   {phase === 4 && res === "방문수령 완료" && (
                                      <Button 
                                         size="sm" 
                                         variant="outline" 
                                         className="h-6 text-[11px] font-bold border-blue-400 text-blue-700 bg-white hover:bg-blue-50 px-2 mt-0.5"
                                         onClick={() => handleInPersonClick(row)}
                                      >
                                         수령증
                                      </Button>
                                   )}
                                </div>
                             </td>
                          </Fragment>
                       );

                       return (
                       <tr key={row.id} className="bg-white hover:bg-blue-50/40 transition-colors">
                         <td className="px-2 py-3 text-gray-500 border-r border-b border-gray-200 align-middle">{index + 1}</td>
                         <td className="px-2 py-3 border-r border-b border-gray-200 align-middle">
                            <Badge variant={row.type === "소유자" ? "info" : "warning"} className="text-[10px] px-1.5 py-0.5">{row.type}</Badge>
                         </td>
                         <td className="px-3 py-3 font-bold text-gray-900 border-r border-b border-gray-200 align-middle">{row.name}</td>
                         <td className="px-4 py-3 text-gray-700 text-left border-r border-b border-gray-200 truncate max-w-[120px] align-middle">{row.address}</td>
                         <td className="px-4 py-3 text-gray-600 text-left border-r border-b border-gray-200 truncate max-w-[150px] align-middle">{row.detail}</td>
                         <td className="px-3 py-3 font-mono text-blue-600 font-medium border-r border-b border-gray-200 align-middle">{row.trackingNo}</td>
                         
                         <ResultCell date={row.s1Date} res={row.s1Res} phase={1} />
                         <ResultCell date={row.s2Date} res={row.s2Res} phase={2} />
                         <ResultCell date={row.s3Date} res={row.s3Res} phase={3} />
                         <ResultCell date={row.s4Date} res={row.s4Res} phase={4} />

                         <td className="px-2 py-2 border-r border-b border-gray-200 align-middle">
                           <Button 
                            size="sm" 
                            variant="outline" 
                            className={cn(
                            "h-7 w-full text-[11px] font-bold shadow-sm px-1",
                             !(row.s1Res?.includes("수령") || row.s2Res?.includes("수령"))
                             ? "bg-gray-100 text-gray-400 border-gray-200" 
                             : "text-gray-700 bg-white border-gray-300 hover:bg-gray-100"
                             )}
                            disabled={!(row.s1Res?.includes("수령") || row.s2Res?.includes("수령"))}
                            onClick={() => openCertificateModal(row)}
                            >
                            송달확인서
                            </Button>
                         </td>
                         <td className="px-2 py-2 border-b border-gray-200 align-middle">
                            <Button 
                               size="sm" 
                               variant="primary" 
                               className="h-7 w-full text-[11px] font-bold text-white bg-slate-700 hover:bg-slate-800 flex items-center justify-center shadow-sm px-1 border-none"
                               onClick={() => handleInPersonClick(row)}
                            >
                               방문수령등록
                            </Button>
                         </td>
                       </tr>
                    )})}
                 </tbody>
               </table>
             </div>
           </div>
        </div>

        <InPersonReceiptModal 
          isOpen={showInPersonModal} 
          onClose={() => setShowInPersonModal(false)} 
          caseData={inPersonCaseData} 
        />
        {/* [새로 추가] 송달확인서 모달 UI */}
        {showCertificateModal && selectedRowData && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white rounded-md shadow-2xl w-[1000px] max-w-full max-h-[95vh] overflow-hidden flex flex-col border border-gray-200">
              {/* 모달 상단바 */}
              <div className="bg-[#1e3a8a] px-4 py-3 flex justify-between items-center text-white shrink-0">
                <h2 className="font-bold text-lg">송달확인서 오픈</h2>
                <button onClick={() => setShowCertificateModal(false)} className="hover:bg-white/20 p-1 rounded-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* 모달 내용부 (이미지 디자인 반영) */}
              <div className="p-6 flex flex-col gap-6 bg-slate-50 overflow-y-auto">
                <div className="flex gap-4">
                  {/* 왼쪽 요약 정보 */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex items-center border border-gray-300 bg-white shadow-sm">
                      <div className="w-32 bg-yellow-50 px-4 py-2 font-bold text-gray-700 text-center border-r border-gray-300">송달내역</div>
                      <div className="flex-1 px-4 py-2 font-bold text-blue-700 border-r border-gray-300">송달자명</div>
                      <div className="w-32 px-4 py-2 text-center font-medium">{selectedRowData.name}</div>
                    </div>
                    <div className="bg-white border border-gray-300 p-8 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
                       <p className="text-gray-400 font-medium">송달 상세 내역 테이블 영역</p>
                    </div>
                  </div>

                  {/* 오른쪽 서식 영역 */}
                  <div className="w-[450px] shrink-0 border border-gray-300 bg-white shadow-md flex flex-col px-10 py-12 text-black">
                    <h2 className="text-2xl tracking-[0.5em] text-center font-normal mb-10 underline decoration-1 underline-offset-8">우편송달확인서</h2>
                    <div className="space-y-6 text-sm">
                       <div className="flex border-b border-black pb-2 items-center">
                          <span className="w-24 font-bold bg-gray-100 py-1 px-2 text-center mr-4 border border-gray-300">수 취 인</span>
                          <span className="text-lg">{selectedRowData.name}</span>
                       </div>
                       <div className="flex border-b border-black pb-2 items-center">
                          <span className="w-24 font-bold bg-gray-100 py-1 px-2 text-center mr-4 border border-gray-300">등기번호</span>
                          <span className="font-mono text-blue-600 text-lg">{selectedRowData.trackingNo}</span>
                       </div>
                       <div className="flex border-b border-black pb-2 items-center">
                          <span className="w-24 font-bold bg-gray-100 py-1 px-2 text-center mr-4 border border-gray-300">주 소</span>
                          <span className="flex-1 leading-tight">{selectedRowData.address} {selectedRowData.detail}</span>
                       </div>
                    </div>
                    <div className="mt-12 border border-black h-40 flex items-center justify-center text-gray-300 italic bg-slate-50/50">
                       (수령인 서명란)
                    </div>
                  </div>
                </div>
                
                {/* 하단 버튼 바 */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button onClick={() => setShowCertificateModal(false)} variant="outline" className="border-gray-300 font-bold px-6">닫기</Button>
                  <Button className="bg-[#1e3a8a] text-white font-bold px-10 shadow-sm" onClick={() => window.print()}>인쇄</Button>
                </div>
              </div>
            </div>
          </div>
        )}
   
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full relative pb-10">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">e송달결과정보조회</h1>
      </div>

      {/* Main Search */}
      <div className="bg-[#f8fafc] p-5 rounded-lg border border-slate-200 shadow-sm flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
         <div className="flex items-center gap-4 flex-wrap text-sm whitespace-nowrap">
            <span className="font-bold text-gray-700 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">검색</span>
            
            {searchMode === "case" ? (
               <Select options={[{label: "사업명", value: "project"}, {label: "심의차수", value: "round"}]} className="w-32 bg-white h-9" />
            ) : (
               <Select options={[{label: "전체", value: "all"}, {label: "소유자", value: "owner"}, {label: "관계인", value: "relation"}, {label: "대리인", value: "agent"}]} className="w-32 bg-white h-9" />
            )}
            
            <div className="flex items-center gap-4 bg-white px-3 py-2 border border-gray-300 rounded shadow-sm">
               <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="scope" defaultChecked className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" /><span className="font-medium text-gray-700">전체</span></label>
               <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="scope" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" /><span className="font-medium text-gray-700">내 사건</span></label>
            </div>

            <div className="flex items-center gap-4 bg-white px-3 py-2 border border-gray-300 rounded shadow-sm">
               <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="status" defaultChecked className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" /><span className="font-medium text-gray-700">전체</span></label>
               <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="status" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" /><span className="font-medium text-gray-700">완료</span></label>
               <label className="flex items-center gap-1.5 cursor-pointer"><input type="radio" name="status" className="w-3.5 h-3.5 text-blue-600 focus:ring-blue-500" /><span className="font-medium text-gray-700">미완료</span></label>
            </div>
            
            <Input className="w-64 bg-white h-9" placeholder="검색어 입력" />
         </div>
         
         <Button variant="primary" className="bg-[#1e3a8a] text-sm h-9 px-8 font-bold shadow-sm whitespace-nowrap">조회</Button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-300">
        <button
          className={cn(
            "px-6 py-3 font-bold text-sm border-b-2 transition-colors",
            searchMode === "case" ? "border-[#1e3a8a] text-[#1e3a8a]" : "border-transparent text-gray-500 hover:text-gray-800"
          )}
          onClick={() => setSearchMode("case")}
        >
          사건기반검색
        </button>
        <button
          className={cn(
            "px-6 py-3 font-bold text-sm border-b-2 transition-colors",
            searchMode === "owner" ? "border-[#1e3a8a] text-[#1e3a8a]" : "border-transparent text-gray-500 hover:text-gray-800"
          )}
          onClick={() => setSearchMode("owner")}
        >
          소유자기반검색
        </button>
      </div>

      {/* Main List */}
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-4 bg-[#1e3a8a] rounded-sm"></div>
          <h2 className="text-[15px] font-bold text-gray-800">조회 결과</h2>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white shadow-sm custom-scrollbar">
          <table className="w-full text-center whitespace-nowrap text-sm min-w-[900px]">
            <thead className="bg-slate-100 border-b border-gray-300 text-gray-700">
              <tr>
                <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-16">순번</th>
                <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-32">심의차수</th>
                <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-32">심의일자</th>
                <th className="px-4 py-3.5 font-bold border-r border-gray-300">사업명</th>
                <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-48">사건번호</th>
                {searchMode === "owner" && (
                  <>
                    <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-32">소유자</th>
                    <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-32">관계인</th>
                    <th className="px-4 py-3.5 font-bold border-r border-gray-300 w-32">대리인</th>
                  </>
                )}
                <th className="px-4 py-3.5 font-bold w-32">상세보기</th>
              </tr>
            </thead>
            <tbody>
              {(searchMode === "case" ? mockCases : mockOwnerCases).map((c: any, i) => (
                <tr key={c.id} className="border-b border-gray-200 hover:bg-slate-50/50 transition-colors">
                   <td className="px-4 py-3 border-r border-gray-200 text-gray-500">{i + 1}</td>
                   <td className="px-4 py-3 border-r border-gray-200 text-gray-700">{c.round}</td>
                   <td className="px-4 py-3 border-r border-gray-200 text-gray-700">{c.date}</td>
                   <td className="px-4 py-3 border-r border-gray-200 font-bold text-gray-900">{c.project}</td>
                   <td className="px-4 py-3 border-r border-gray-200 font-medium text-black">{c.id}</td>
                   {searchMode === "owner" && (
                     <>
                       <td className="px-4 py-3 border-r border-gray-200 text-gray-800">{c.owner}</td>
                       <td className="px-4 py-3 border-r border-gray-200 text-gray-800">{c.relation}</td>
                       <td className="px-4 py-3 border-r border-gray-200 text-gray-800">{c.agent}</td>
                     </>
                   )}
                   <td className="px-4 py-2.5">
                      <Button 
                         onClick={() => setSelectedCase(c)} 
                         variant="outline" 
                         className="h-8 w-full bg-slate-700 hover:bg-slate-800 text-white font-bold text-xs border-none shadow-sm flex items-center justify-center gap-1"
                      >
                         <ListCollapse className="w-3.5 h-3.5" /> 상세보기
                      </Button>
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