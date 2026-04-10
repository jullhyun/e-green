import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ChevronRight, Download, X } from "lucide-react";
import { Button, Input, Select, Badge, cn } from "../components/ui";

const mockResults = [
  { id: 1, type: "소유자", name: "홍길동", address: "서울시 서초구", detail: "방배동 52-10", zip: "06700", trackingNo: "1111-2222-3333", delivery: { date: "2026.03.20", result: "본인수령", receiver: "홍길동", relation: "본인", relationName: "본인" }, redelivery: { date: "", result: "", receiver: "", relation: "", relationName: "" } },
  { id: 2, type: "관계인", name: "김둘리", address: "서울시 강남구", detail: "역삼동 10-2", zip: "06200", trackingNo: "1111-2222-3334", delivery: { date: "2026.03.21", result: "부재중", receiver: "", relation: "", relationName: "" }, redelivery: { date: "2026.03.23", result: "수령", receiver: "김철수", relation: "배우자", relationName: "가족" } },
  { id: 3, type: "대리인", name: "법무법인00", address: "서울시 종로구", detail: "삼청동 15", zip: "03000", trackingNo: "1111-2222-3335", delivery: { date: "2026.03.22", result: "대리수령", receiver: "이대리", relation: "배우자", relationName: "가족" }, redelivery: { date: "", result: "", receiver: "", relation: "", relationName: "" } },
];

