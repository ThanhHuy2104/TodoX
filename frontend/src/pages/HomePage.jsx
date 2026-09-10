import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer"
import { useState, useEffect } from "react";
import { Toaster, toast } from "sonner";
import axios from "axios";
import React from "react";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    fetchTasks();
  }, [taskBuffer]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tasks");
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompletedCount(res.data.completedCount);
      console.log("Fetched tasks:", res.data);
    } catch (error) {
      toast.error("Error fetching tasks. Please try again later.");
    }
  };

  const filteredTasks = taskBuffer.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "complete";
    return true;
  });


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
            <StatsAndFilters filter={filter} setFilter={setFilter} activeTasksCount={activeCount} completedTasksCount={completedCount} />

            {/* Danh Sách Nhiệm Vụ */}
            <TaskList filteredTasks={filteredTasks} filter={filter} />

            {/* Phân Trang và Lọc Theo Date */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination />
              <DateTimeFilter />
            </div>

            {/* Chân Trang */}
            <Footer activeTasksCount={activeCount} completedTasksCount={completedCount} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
