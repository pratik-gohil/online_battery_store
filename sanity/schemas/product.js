export default {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: {
        hotspot: true,
      },
    },
    {
      name: "compatible_models",
      title: "Compatible Models",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "rating",
      title: "Rating",
      type: "array",
      description: "Rating Should be between 0 and 5",
      of: [
        {
          type: "number",
          validation: (Rule) =>
            Rule.required()
              .min(0)
              .max(5)
              .warning("Rating Should be between 0 and 5"),
        },
      ],
    },
    {
      name: "brand",
      title: "Brand",
      type: "string",
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 90,
      },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "string",
    },
    {
      name: "capacity",
      title: "Capacity",
      type: "number",
    },
    {
      name: "discount",
      type: "object",
      fields: [
        {
          name: "with_old_battery",
          type: "number",
          title: "With Old Battery",
        },
        {
          name: "without_old_battery",
          type: "number",
          title: "Without Old Battery",
        },
      ],
      validation: (Rule) => Rule.required(),
    },
  ],
};
