"use client";
import { useState } from "react";
import styles from "./add-task.module.scss";
import { createNewTask } from "@/app/(account)/[userId]/actions";
import { useRouter } from "next/navigation";
export interface UserInputData {
  task: string;
  role: string;
  priority: string;
  deadline: string;
  status: string;
}
export default function AddTask({
  organizationId,
  updateFormVisibility,
  userId,
}: {
  organizationId: string;
  updateFormVisibility: () => void;
  userId: string;
}) {
  const [statusText, setStatusText] = useState("");
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formInputData = new FormData(event.currentTarget);
    const formData = {
      task: formInputData.get("task") as string,
      role: formInputData.get("role") as string,
      priority: formInputData.get("priority") as string,
      deadline: formInputData.get("deadline") as string,
      status: formInputData.get("status") as string,
    };
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if (formData.task.length === 0 || !dateRegex.test(formData.deadline)) {
      setStatusText("Please make sure all input fields are filled correctly");
      return;
    }
    await createNewTask(organizationId, formData, userId);
    updateFormVisibility();
    window.location.reload();
  };

  return (
    <form className={styles.add_task_form} onSubmit={handleSubmit}>
      <div className={styles.task}>
        <label htmlFor="task">Task</label>
        <input type="text" id="task" name="task"></input>
      </div>
      <div className={styles.role}>
        <label htmlFor="role">Role</label>
        <select id="role" name="role">
          <option>Guest</option>
          <option>Owner</option>
        </select>
      </div>
      <div className={styles.priority}>
        <label htmlFor="priority">Priority</label>
        <select id="role" name="priority">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div className={styles.task}>
        <label htmlFor="deadline">Deadline</label>
        <input type="text" id="deadline" name="deadline" placeholder="mm/dd"></input>
      </div>
      <div className={styles.task}>
        <label htmlFor="status">Status</label>
        <select id="role" name="status">
          <option>Not Started</option>
          <option>In Progress</option>
          <option>Complete</option>
        </select>
      </div>
      <div className={styles.submit_area}>
        <button type="submit" className={styles.create_new_task}>
          Add
        </button>
      </div>
      <p>{statusText}</p>
    </form>
  );
}
