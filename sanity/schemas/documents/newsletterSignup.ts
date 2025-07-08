// sanity/schemas/newsletterSignup.ts
export default {
    name: 'newsletterSignup',
    title: 'Newsletter Signup',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required().email(),
      },
      {
        name: 'subscribedAt',
        title: 'Subscribed At',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
      },
    ],
  }