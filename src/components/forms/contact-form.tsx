"use client";

import { FormEvent, useId, useState } from "react";
import { useTranslations } from "next-intl";

import { apiFetch } from "@/lib/api-client";

type Status = "idle" | "submitting" | "success" | "error";

export interface ContactFormProps {
  className?: string;
}

export const ContactForm = ({ className }: ContactFormProps) => {
  const t = useTranslations("contact.form");
  const tc = useTranslations("common");
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      await apiFetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
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
        <p className="text-xl font-semibold text-status-success">{tc("submitSuccessTitle")}</p>
        <p className="mt-2 text-foreground-muted">{tc("submitSuccessBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col gap-4 rounded-card bg-surface p-6 shadow-sm sm:p-8 ${className ?? ""}`}>
      <div>
        <label htmlFor={`${formId}-name`} className="mb-1.5 block text-sm font-medium">
          {t("nameLabel")}
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          placeholder={t("namePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="mb-1.5 block text-sm font-medium">
          {t("emailLabel")}
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-1.5 block text-sm font-medium">
          {t("messageLabel")}
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          required
          placeholder={t("messagePlaceholder")}
          className="w-full rounded-control border border-border bg-background px-4 py-2.5 text-sm outline-none focus-visible:border-action-primary"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-status-error">
          {tc("submitErrorBody")}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-control bg-action-accent px-6 py-3 text-sm font-semibold text-action-accent-foreground transition-colors duration-[var(--duration-fast)] ease-entrance hover:bg-action-accent-hover disabled:opacity-60"
      >
        {tc("sendMessage")}
      </button>
    </form>
  );
};
