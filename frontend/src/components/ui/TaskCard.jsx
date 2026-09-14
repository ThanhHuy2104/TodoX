import React, { useState } from "react";
import { Card } from "./card";
import { Button, Input } from "@base-ui/react";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle2,
  Circle,
  SquarePen,
  Trash2,
} from "lucide-react";
import api from "@/lib/api";
import {toast} from 'sonner'
import axios from "axios";

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditting, setIsEditting] = useState(false);
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "")
  const deleteTask =  async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`)
      toast.success('Nhiệm vụ đã xóa!!!')
      handleTaskChanged();
    } catch (error) {
      console.log('Lỗi xảy ra khi xóa task');
      toast.error('Xóa nhiệm vụ thất bại!!!')
    }
  }

  const updateTask = async () => {
    try {
      setIsEditting(false);
      await api.put(`/tasks/${task._id}`, {title: updateTaskTitle});
      toast.success('Nhiệm vụ được thay đổi thành công!!!')
      handleTaskChanged()
    } catch (error) {
      console.log('Lỗi xảy ra khi đổi task');
      toast.error('Đổi nhiệm vụ thất bại!!!')
    }
  }
  const handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      updateTask();
    }
  }

  const toggleTaskCompleteButton = async () => {
    try {
      if(task.status === 'active') {
        await api.put(`/tasks/${task._id}`, {
          status: 'complete',
          completedAt: new Date().toISOString()
        });
        toast.success(`${task.title} đã hoàn thành!!!`)
      } else {
        await api.put(`/tasks/${task._id}`, {
          status: 'active',
          completedAt: null
        });
        toast.success(`${task.title} đã đổi sang chưa hoàn thành!!!`)
      }
      handleTaskChanged()
    } catch (error) {
      console.log('Lỗi xảy ra khi đổi task');
      toast.error('Đổi nhiệm vụ thất bại!!!')
    }
  }
  return (
    <Card
      className={cn(
        "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
        task.status === "complete" && "opacity-75",
      )}
    >
      <div className="flex items-center gap-4">
        <Button
          onClick={toggleTaskCompleteButton}
          variant="ghost"
          size="icon"
          className={cn(
            "shrink-0 size-8 rounded-full transition-all duration-200",
            (task.status === "complete"
              ? "text-success hover:text-success/80"
              : "text-muted-foreground hover:text-primary"),
          )}
        >
          {task.status === "complete" ? (
            <CheckCircle2 className="size-5 animate-in fade-in zoom-in duration-200" />
          ) : (
            <Circle className="size-5 animate-in fade-in zoom-in duration-200" />
          )}
        </Button>

        <div className="flex-1 min-w-0">
          {isEditting ? (
            <Input
              placeholder="Cần phải làm gì"
              className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50"
              type="text"
              value={updateTaskTitle}
              onChange={(event) => setUpdateTaskTitle(event.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {setIsEditting(false); setUpdateTaskTitle(task.title || ''); updateTask()}}
            />
          ) : (
            <p
              className={cn(
                "text-base transition-all duration-200",
                task.status === "complete"
                  ? "line-through text-muted-foreground"
                  : "text-foreground",
              )}
            >
              {task.title}
            </p>
          )}
          <div className="flex items-center gap-2 mt-1">
            <Calendar className="size-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {new Date(task.createdAt).toLocaleString()}
            </span>
            {task.completedAt && (
              <>
                <span className="text-xs text-muted-foreground">-</span>
                <Calendar className="size-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
            onClick={() => {setIsEditting(true); setUpdateTaskTitle(task.title || '')}}

          >
            <SquarePen className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" onClick={() => deleteTask(task._id)}/>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
