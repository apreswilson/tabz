export type Task = {
  taskName: string;
  roles: string;
  priority: string;
  deadline: string;
  status: string;
};

export type OrgWithTasks = {
  tasks: Task[];
} | null;
