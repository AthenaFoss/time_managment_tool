"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllTasks } from "@/actions/getAllTasks"

interface Task {
  id: string
  title: string
  timeUnder5Min: boolean
  priority: "urgent" | "important" | "normal"
  completed: boolean
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await getAllTasks()
      if ("error" in response) {
        setError(response.error)
      } else {
        setTasks(
          response.map((task) => ({
            id: task.id.toString(),
            title: task.activity,
            priority: task.priority as "urgent" | "important" | "normal",
            completed: task.timeUnder5Min,
            timeUnder5Min: task.timeUnder5Min,
          }))
        )
      }
    }

    fetchTasks()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="uppercase">List of Tasks</CardTitle>
      </CardHeader>
      <CardContent>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>{task.title}</span>
                </div>
                <div className="flex gap-2">
                  {task.timeUnder5Min && <Badge className="bg-green-500">Quick</Badge>}
                  <Badge
                    variant={
                      task.priority === "urgent"
                        ? "destructive"
                        : task.priority === "important"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {task.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
