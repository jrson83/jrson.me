import site from '#data/site.ts'
import lumeCMS from 'lume/cms/mod.ts'

const cms = lumeCMS({
  site,
})

cms.collection({
  name: 'posts',
  description: 'Create, edit or delete the posts of the blog',
  store: 'src:posts/*.md',
  fields: [{
    name: 'title',
    type: 'text',
    label: 'Title of the page',
    attributes: {
      required: true,
      maxlength: 100,
    },
  }, {
    name: 'excerpt',
    type: 'text',
    label: 'Description displayed in post overview',
    attributes: {
      required: true,
      maxlength: 200,
    },
  }, {
    name: 'date',
    type: 'date',
    label: 'Published date',
  }, {
    name: 'draft',
    label: 'Draft',
    type: 'checkbox',
    description: 'If checked, the post will not be published.',
  }, {
    name: 'tags',
    type: 'list',
    label: 'Tags',
    init(field) {
      const { data } = field.cmsContent
      field.options = data.site?.search.values('tags')
    },
  }, {
    name: 'content',
    type: 'markdown',
    label: 'Page content',
  }],
})

cms.upload('uploads: Uploaded files', 'src:assets/images/blog')

export default cms
