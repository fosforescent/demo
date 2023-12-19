import { Gantt, Task as GanttTask, ViewMode } from 'gantt-task-react'
import 'gantt-task-react/dist/index.css'
import { INode } from '@/fos'
// import { Duration, DurationUnit } from '../../../lib/fos/dag-implementation/node-data'

export default function GanttComponent({ root }: { root: INode }) {
  // const [tasks, totalDuration] = scheduleTasks(root)
  // if (tasks.length > 0) {
    // return <Gantt tasks={tasks} viewMode={getViewMode(totalDuration)}></Gantt>
  // } else {
    return null
  // }
}

// function scheduleTasks(root: INode): [GanttTask[], Duration] {
//   // DFS
//   const tasks: GanttTask[] = []
//   const endTime = new Date()
//   const stack: [INode, Date][] = [[root, endTime]]
//   let minTime = endTime
//   while (stack.length > 0) {
//     const [node, endTime] = stack.pop() as [INode, Date]
//     if (!node.data.duration) {
//       continue
//     }
//     const startTime = new Date(endTime.getTime() - node.data.duration.getMilliseconds())
//     minTime = startTime < minTime ? startTime : minTime
//     tasks.push({
//       start: startTime,
//       end: endTime,
//       name: node.name,
//       id: node.name,
//       type: 'task',
//       progress: 0,
//       isDisabled: true,
//       styles: { progressColor: '#ffbb54', progressSelectedColor: '#ff9e0d' },
//     })
//     for (const child of node.requires) {
//       stack.push([child, startTime])
//     }
//   }

//   // Shift all times so that the Gantt starts at now
//   const totalDuration = endTime.getTime() - minTime.getTime()
//   for (const task of tasks) {
//     task.start = new Date(task.start.getTime() + totalDuration)
//     task.end = new Date(task.end.getTime() + totalDuration)
//   }

//   return [tasks, Duration.fromMilliseconds(totalDuration)]
// }

// function getViewMode(duration: Duration): ViewMode {
//   switch (duration.unit) {
//     case DurationUnit.Seconds:
//       return ViewMode.Hour
//     case DurationUnit.Minutes:
//       return ViewMode.Hour
//     case DurationUnit.Hours:
//       return ViewMode.Hour
//     case DurationUnit.Days:
//       return ViewMode.Day
//   }
// }
