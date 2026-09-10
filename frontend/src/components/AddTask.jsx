import React from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import axios from 'axios'

const AddTask = () => {
  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:3000/api/tasks", { title: "New Task" });
    } catch (error) {
      console.log("Error adding task:", error);
    }
  }
  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className='flex flex-col gap-3 sm:flex-row'>
        <Input type="text" placeholder="Cần phải làm gì?" className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 foucs:ring-primary/20" />
        <Button variant='gradient' size='xl' className='px-6' onClick={handleAddTask}>
          <Plus className='size-5'/>Thêm
        </Button>
      </div>
    </Card>
  )
}

export default AddTask