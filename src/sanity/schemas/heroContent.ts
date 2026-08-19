import { defineField, defineType } from "sanity";

export const heroContent = defineType({
  name: "heroContent",
  title: "القسم الرئيسي (Hero)",
  type: "document",
  fields: [
    defineField({ name: "badgeAr", title: "النص الصغير فوق العنوان (عربي)", type: "string" }),
    defineField({ name: "badgeEn", title: "Badge Text (English)", type: "string" }),
    defineField({ name: "titleAr", title: "العنوان الرئيسي (عربي)", type: "string" }),
    defineField({ name: "titleEn", title: "Main Title (English)", type: "string" }),
    defineField({ name: "subtitleAr", title: "النص التوضيحي (عربي)", type: "text", rows: 3 }),
    defineField({ name: "subtitleEn", title: "Subtitle (English)", type: "text", rows: 3 }),
    defineField({ name: "primaryBtnAr", title: "نص الزر الأول (عربي)", type: "string" }),
    defineField({ name: "primaryBtnEn", title: "Primary Button (English)", type: "string" }),
    defineField({ name: "secondaryBtnAr", title: "نص الزر الثاني (عربي)", type: "string" }),
    defineField({ name: "secondaryBtnEn", title: "Secondary Button (English)", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "القسم الرئيسي" }),
  },
});
