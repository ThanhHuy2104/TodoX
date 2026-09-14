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
import api from "@/lib/api";
import React from "react";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [dateQuery, setDateQuery] = useState('today')
  const [page, setPage] = useState(1)
  useEffect(() => {
    fetchTasks();
  }, [dateQuery]);

  useEffect(() => {
    setPage(1)
  }, [filter, dateQuery])
  const fetchTasks = async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveCount(res.data.activeCount);
      setCompletedCount(res.data.completeCount);
      console.log("Fetched tasks:", res.data);
    } catch (error) {
      toast.error("Error fetching tasks. Please try again later.");
    }
  };

  const handleNext = () => {
    if(page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if(page > 1) {
      setPage((prev) => prev - 1)
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }
  const filteredTasks = taskBuffer.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "complete";
    return true;
  });

  const handleTaskChanged = () => {
    fetchTasks();
  }

  const visibleTask = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  )

  if(visibleTask.length === 0) {
    handlePrev();
  }

  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit)


  return (
    <div className="min-h-screen w-full bg-[linear-gradient(180deg,#d7e3f0_0%,#ffffff_42%)] relative">
      <div className="relative z-10">
        <div className="container pt-8 mx-auto relative z-10">
          <div className="w-full max-w-2xl mx-auto space-y-6">
            {/* Đầu Trang */}
            <Header />

            {/* Tạo Nhiệm Vụ */}
            <AddTask handleTaskAdded={handleTaskChanged} />

            {/* Thống Kê và Bộ Lọc */}
            <StatsAndFilters filter={filter} setFilter={setFilter} activeTasksCount={activeCount} completedTasksCount={completedCount} />

            {/* Danh Sách Nhiệm Vụ */}
            <TaskList filteredTasks={visibleTask} filter={filter} handleTaskChanged = {handleTaskChanged} />

            {/* Phân Trang và Lọc Theo Date */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <TaskListPagination handleNext={handleNext} handlePrev={handlePrev} handlePageChange={handlePageChange} page={page} totalPages={totalPages}/>
              <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
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
