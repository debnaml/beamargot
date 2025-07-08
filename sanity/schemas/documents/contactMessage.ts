export default {
    name: 'contactMessage',
    type: 'document',
    title: 'Contact Message',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Name',
      },
      {
        name: 'email',
        type: 'string',
        title: 'Email',
      },
      {
        name: 'message',
        type: 'text',
        title: 'Message',
      },
      {
        name: 'submittedAt',
        type: 'datetime',
        title: 'Submitted At',
        readOnly: true,
      },
    ],
  }