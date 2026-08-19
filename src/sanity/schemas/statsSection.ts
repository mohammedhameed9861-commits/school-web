import { defineField, defineType } from "sanity";

export const statsSection = defineType({
  name: "statsSection",
  title: "الإحصائيات",
  type: "document",
  fields: [
    defineField({
      name: "stats",
      title: "الأرقام",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "القيمة (مثال: 95%)", type: "string" }),
            defineField({ name: "labelAr", title: "الوصف (عربي)", type: "string" }),
            defineField({ name: "labelEn", title: "Label (English)", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "labelAr" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "الإحصائيات" }),
  },
});
