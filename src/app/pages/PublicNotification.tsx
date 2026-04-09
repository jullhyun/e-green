import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button, Input, Select, Badge, cn } from "../components/ui";
import { useNavigate } from "react-router";


const mockData = [
  { id: "26수용0001", round: "2026-1차", date: "2026.01.02", project: "방배동 도로정비사업", status: "미진행" },
  { id: "26수용0002", round: "2026-1차", date: "2026.01.02", project: "방배동 도로정비사업", status: "진행중" },
  { id: "26수용0003", round: "2026-2차", date: "2026.02.15", project: "강남역 사거리 확장", status: "송달완료" },
  { id: "26수용0004", round: "2026-2차", date: "2026.02.15", project: "강남역 사거리 확장", status: "재송달실패" },
];

export function PublicNotification() {
  const [statusFilter, setStatusFilter] = useState("전체");
  const [searchType, setSearchType] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "미진행": return <Badge variant="danger" className="font-bold bg-red-50 text-red-600 border-red-200">1차송달미진행</Badge>;
      case "1차송달실패": return <Badge variant="danger" className="font-bold bg-red-50 text-red-600 border-red-200">1차송달실패</Badge>;
      case "재송달실패": return <Badge variant="danger" className="font-bold bg-red-50 text-red-600 border-red-200">재송달실패</Badge>;
      case "진행중": return <Badge variant="warning" className="font-bold bg-yellow-50 text-yellow-600 border-yellow-200">송달진행중</Badge>;
      case "송달완료": return <Badge variant="success" className="font-bold bg-green-50 text-green-600 border-green-200">송달완료</Badge>;
      default: return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full relative">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-semibold text-gray-800 tracking-tight">공시송달 - 대상조회</h1>
      </div>

      {/* Search Area */}
<div className="bg-[#f8fafc] p-6 rounded-lg border border-slate-200 shadow-sm flex items-center gap-4 flex-wrap">
  <div className="flex items-center gap-2 text-slate-700 font-semibold min-w-max">
    <Search className="w-5 h-5 text-gray-500" />
    <span>검색조건</span>
  </div>

  <div className="h-8 w-px bg-slate-300" />

  <div className="flex items-center gap-4 bg-white px-4 py-1.5 border border-gray-300 rounded shadow-sm w-fit">
    {["전체", "미접수", "진행중", "송달완료"].map((status) => (
      <label
        key={status}
        className="flex items-center gap-2 cursor-pointer group"
      >
        <input
          type="radio"
          name="status"
          checked={statusFilter === status}
          onChange={() => setStatusFilter(status)}
          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
        />
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            statusFilter === status
              ? "text-blue-700 font-bold"
              : "text-gray-600 group-hover:text-gray-900"
          )}
        >
          {status}
        </span>
      </label>
    ))}
  </div>

  <div className="flex items-center gap-3 bg-white px-3 py-1 border border-gray-300 rounded shadow-sm h-9">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="searchType"
        value="all"
        checked={searchType === "all"}
        onChange={() => setSearchType("all")}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">전체</span>
    </label>

    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name="searchType"
        value="my"
        checked={searchType === "my"}
        onChange={() => setSearchType("my")}
        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
      />
      <span className="text-sm text-gray-700">내 사건</span>
    </label>
  </div>

  <Input
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    placeholder="심의차수 or 사업명 or 사건번호"
    className="flex-1 min-w-[280px] h-10 bg-white"
  />

  <Button className="h-10 px-8 bg-[#1f3f95] hover:bg-[#19357e] text-white">
    검색
  </Button>
</div>
      {/* Table Area */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm custom-scrollbar">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-center font-bold">순번</th>
              <th className="px-6 py-4 font-bold text-center">심의차수</th>
              <th className="px-6 py-4 font-bold text-center">심의일자</th>
              <th className="px-6 py-4 font-bold">사업명</th>
              <th className="px-6 py-4 font-bold text-center">사건번호</th>
              <th className="px-6 py-4 font-bold text-center">공시송달</th>
              <th className="px-6 py-4 font-bold text-center">진행상태</th>
            </tr>
          </thead>
          <tbody>
            {mockData.filter(d => statusFilter === "전체" || d.status === statusFilter || (statusFilter === "미접수" && d.status === "미진행")).map((row, index) => (
              <tr key={row.id} className="bg-white border-b hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-center text-gray-500">{index + 1}</td>
                <td className="px-6 py-4 text-center font-medium text-gray-700">{row.round}</td>
                <td className="px-6 py-4 text-center text-gray-500">{row.date}</td>
                <td className="px-6 py-4 text-gray-900 font-medium">{row.project}</td>
                <td className="px-6 py-4 text-center text-black font-medium">{row.id}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex items-center gap-2 text-slate-700 font-semibold min-w-max">
  <div className="h-6 w-px bg-slate-300" />
  <span>검색조건</span>

</div>
                </td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(row.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}