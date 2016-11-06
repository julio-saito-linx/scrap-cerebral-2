export const error_task_stub = {
  _error_details: {
    attempts: 1,
    error: "123",
    error_stack: "Error: 123\n    at Function.task (/home/julio/_git/scrap-cerebral-2/queue/specs/jobs/task_update.js:64:11)\n    at queue.Queue (/home/julio/_git/scrap-cerebral-2/queue/specs/jobs/task_update.js:12:32)\n    at Immediate.<anonymous> (/home/julio/_git/scrap-cerebral-2/node_modules/firebase-queue/dist/lib/queue_worker.js:536:47)\n    at runCallback (timers.js:566:20)\n    at tryOnImmediate (timers.js:546:5)\n    at processImmediate [as _immediateCallback] (timers.js:525:5)",
    previous_state: "spec__job_update_in_progress"
  },
  _progress: 0,
  _state: "error",
  _state_changed: 1476671916960,
  jquery_selector: "1",
  task_name: "1",
  url: "1",
};

export const error_task_list_stub = {
  task_1: error_task_stub,
  task_2: error_task_stub,
  task_3: error_task_stub,
};
