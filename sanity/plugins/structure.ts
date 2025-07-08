import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('page').title('Page'),
      S.documentTypeListItem('project').title('Project'),
      S.documentTypeListItem('post').title('Post'), // ✅ add this line
      S.divider(),
      S.documentTypeListItem('settings').title('Settings'),
    ])