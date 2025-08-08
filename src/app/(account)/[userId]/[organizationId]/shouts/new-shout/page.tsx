"use client";
import AccountPageLayout from "@/components/account-pages/account-page-layout";
import styles from "./new-shout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { createNewShout } from "../../../actions";

export default function NewShout() {
  const params = useParams();
  const { userId, organizationId } = params;
  const initialFormData = {
    title: "",
    content: "",
    roles: [] as string[],
  };
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    roles: string[];
  }>(initialFormData);
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
    if (selectedRole === "Select...") return;

    setFormData((prevState) => {
      if (prevState.roles.includes(selectedRole)) {
        return prevState;
      }
      return {
        ...prevState,
        roles: [...prevState.roles, selectedRole],
      };
    });
  };

  const removeRoles = (role: string) => {
    setFormData((prevState) => ({
      ...prevState,
      roles: prevState.roles.filter((r) => r !== role),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.roles.length === 0) {
      setFormState("Choose at least 1 relevant role");
      return;
    } else {
      await createNewShout(organizationId as string, formData.content, formData.title, formData.roles);
      setFormState("Created shout");
      window.location.assign(`/${userId}/${organizationId}/shouts`);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setFormState("");
  };

  return (
    <AccountPageLayout>
      <section>
        <form className={styles.new_shout_form} onSubmit={handleSubmit}>
          <h1>Create New Shout</h1>
          <div className={styles.title}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={handleChange} value={formData.title} name="title" required />
          </div>
          <div className={styles.content}>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              className={styles.content_area}
              onChange={handleChange}
              value={formData.content}
              name="content"
              required
            />
          </div>
          <div className={styles.relevant_roles}>
            <label htmlFor="relevant-roles">Relevant Roles</label>
            <div className={styles.roles_selected}>
              {formData.roles.map((role) => (
                <div key={role} className={styles.role}>
                  <p>{role}</p>
                  <FontAwesomeIcon icon={faCircleXmark} onClick={() => removeRoles(role)} />
                </div>
              ))}
            </div>
            <select id="relevant-roles" onChange={handleDropdownChange}>
              <option>Select...</option>
              <option>Owner</option>
              <option>Guest</option>
            </select>
          </div>
          <div className={styles.buttons}>
            <button type="submit">Post</button>
            <button type="reset" onClick={handleReset}>
              Reset
            </button>
          </div>
          <p>{formState}</p>
        </form>
      </section>
    </AccountPageLayout>
  );
}
