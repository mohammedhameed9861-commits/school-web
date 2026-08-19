import { defineField, defineType } from "sanity";

// Every editable text block on the About / Academics / Student Life /
// Admissions pages, keyed by a fixed slug the frontend already knows how
// to fetch (`getPageSection(key, locale)`). One flexible schema instead of
// ~18 bespoke ones — not every field applies to every section; each
// component only reads the fields its layout actually uses.
const SECTION_KEYS = [
  { title: "من نحن — قصتنا", value: "about.story" },
  { title: "من نحن — رؤيتنا ورسالتنا", value: "about.visionMission" },
  { title: "من نحن — قيمنا", value: "about.values" },
  { title: "من نحن — نظام ثنائي اللغة", value: "about.bilingual" },
  { title: "الأكاديميات — المنهج الدراسي", value: "academics.curriculum" },
  { title: "الأكاديميات — اللغات", value: "academics.languages" },
  { title: "الأكاديميات — المراحل الدراسية", value: "academics.gradeLevels" },
  { title: "الأكاديميات — طريقة التدريس", value: "academics.teachingApproach" },
  { title: "الأكاديميات — برنامج الذكاء الاصطناعي", value: "academics.aiProgram" },
  { title: "الحياة الطلابية — الأنشطة", value: "studentLife.activities" },
  { title: "الحياة الطلابية — الفعاليات", value: "studentLife.events" },
  { title: "الحياة الطلابية — المشاريع", value: "studentLife.projects" },
  { title: "الحياة الطلابية — المختبرات", value: "studentLife.labs" },
  { title: "الحياة الطلابية — الرياضة", value: "studentLife.sports" },
  { title: "القبول — خطوات التقديم", value: "admissions.steps" },
  { title: "القبول — الأسئلة الشائعة", value: "admissions.faq" },
  { title: "القبول — المتطلبات", value: "admissions.requirements" },
  { title: "القبول — الرسوم الدراسية", value: "admissions.fees" },
];

export const pageSection = defineType({
  name: "pageSection",
  title: "محتوى الصفحات الداخلية",
  type: "document",
  fields: [
    defineField({
      name: "key",
      title: "القسم",
      type: "string",
      options: { list: SECTION_KEYS },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "eyebrowAr", title: "النص الصغير فوق العنوان (عربي)", type: "string" }),
    defineField({ name: "eyebrowEn", title: "Eyebrow (English)", type: "string" }),
    defineField({ name: "titleAr", title: "العنوان (عربي)", type: "string" }),
    defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
    defineField({ name: "subtitleAr", title: "الوصف التوضيحي (عربي)", type: "text", rows: 2 }),
    defineField({ name: "subtitleEn", title: "Subtitle (English)", type: "text", rows: 2 }),
    defineField({
      name: "bodyAr",
      title: "النص الطويل (عربي) — يُستخدم في أقسام: الرسوم، برنامج الذكاء الاصطناعي",
      type: "text",
      rows: 4,
    }),
    defineField({ name: "bodyEn", title: "Body (English)", type: "text", rows: 4 }),
    defineField({
      name: "paragraphs",
      title: "فقرات (تُستخدم في: قصتنا)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "textAr", title: "الفقرة (عربي)", type: "text", rows: 3 }),
            defineField({ name: "textEn", title: "Paragraph (English)", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "textAr" } },
        },
      ],
    }),
    defineField({
      name: "pairLeftTitleAr",
      title: "العمود الأول — العنوان (عربي، تُستخدم في: رؤيتنا/رسالتنا، اللغات)",
      type: "string",
    }),
    defineField({ name: "pairLeftTitleEn", title: "Left column — title (English)", type: "string" }),
    defineField({ name: "pairLeftBodyAr", title: "العمود الأول — النص (عربي)", type: "text", rows: 3 }),
    defineField({ name: "pairLeftBodyEn", title: "Left column — body (English)", type: "text", rows: 3 }),
    defineField({ name: "pairRightTitleAr", title: "العمود الثاني — العنوان (عربي)", type: "string" }),
    defineField({ name: "pairRightTitleEn", title: "Right column — title (English)", type: "string" }),
    defineField({ name: "pairRightBodyAr", title: "العمود الثاني — النص (عربي)", type: "text", rows: 3 }),
    defineField({ name: "pairRightBodyEn", title: "Right column — body (English)", type: "text", rows: 3 }),
    defineField({
      name: "items",
      title: "العناصر (بطاقات/أسئلة/مراحل — حسب القسم)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "titleAr",
              title: "العنوان (عربي) — أو نص السؤال في الأسئلة الشائعة",
              type: "string",
            }),
            defineField({ name: "titleEn", title: "Title (English)", type: "string" }),
            defineField({
              name: "descriptionAr",
              title: "الوصف (عربي) — أو نص الجواب في الأسئلة الشائعة",
              type: "text",
              rows: 3,
            }),
            defineField({ name: "descriptionEn", title: "Description (English)", type: "text", rows: 3 }),
            defineField({
              name: "metaAr",
              title: "نص إضافي (عربي) — مثال: الفئة العمرية في المراحل الدراسية",
              type: "string",
            }),
            defineField({ name: "metaEn", title: "Extra label (English)", type: "string" }),
          ],
          preview: { select: { title: "titleAr", subtitle: "descriptionAr" } },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "key", subtitle: "titleAr" },
  },
});
