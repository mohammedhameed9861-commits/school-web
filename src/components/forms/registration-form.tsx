"use client";

import { FormEvent, useId, useState } from "react";
import { useTranslations } from "next-intl";

import { apiFetch } from "@/lib/api-client";

const GRADES = ["g7", "g8", "g9", "g10", "g11", "g12", "other"] as const;

type Status = "idle" | "submitting" | "success" | "error";

export interface RegistrationFormProps {
  className?: string;
}

export const RegistrationForm = ({ className }: RegistrationFormProps) => {
  const t = useTranslations("registrationForm");
  const tc = useTranslations("common");
  const tg = useTranslations("grades");
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await apiFetch("/api/admissions", {
        method: "POST",
        body: JSON.stringify({
          studentName: data.get("studentName"),
          parentName: data.get("parentName"),
          phone: data.get("phone"),
          email: data.get("email"),
          gradeLevel: data.get("gradeLevel"),
          message: data.get("message"),
        }),
      });
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className={`rounded-card border border-status-success/30 bg-surface p-8 text-center ${className ?? ""}`}
      >
        <p className="text-xl font-semibold text-status-success">
          {tc("submitSuccessTitle")}
        </p>
        <p className="mt-2 text-foreground-muted">{tc("submitSuccessBody")}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`grid gap-4 rounded-card bg-surface p-6 shadow-sm sm:grid-cols-2 sm:p-8 ${className ?? ""}`}
    >
      <div className="sm:col-span-1">
        <label htmlFor={`${formId}-studentName`} className="mb-1.5 block text-sm font-medium">
          {t("studentNameLabel")}
        </label>
        <input
          id={`${formId}-studentName`}
          name="studentName"
          type="text"
          required
          placeholder={t("studentNamePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${formId}-parentName`} className="mb-1.5 block text-sm font-medium">
          {t("parentNameLabel")}
        </label>
        <input
          id={`${formId}-parentName`}
          name="parentName"
          type="text"
          required
          placeholder={t("parentNamePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${formId}-phone`} className="mb-1.5 block text-sm font-medium">
          {t("phoneLabel")}
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          required
          placeholder={t("phonePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div className="sm:col-span-1">
        <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
          {t("emailLabel")}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${formId}-gradeLevel`} className="mb-1.5 block text-sm font-medium">
          {t("gradeLevelLabel")}
        </label>
        <select
          id={`${formId}-gradeLevel`}
          name="gradeLevel"
          required
          defaultValue=""
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        >
          <option value="" disabled>
            {t("gradeLevelPlaceholder")}
          </option>
          {GRADES.map((grade) => (
            <option key={grade} value={grade}>
              {tg(grade)}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
          {t("messageLabel")}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="sm:col-span-2 text-sm text-status-error">
          {tc("submitErrorBody")}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-control bg-action-accent px-6 py-3 text-sm font-semibold text-action-accent-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-accent-hover disabled:opacity-60 sm:w-auto"
        >
          {tc("submit")}
        </button>
      </div>
    </form>
  );
};
