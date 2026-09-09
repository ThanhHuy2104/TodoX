import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer"
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#d7e3f0_0%,#ffffff_42%)] relative">
      <div className="relative z-10">
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Đầu Trang */}
            <Header />

            {/* Tạo Nhiệm Vụ */}
            <AddTask />

            {/* Thống Kê và Bộ Lọc */}
            <StatsAndFilters />

            {/* Danh Sách Nhiệm Vụ */}
            <TaskList />

            {/* Phân Trang và Lọc Theo Date */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination />
              <DateTimeFilter />
            </div>

            {/* Chân Trang */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
