// sanity/schemas/author.ts
export default {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'column',
        title: 'Column Title',
        type: 'string',
        description: 'e.g. “Boss Boss” or leave blank if none'
      },
      {
        name: 'slug',
        type: 'slug',
        title: 'Slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'bio',
        type: 'text',
        title: 'Bio',
      },
      {
        name: 'avatar',
        type: 'image',
        title: 'Avatar',
      },
      {
        name: 'userId',
        type: 'string',
        title: 'User ID (from auth system)',
      },
    ],
  }