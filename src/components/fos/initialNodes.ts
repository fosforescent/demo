export const initialNodes = {
  root: {
    content: [
      ["{checklist}", "task1"],
    ]
  },
  task1: {
    value: {
      description: "task1",
    },
    content: [
      ["{description}", "{description}"],
      ["{checklist}", "subtask1"]
    ]
  },
  subtask1: {
    value: {
      description: "subtask1",
    },
    content: [
      ["{description}", "{description}"],
    ]
  },
  subtask2: {
    value: {
      description: "task2.1",
    },
    content: [
      ["{description}", "{description}"],
    ]
  },
  subtask3: {
    value: {
      description: "task2.2",
    },
    content: [
      ["{description}", "{description}"],
    ]
  },
  task2: {
    value: {
      description: "task2",
    },
    content: [
      ["{description}", "{description}"],
      ["{checklist}", "subtask2"],
      ["{checklist}", "subtask3"]
    ]
  },

}