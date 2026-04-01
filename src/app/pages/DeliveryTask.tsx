import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";
import { useNavigate } from "react-router";

export function DeliveryTask() {
  const navigate = useNavigate();
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

  const handleCellClick = (rowId: number, colId: string) => {
    const key = `${rowId}-${colId}`;
    setSelectedCells((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const isCellSelected = (rowId: number, colId: string) => {
    return selectedCells.has(`${rowId}-${colId}`);
  };

  return (
    <div className="w-full flex gap-4">
      {/* Left Panel - Main Form */}
      <div className="flex-1 bg-white border border-[#19335A] shadow-md flex flex-col">
        {/* Fake Window Header */}
        <div className="h-8 bg-[#19335A] flex justify-between items-center px-2 text-white shrink-0">
          <div className="text-sm font-bold">제목 | 송달관리-e송달결과</div>
          <div className="flex items-center space-x-4 text-xs mr-2">
            <span>버전</span>
            <span>V3.0</span>
            <span>페이지</span>
            <span>4</span>
            <div className="flex space-x-2 ml-2">
              <button className="hover:bg-white/20 p-0.5 rounded">
                <Minus size={14} />
              </button>
              <button className="hover:bg-white/20 p-0.5 rounded">
                <Square size={14} />
              </button>
              <button className="hover:bg-white/20 p-0.5 rounded">
                <X size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Top Info Bar */}
        <div className="flex items-center border-b border-[#ccc] text-xs">
          <div className="px-4 py-2 border-r border-[#ccc] min-w-[100px] text-center bg-[#f5f5f5]">
            이슈 ID
          </div>
          <div className="flex-1 px-4 py-2 border-r border-[#ccc]"></div>
          <div className="px-4 py-2 border-r border-[#ccc] min-w-[80px] text-center bg-[#f5f5f5]">
            내용
          </div>
          <div className="flex-1 px-4 py-2"></div>
        </div>

        <div className="p-4 flex-1 flex flex-col gap-4 text-[#333] text-[13px]">
          {/* Identifier Input Section */}
          <div className="flex items-center gap-2">
            <div className="bg-[#fff3cd] px-3 py-1.5 border border-[#e0e0e0] font-medium min-w-[60px] text-center">
              식별자는
            </div>
            <input
              type="text"
              className="border border-[#ccc] px-2 py-1.5 flex-1 outline-none focus:border-[#19335A]"
            />
            <div className="bg-[#fff3cd] px-3 py-1.5 border border-[#e0e0e0] font-medium min-w-[60px] text-center">
              시건번호
            </div>
            <input
              type="text"
              className="border border-[#ccc] px-2 py-1.5 w-32 outline-none focus:border-[#19335A]"
            />
            <div className="bg-[#fff3cd] px-3 py-1.5 border border-[#e0e0e0] font-medium min-w-[60px] text-center">
              사업명
            </div>
            <input
              type="text"
              className="border border-[#ccc] px-2 py-1.5 flex-1 outline-none focus:border-[#19335A]"
            />
            <button className="bg-[#19335A] hover:bg-[#112444] text-white px-4 py-1.5 font-medium transition-colors">
              버튼
            </button>
          </div>

          {/* Radio Button Group */}
          <div className="flex items-center gap-4">
            <div className="bg-[#fff3cd] px-3 py-1.5 border border-[#e0e0e0] font-medium min-w-[60px] text-center">
              결과
            </div>
            <div className="flex items-center space-x-4 border border-[#ccc] px-4 py-1.5 bg-white">
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="resultType"
                  defaultChecked
                  className="w-3.5 h-3.5 text-[#19335A] focus:ring-1 focus:ring-[#19335A]"
                />
                <span>방문수령</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="resultType"
                  className="w-3.5 h-3.5 text-[#19335A] focus:ring-1 focus:ring-[#19335A]"
                />
                <span>전체</span>
              </label>
              <label className="flex items-center space-x-1 cursor-pointer">
                <input
                  type="radio"
                  name="resultType"
                  className="w-3.5 h-3.5 text-[#19335A] focus:ring-1 focus:ring-[#19335A]"
                />
                <span>선택</span>
              </label>
            </div>
            <button className="bg-[#19335A] hover:bg-[#112444] text-white px-4 py-1.5 font-medium transition-colors ml-auto">
              엑셀 내보내기
            </button>
          </div>

          {/* Delivery Status Table */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center">
              <div className="bg-[#fff3cd] px-3 py-1 text-[#333] font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-[#19335A] inline-block"></span>
                송달현상자
              </div>
            </div>

            <div className="border border-[#ccc] overflow-x-auto">
              <table className="w-full border-collapse text-[12px] whitespace-nowrap">
                <thead>
                  <tr className="bg-[#f0f0f0] border-b border-[#ccc]">
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-12">순번</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-16">구분</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-20">성명</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-16">주소</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-28">상세주소</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-24">관할동</th>
                    <th className="border-r border-[#ccc] py-1.5 px-2 font-medium w-24">동기준일</th>
                    <th colSpan={7} className="border-r border-[#ccc] py-1.5 px-2 font-medium bg-[#e8f4f8]">
                      송달
                    </th>
                    <th colSpan={7} className="border-r border-[#ccc] py-1.5 px-2 font-medium bg-[#fff3cd]">
                      재송달
                    </th>
                    <th className="py-1.5 px-2 font-medium w-16">비고</th>
                  </tr>
                  <tr className="bg-[#f0f0f0] border-b border-[#ccc]">
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1.5 px-1"></th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">발신</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">열람</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">부재</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">수령</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">우편</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">민원</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">주소</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">발신</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">열람</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">부재</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">수령</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">우편</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">민원</th>
                    <th className="border-r border-[#ccc] py-1 px-1 font-medium text-[11px] w-14">주소</th>
                    <th className="py-1 px-1 font-medium text-[11px]"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#ccc]">
                    <td className="border-r border-[#ccc] py-2 px-2 text-center">1</td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center bg-[#fff3cd]">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center font-bold text-[10px]">
                          A
                        </div>
                        <span>통보필</span>
                      </div>
                    </td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center bg-[#ffdddd]">
                      <div className="flex items-center justify-center gap-1">
                        <div className="w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center font-bold text-[10px]">
                          C
                        </div>
                        <span>홍길동</span>
                      </div>
                    </td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center">1</td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center bg-[#ffdddd]">건설부</td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center bg-[#ffdddd]">
                      방부면 인00
                    </td>
                    <td className="border-r border-[#ccc] py-2 px-2 text-center">4</td>
                    {/* Delivery columns */}
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-1") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-1")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-2") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-2")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-3") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-3")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-4") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-4")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-5") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-5")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-6") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-6")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "del-7") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "del-7")}
                    ></td>
                    {/* Re-delivery columns */}
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-1") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-1")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-2") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-2")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-3") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-3")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-4") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-4")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-5") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-5")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-6") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-6")}
                    ></td>
                    <td
                      className={`border-r border-[#ccc] py-2 px-1 text-center cursor-pointer hover:bg-blue-50 ${
                        isCellSelected(1, "redel-7") ? "bg-red-200" : ""
                      }`}
                      onClick={() => handleCellClick(1, "redel-7")}
                    ></td>
                    <td className="py-2 px-1 text-center relative">
                      <div className="w-6 h-6 bg-[#333] text-white rounded flex items-center justify-center text-[10px] font-medium mx-auto cursor-pointer hover:bg-[#555]">
                        보기
                      </div>
                    </td>
                  </tr>
                  {[2, 3, 4].map((idx) => (
                    <tr key={idx} className="border-b border-[#ccc]">
                      <td className="border-r border-[#ccc] py-2 px-2 text-center">{idx}</td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-2"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="border-r border-[#ccc] py-2 px-1"></td>
                      <td className="py-2 px-1"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Description */}
      <div className="w-80 bg-white border border-[#ccc] shadow-sm">
        <div className="bg-[#5a5a5a] text-white text-center py-2 font-medium text-sm">
          Description
        </div>
        <div className="divide-y divide-[#ccc]">
          <div className="p-3 flex">
            <div className="bg-[#5a5a5a] text-white text-center py-1 px-2 mr-3 font-medium text-xs min-w-[30px]">
              No
            </div>
            <div className="flex-1 text-xs leading-relaxed">
              <div className="font-bold mb-1">A</div>
              <div className="text-gray-700">경색 필터 [주소, 소유자, 관계인, 대리인]</div>
            </div>
          </div>
          <div className="p-3 flex">
            <div className="bg-[#5a5a5a] text-white text-center py-1 px-2 mr-3 font-medium text-xs min-w-[30px]">
              B
            </div>
            <div className="flex-1 text-xs leading-relaxed">
              <div className="text-gray-700">방문수령페이지[9]오픈</div>
            </div>
          </div>
          <div className="p-3 flex">
            <div className="bg-[#5a5a5a] text-white text-center py-1 px-2 mr-3 font-medium text-xs min-w-[30px]">
              C
            </div>
            <div className="flex-1 text-xs leading-relaxed">
              <div className="font-bold mb-1">구분 표시</div>
              <div className="text-gray-700">소유자, 관계인, 대리인</div>
            </div>
          </div>
          <div className="p-3 flex">
            <div className="bg-[#5a5a5a] text-white text-center py-1 px-2 mr-3 font-medium text-xs min-w-[30px]">
              D
            </div>
            <div className="flex-1 text-xs leading-relaxed">
              <div className="text-gray-700">
                우정국 데이터 기준 방문 회차별 표기 불가는 안됨 방문 결과 데이터만 표기 예정
              </div>
            </div>
          </div>
          <div className="p-3 flex">
            <div className="bg-[#5a5a5a] text-white text-center py-1 px-2 mr-3 font-medium text-xs min-w-[30px]">
              E
            </div>
            <div className="flex-1 text-xs leading-relaxed">
              <div className="text-gray-700">
                송달 확인서 팝업띄는 송달확인서 오픈 저장으로 PDF저장/ 인쇄로 인쇄지원
                별도 팝업화면시 확인 • 불러온 송달확인서 확인
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}