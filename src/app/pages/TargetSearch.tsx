import React, { useState } from "react";
import { Minus, Square, X } from "lucide-react";

export function TargetSearch() {
  const [searchOption, setSearchOption] = useState("my");

  return (
    <div className="w-full max-w-5xl mx-auto bg-white border border-[#19335A] shadow-md flex flex-col">
      {/* Fake Window Header */}
      <div className="h-8 bg-[#19335A] flex justify-between items-center px-2 text-white shrink-0">
        <div className="text-sm font-bold"></div>
        <div className="flex space-x-2">
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

      <div className="p-4 flex-1 flex flex-col gap-6 text-[#333] text-[13px]">
        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <div className="bg-[#fff3cd] px-3 py-1.5 border border-[#e0e0e0] font-medium min-w-[60px] text-center">
            검색
          </div>
          <select className="border border-[#ccc] px-2 py-1.5 min-w-[120px] bg-white outline-none focus:border-[#19335A]">
            <option>사업명</option>
            <option>사건번호</option>
          </select>
          <div className="border border-[#ccc] px-3 py-1.5 flex items-center space-x-4 bg-white">
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="my"
                checked={searchOption === "my"}
                onChange={(e) => setSearchOption(e.target.value)}
                className="w-3.5 h-3.5 text-[#19335A] focus:ring-1 focus:ring-[#19335A]"
              />
              <span>내사건</span>
            </label>
            <label className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="searchType"
                value="all"
                checked={searchOption === "all"}
                onChange={(e) => setSearchOption(e.target.value)}
                className="w-3.5 h-3.5 text-[#19335A] focus:ring-1 focus:ring-[#19335A]"
              />
              <span>전체</span>
            </label>
          </div>
          <input
            type="text"
            className="flex-1 border border-[#ccc] px-2 py-1.5 outline-none focus:border-[#19335A]"
          />
          <button className="bg-[#19335A] hover:bg-[#112444] text-white px-6 py-1.5 font-medium transition-colors">
            검색
          </button>
        </div>

        {/* Results Section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <div className="bg-[#fff3cd] px-3 py-1 text-[#333] font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-[#19335A] inline-block"></span>
              검색 결과
            </div>
          </div>

          <div className="border border-[#ccc] overflow-x-auto">
            <table className="w-full text-center border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-[#f0f0f0] border-b border-[#ccc] text-gray-700">
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium w-16">순번</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">사건번호</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">사업명</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">사업시행자</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">접수일/재결일</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">담당자</th>
                  <th className="border-r border-[#ccc] py-2 px-3 font-medium">소유자</th>
                  <th className="py-2 px-3 font-medium">관계인</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#ccc] bg-[#ffdddd] hover:bg-[#ffd0d0] cursor-pointer transition-colors">
                  <td className="border-r border-[#ccc] py-2 px-3">1</td>
                  <td className="border-r border-[#ccc] py-2 px-3">26수용0001</td>
                  <td className="border-r border-[#ccc] py-2 px-3">방배동도로개선사업</td>
                  <td className="border-r border-[#ccc] py-2 px-3">방배동재개발조합</td>
                  <td className="border-r border-[#ccc] py-2 px-3">26.03.12</td>
                  <td className="border-r border-[#ccc] py-2 px-3">박00</td>
                  <td className="border-r border-[#ccc] py-2 px-3 text-[#d00000]">홍길동외 3인</td>
                  <td className="py-2 px-3 text-[#d00000]">김둘리외 8인</td>
                </tr>
                {/* Empty rows to fill space matching the design */}
                {[2, 3, 4, 5].map((idx) => (
                  <tr key={idx} className="border-b border-[#ccc] bg-white h-9">
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td className="border-r border-[#ccc]"></td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 text-gray-400">
            <span className="text-2xl leading-none tracking-widest">⋮</span>
          </div>
        </div>
      </div>
    </div>
  );
}
