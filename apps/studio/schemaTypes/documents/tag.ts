import { defineType, defineField } from "sanity";

export const tag = defineType({
  name: "tag",
  type: "document",
  title: "Tag",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Tag Title",
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, "-"),
      },
    }),
  ],
});
