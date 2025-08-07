"use client";
import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./new-event.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { CalendarEvent } from "@/types/calendar";
import { addEventToOrganization } from "../../../actions";

export default function NewEvent({ organizationId, userId }: { userId: string; organizationId: string }) {
  const router = useRouter();
  console.log(organizationId, userId);

  const initialFormData: CalendarEvent = {
    eventDate: "",
    eventName: "",
    eventTime: "",
    relevantRoles: [],
    content: "",
  };

  const [formData, setFormData] = useState<CalendarEvent>(initialFormData);
  const [formState, setFormState] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDropdownChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value;
    if (selectedRole === "Select..." || formData.relevantRoles.includes(selectedRole)) return;

    setFormData((prevState) => ({
      ...prevState,
      relevantRoles: [...prevState.relevantRoles, selectedRole],
    }));
  };

  const removeRole = (role: string) => {
    setFormData((prevState) => ({
      ...prevState,
      relevantRoles: prevState.relevantRoles.filter((r) => r !== role),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dateRegex = /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12]\d|3[01])\/\d{4}$/; // mm/dd/yyyy
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i; // H:MM AM/PM

    if (formData.relevantRoles.length === 0) {
      setFormState("role error");
      return;
    }

    if (!dateRegex.test(formData.eventDate)) {
      setFormState("date error");
      return;
    }

    if (!timeRegex.test(formData.eventTime)) {
      setFormState("time error");
      return;
    }

    await addEventToOrganization(organizationId as string, formData);

    setFormState("Created event");
    // window.location.assign(`/${userId}/${organizationId}/calendar`);
    router.push(`/${userId}/${organizationId}/calendar`);
  };

  return (
    <AccountPageLayout>
      <section>
        <form className={styles.new_shout_form} onSubmit={handleSubmit}>
          <h1>Create New Event</h1>

          <div className={styles.title}>
            <label htmlFor="eventName">Title</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              onChange={handleChange}
              value={formData.eventName}
              required
            />
          </div>

          <div className={styles.event_date}>
            <label htmlFor="eventDate">Event Date (mm/dd/yyyy)</label>
            {formState === "date error" && <p style={{ color: "red" }}>Date must be in mm/dd/yyyy format</p>}
            <input type="text" id="eventDate" name="eventDate" onChange={handleChange} value={formData.eventDate} />
          </div>

          <div className={styles.time}>
            <label htmlFor="eventTime">Time (Specify AM or PM)</label>
            {formState === "time error" && <p style={{ color: "red" }}>Time must be in format H:MM AM/PM</p>}
            <input type="text" id="eventTime" name="eventTime" value={formData.eventTime} onChange={handleChange} />
          </div>

          <div className={styles.content}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              className={styles.content_area}
              onChange={handleChange}
              value={formData.content}
            />
          </div>

          <div className={styles.relevant_roles}>
            <label htmlFor="relevantRoles">Relevant Roles</label>
            {formState === "role error" && <p style={{ color: "red" }}>Must select one role</p>}
            <div className={styles.roles_selected}>
              {formData.relevantRoles.map((role) => (
                <div key={role} className={styles.role}>
                  <p>{role}</p>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => removeRole(role)} />
                </div>
              ))}
            </div>
            <select id="relevantRoles" onChange={handleDropdownChange}>
              <option>Select...</option>
              <option>Guest</option>
              {/* Add more roles as needed */}
            </select>
          </div>

          <div className={styles.buttons}>
            <button type="submit">Create</button>
            <button type="reset" onClick={() => setFormData(initialFormData)}>
              Reset
            </button>
          </div>
        </form>
      </section>
    </AccountPageLayout>
  );
}