export function DeliveryResults() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [targetType, setTargetType] = useState("전체");
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = (rowId: number) => {
    setSelectedRow(rowId);
    setShowModal(true);
  };

  const selectedData = mockResults.find(r => r.id === selectedRow);

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800 tracking-tight">송달관리 - e송달결과</h1>
          <ChevronRight className="w-5 h-5 text-gray-400" />
          <span className="text-lg font-medium text-gray-600">{id}</span>
        </div>
        <Button 
          variant="outline" 
          onClick={() => navigate(`/delivery/${id}/work`)} 
          className="border-gray-300 text-gray-700 font-bold bg-white shadow-sm hover:bg-gray-50 h-9 px-5"
        >
          이전단계
        </Button>
      </div>

      {/* Top Search Form Area */}
      <div className="bg-white border-2 border-[#1e3a8a] rounded-t-lg p-5 flex flex-col gap-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-50 px-4 py-2 font-bold text-gray-700 border border-gray-200 min-w-[100px] text-center">심의차수</span>
            <Input className="w-32 bg-white" placeholder="2026-1" />
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-yellow-50 px-4 py-2 font-bold text-gray-700 border border-gray-200 min-w-[100px] text-center">사건번호</span>
            <Input className="w-48 bg-white" placeholder={id || ""} />
          </div>
          <div className="flex items-center gap-3 flex-1">
            <span className="bg-yellow-50 px-4 py-2 font-bold text-gray-700 border border-gray-200 min-w-[100px] text-center">사업명</span>
            <Input className="flex-1 bg-white" placeholder="방배동도로개선사업" />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-gray-700 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm">검색</span>
            <Select 
               className="w-32 bg-white"
               options={[{label: "주소", value: "address"}, {label: "소유자", value: "owner"}, {label: "관계인", value: "relation"}, {label: "대리인", value: "proxy"}]}
            />
            <Input className="w-80 bg-white" placeholder="검색어 입력" />
            <Button variant="primary" className="bg-[#1e3a8a] font-bold px-6 shadow-sm">검색</Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="primary" className="bg-[#1e3a8a] hover:bg-blue-800 font-bold shadow-sm" onClick={() => navigate('/in-person')}>
               방문수령
            </Button>
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
            <Button variant="outline" className="border-gray-800 text-gray-800 bg-white hover:bg-gray-100 font-bold shadow-sm flex items-center gap-2">
               <Download className="w-4 h-4" />
               엑셀 내보내기
            </Button>
          </div>
        </div>
      </div>

      {/* Targets Table */}
      <div className="flex flex-col gap-2 mt-4">
         <div className="flex items-center gap-2">
            <div className="w-2 h-4 bg-[#1e3a8a] rounded-sm"></div>
            <h3 className="font-bold text-gray-800 text-[15px]">송달대상자</h3>
         </div>
         <div className="overflow-x-auto border border-gray-300 bg-white shadow-sm custom-scrollbar">
            <table className="w-full text-[13px] text-center min-w-[1400px] whitespace-nowrap">
               <thead className="text-gray-700 bg-slate-100 border-b border-gray-300">
                  <tr>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-10">선택</th>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-12">순번</th>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-16">구분</th>
                     <th rowSpan={2} className="px-3 py-2 font-bold border-r border-gray-300 w-24">성명</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-40">주소</th>
                     <th rowSpan={2} className="px-4 py-2 font-bold border-r border-gray-300 w-32">상세주소</th>
                     <th rowSpan={2} className="px-2 py-2 font-bold border-r border-gray-300 w-20">우편번호</th>
                     <th rowSpan={2} className="px-3 py-2 font-bold border-r border-gray-300 w-32">등기번호</th>
                     <th colSpan={5} className="px-2 py-2 font-bold border-r border-gray-300 border-b border-gray-300 bg-blue-50/50">송달</th>
                     <th colSpan={5} className="px-2 py-2 font-bold border-r border-gray-300 border-b border-gray-300 bg-orange-50/50">재송달</th>
                     <th rowSpan={2} className="px-2 py-2 font-bold w-20">버튼</th>
                  </tr>
                  <tr className="text-[12px]">
                     
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">일자</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">결과</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">수령인</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">수령인관계</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">수령인관계명</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">일자</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">결과</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-20">수령인</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">수령인관계</th>
                     <th className="px-2 py-1.5 font-bold border-r border-gray-300 bg-white w-24">수령인관계명</th>
                  </tr>
               </thead>
               <tbody>
                  {mockResults.map((row, index) => (
                     <tr key={row.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                        <td className="px-2 py-3 text-center border-r border-gray-200">
                        <input type="checkbox" className="w-4 h-4" />
                         </td>
                        <td className="px-2 py-3 text-gray-500 border-r border-gray-200">{index + 1}</td>
                        <td className="px-2 py-3 border-r border-gray-200">
                           <Badge variant={row.type === "소유자" ? "danger" : row.type === "관계인" ? "warning" : "default"} className={cn(
                              "text-[11px] px-2 py-0.5 rounded-sm font-bold",
                              row.type === "소유자" ? "bg-red-100 text-red-700 border-red-200" : 
                              row.type === "관계인" ? "bg-orange-100 text-orange-800 border-orange-200" :
                              "bg-amber-100 text-amber-800 border-amber-200"
                           )}>
                              {row.type}
                           </Badge>
                        </td>
                        <td className="px-3 py-3 font-bold text-gray-900 border-r border-gray-200">{row.name}</td>
                        <td className="px-4 py-3 text-gray-700 text-left border-r border-gray-200 truncate max-w-[150px]">{row.address}</td>
                        <td className="px-4 py-3 text-gray-600 text-left border-r border-gray-200 truncate max-w-[120px]">{row.detail}</td>
                        <td className="px-2 py-3 text-gray-600 border-r border-gray-200">{row.zip}</td>
                        <td className="px-3 py-3 font-mono text-blue-600 border-r border-gray-200">{row.trackingNo}</td>
                        
                        {/* 송달 */}
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.delivery.date}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.delivery.result}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.delivery.receiver}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.delivery.relation}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.delivery.relationName}</td>
                        
                        {/* 재송달 */}
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.redelivery.date}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.redelivery.result}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.redelivery.receiver}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.redelivery.relation}</td>
                        <td className="px-2 py-3 text-gray-700 border-r border-gray-200">{row.redelivery.relationName}</td>
                        
                        <td className="px-2 py-3">
                           <Button 
                              variant="primary" 
                              size="sm" 
                              className="h-7 px-2 text-[11px] font-bold bg-[#4a0404] hover:bg-[#3a0303] text-white rounded-sm shadow-sm"
                              onClick={() => openModal(row.id)}
                           >
                              확인서
                           </Button>
                        </td>
                     </tr>
                  ))}
                  {/* Empty rows filler */}
                  {Array.from({ length: 3 }).map((_, i) => (
                     <tr key={`empty-${i}`} className="bg-white border-b h-12">
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td className="border-r border-gray-200"></td>
                        <td></td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Modal E - 송달확인서 */}
      {showModal && selectedData && (
         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-md shadow-2xl w-[1000px] max-w-full max-h-[95vh] overflow-hidden flex flex-col">
               {/* Modal Header */}
               <div className="bg-[#1e3a8a] px-4 py-3 flex justify-between items-center text-white shrink-0">
                  <h2 className="font-bold text-lg">송달확인서 오픈</h2>
                  <button onClick={() => setShowModal(false)} className="hover:bg-white/20 p-1 rounded-sm transition-colors">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="p-6 flex flex-col gap-6 bg-slate-50 overflow-y-auto">
                  <div className="flex gap-4">
                     {/* Left - Details Table */}
                     <div className="flex-1 flex flex-col gap-4">
                        <div className="flex items-center">
                           <div className="w-32 bg-yellow-50 px-4 py-2 border border-gray-300 font-bold text-gray-700 text-center text-sm shadow-sm">
                              송달내역
                           </div>
                           <div className="flex-1 px-4 py-2 border border-gray-300 bg-white font-bold text-blue-700 text-sm shadow-sm border-l-0">
                              송달자명
                           </div>
                           <div className="w-32 px-4 py-2 border border-gray-300 bg-white font-medium text-gray-900 text-sm shadow-sm border-l-0 text-center">
                              {selectedData.name}
                           </div>
                        </div>

                        <div className="border border-gray-300 bg-white shadow-sm flex">
                           {/* 송달 Column */}
                           <div className="flex-1 border-r border-gray-300">
                              <div className="bg-slate-100 py-2 text-center font-bold text-gray-700 border-b border-gray-300 text-sm">
                                 송달
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">일자</div>
                                 <div className="py-2 px-2 text-center">{selectedData.delivery.date || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">결과</div>
                                 <div className="py-2 px-2 text-center text-blue-600 font-medium">{selectedData.delivery.result || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">수령인</div>
                                 <div className="py-2 px-2 text-center">{selectedData.delivery.receiver || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">수령인관계</div>
                                 <div className="py-2 px-2 text-center">{selectedData.delivery.relation || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px]">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium tracking-tight whitespace-nowrap">수령인관계명</div>
                                 <div className="py-2 px-2 text-center">{selectedData.delivery.relationName || "-"}</div>
                              </div>
                           </div>
                           
                           {/* 재송달 Column */}
                           <div className="flex-1">
                              <div className="bg-slate-100 py-2 text-center font-bold text-gray-700 border-b border-gray-300 text-sm">
                                 재송달
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">일자</div>
                                 <div className="py-2 px-2 text-center">{selectedData.redelivery.date || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">결과</div>
                                 <div className="py-2 px-2 text-center font-medium">{selectedData.redelivery.result || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">수령인</div>
                                 <div className="py-2 px-2 text-center">{selectedData.redelivery.receiver || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px] border-b border-gray-200">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium">수령인관계</div>
                                 <div className="py-2 px-2 text-center">{selectedData.redelivery.relation || "-"}</div>
                              </div>
                              <div className="grid grid-cols-[100px_1fr] text-[13px]">
                                 <div className="bg-gray-50 py-2 px-1 border-r border-gray-200 text-center font-medium tracking-tight whitespace-nowrap">수령인관계명</div>
                                 <div className="py-2 px-2 text-center">{selectedData.redelivery.relationName || "-"}</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     
                     {/* Right - Certificate Preview */}
                     <div className="w-[420px] shrink-0 border border-gray-300 bg-white shadow-md flex flex-col px-8 py-10">
                        <h2 className="text-2xl tracking-[0.5em] text-center font-normal mb-8 text-black ml-2">우편송달확인서</h2>

                        {/* 발송인/수취인 정보 */}
                        <div className="mb-6">
                           <h3 className="text-[13px] font-bold flex items-center gap-2 mb-2 text-black">
                              <span className="w-[10px] h-[10px] bg-white border-[1.5px] border-black inline-block flex-shrink-0 relative after:content-[''] after:absolute after:inset-[1px] after:bg-black"></span>
                              발송인/ 수취인 정보
                           </h3>
                           <table className="w-full border-collapse border border-black text-[12px] text-black">
                              <tbody>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center w-28">발 송 인</td>
                                    <td className="border border-black py-2.5 px-3">중앙토지수용위원회</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">수 취 인</td>
                                    <td className="border border-black py-2.5 px-3">{selectedData.name}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        {/* 발송 정보 */}
                        <div className="mb-6">
                           <h3 className="text-[13px] font-bold flex items-center gap-2 mb-2 text-black">
                              <span className="w-[10px] h-[10px] bg-white border-[1.5px] border-black inline-block flex-shrink-0 relative after:content-[''] after:absolute after:inset-[1px] after:bg-black"></span>
                              발송 정보
                           </h3>
                           <table className="w-full border-collapse border border-black text-[12px] text-black">
                              <tbody>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center w-28">사 업 명</td>
                                    <td className="border border-black py-2.5 px-3">서울시 도로건설공사</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">사건번호</td>
                                    <td className="border border-black py-2.5 px-3">26수용1234</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">담 당 자</td>
                                    <td className="border border-black py-2.5 px-3">보상1계(김철수)</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">의 뢰 일</td>
                                    <td className="border border-black py-2.5 px-3">2026-03-10</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        {/* 배달 정보 */}
                        <div className="mb-6">
                           <h3 className="text-[13px] font-bold flex items-center gap-2 mb-2 text-black">
                              <span className="w-[10px] h-[10px] bg-white border-[1.5px] border-black inline-block flex-shrink-0 relative after:content-[''] after:absolute after:inset-[1px] after:bg-black"></span>
                              배달 정보
                           </h3>
                           <table className="w-full border-collapse border border-black text-[12px] text-black">
                              <tbody>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center w-28">등기번호</td>
                                    <td className="border border-black py-2.5 px-3">{selectedData.trackingNo}</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">주 소</td>
                                    <td className="border border-black py-2.5 px-3">{selectedData.address} {selectedData.detail}</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">배달국명</td>
                                    <td className="border border-black py-2.5 px-3">서울중앙우체국</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">집배원명</td>
                                    <td className="border border-black py-2.5 px-3">이우체</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">배 달 일</td>
                                    <td className="border border-black py-2.5 px-3">
                                       {selectedData.delivery.date.replace(/\./g, "")} {selectedData.delivery.result && selectedData.delivery.result !== "부재중" ? "1430" : ""}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">수 령 인</td>
                                    <td className="border border-black py-2.5 px-3">
                                       {selectedData.delivery.receiver ? `${selectedData.delivery.receiver}(${selectedData.delivery.relation})` : ""}
                                    </td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 px-3 text-center">배달결과</td>
                                    <td className="border border-black py-2.5 px-3">{selectedData.delivery.result || ""}</td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>

                        {/* 서명란 */}
                        <div className="mt-4 flex justify-center pb-2">
                           <table className="border-collapse border border-black text-[12px] w-[160px] text-black">
                              <tbody>
                                 <tr>
                                    <td className="border border-black bg-gray-200/50 py-2.5 text-center">수령인 서명</td>
                                 </tr>
                                 <tr>
                                    <td className="border border-black h-[120px] text-center relative overflow-hidden bg-white align-middle">
                                       {selectedData.delivery.receiver && selectedData.delivery.result !== "부재중" ? (
                                          <div className="font-[cursive] text-4xl font-bold italic tracking-tighter opacity-80 -rotate-12">
                                             {selectedData.delivery.receiver}
                                          </div>
                                       ) : ""}
                                    </td>
                                 </tr>
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-2">
                     <Button variant="primary" className="bg-[#1e3a8a] text-white font-bold w-32 shadow-sm">
                        PDF저장
                     </Button>
                     <Button variant="primary" className="bg-[#1e3a8a] text-white font-bold w-32 shadow-sm">
                        인쇄
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
