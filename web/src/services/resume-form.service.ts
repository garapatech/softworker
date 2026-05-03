import type { JsonObject } from '@/services/resume.service'

export type FieldType = 'email' | 'list' | 'text' | 'textarea' | 'url'

export interface FieldDefinition {
  key: string
  label: string
  type?: FieldType
  full?: boolean
  required?: boolean
}

export interface NestedSectionDefinition {
  key: string
  title: string
  fields: FieldDefinition[]
}

export interface ObjectSectionDefinition {
  key: string
  title: string
  fields: FieldDefinition[]
  nested?: NestedSectionDefinition[]
}

export interface ArraySectionDefinition {
  path: string[]
  title: string
  itemTitle: string
  createItem: () => JsonObject
  fields: FieldDefinition[]
}

export const OBJECT_SECTIONS: ObjectSectionDefinition[] = [
  {
    key: 'basics',
    title: 'Informações básicas',
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'label', label: 'Título', required: true },
      { key: 'image', label: 'Foto', type: 'url' },
      { key: 'email', label: 'E-mail', required: true, type: 'email' },
      { key: 'phone', label: 'Telefone', required: true },
      { key: 'url', label: 'Site', type: 'url' },
      { key: 'summary', label: 'Resumo', type: 'textarea', full: true },
    ],
    nested: [
      {
        key: 'location',
        title: 'Localização',
        fields: [
          { key: 'address', label: 'Endereço', type: 'textarea', full: true },
          { key: 'postalCode', label: 'CEP' },
          { key: 'city', label: 'Cidade', required: true },
          { key: 'region', label: 'Região' },
          { key: 'countryCode', label: 'País' },
        ],
      },
    ],
  },
  {
    key: 'meta',
    title: 'Metadados',
    fields: [
      { key: 'canonical', label: 'Canonical', type: 'url' },
      { key: 'version', label: 'Versão' },
      { key: 'lastModified', label: 'Última atualização' },
    ],
  },
]

export const ARRAY_SECTIONS: ArraySectionDefinition[] = [
  {
    path: ['basics', 'profiles'],
    title: 'Perfis',
    itemTitle: 'Perfil',
    createItem: () => ({ network: '', username: '', url: '' }),
    fields: [
      { key: 'network', label: 'Rede', required: true },
      { key: 'username', label: 'Usuário', required: true },
      { key: 'url', label: 'URL', required: true, type: 'url' },
    ],
  },
  {
    path: ['work'],
    title: 'Experiência profissional',
    itemTitle: 'Experiência',
    createItem: () => ({
      description: '',
      endDate: '',
      highlights: [],
      location: '',
      name: '',
      position: '',
      startDate: '',
      summary: '',
      url: '',
    }),
    fields: [
      { key: 'name', label: 'Empresa', required: true },
      { key: 'description', label: 'Descrição curta' },
      { key: 'position', label: 'Cargo', required: true },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'location', label: 'Local' },
      { key: 'startDate', label: 'Início', required: true },
      { key: 'endDate', label: 'Fim' },
      { key: 'summary', label: 'Resumo', type: 'textarea', full: true },
      { key: 'highlights', label: 'Destaques', type: 'list', full: true },
    ],
  },
  {
    path: ['volunteer'],
    title: 'Voluntariado',
    itemTitle: 'Experiência voluntária',
    createItem: () => ({
      endDate: '',
      highlights: [],
      organization: '',
      position: '',
      startDate: '',
      summary: '',
      url: '',
    }),
    fields: [
      { key: 'organization', label: 'Organização', required: true },
      { key: 'position', label: 'Posição', required: true },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'startDate', label: 'Início', required: true },
      { key: 'endDate', label: 'Fim' },
      { key: 'summary', label: 'Resumo', type: 'textarea', full: true },
      { key: 'highlights', label: 'Destaques', type: 'list', full: true },
    ],
  },
  {
    path: ['education'],
    title: 'Formação',
    itemTitle: 'Formação',
    createItem: () => ({
      area: '',
      courses: [],
      endDate: '',
      institution: '',
      score: '',
      startDate: '',
      studyType: '',
      url: '',
    }),
    fields: [
      { key: 'institution', label: 'Instituição', required: true },
      { key: 'area', label: 'Área', required: true },
      { key: 'studyType', label: 'Tipo de curso', required: true },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'startDate', label: 'Início', required: true },
      { key: 'endDate', label: 'Fim' },
      { key: 'score', label: 'Nota' },
      { key: 'courses', label: 'Cursos', type: 'list', full: true },
    ],
  },
  {
    path: ['awards'],
    title: 'Prêmios',
    itemTitle: 'Prêmio',
    createItem: () => ({ awarder: '', date: '', summary: '', title: '' }),
    fields: [
      { key: 'title', label: 'Título', required: true },
      { key: 'date', label: 'Data' },
      { key: 'awarder', label: 'Concedido por' },
      { key: 'summary', label: 'Resumo', type: 'textarea', full: true },
    ],
  },
  {
    path: ['publications'],
    title: 'Publicações',
    itemTitle: 'Publicação',
    createItem: () => ({ name: '', publisher: '', releaseDate: '', summary: '', url: '' }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'publisher', label: 'Publicador', required: true },
      { key: 'releaseDate', label: 'Data de publicação' },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'summary', label: 'Resumo', type: 'textarea', full: true },
    ],
  },
  {
    path: ['skills'],
    title: 'Habilidades',
    itemTitle: 'Habilidade',
    createItem: () => ({ keywords: [], level: '', name: '' }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'level', label: 'Nível' },
      { key: 'keywords', label: 'Palavras-chave', type: 'list', full: true },
    ],
  },
  {
    path: ['languages'],
    title: 'Idiomas',
    itemTitle: 'Idioma',
    createItem: () => ({ fluency: '', language: '' }),
    fields: [
      { key: 'language', label: 'Idioma', required: true },
      { key: 'fluency', label: 'Fluência' },
    ],
  },
  {
    path: ['interests'],
    title: 'Interesses',
    itemTitle: 'Interesse',
    createItem: () => ({ keywords: [], name: '' }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'keywords', label: 'Palavras-chave', type: 'list', full: true },
    ],
  },
  {
    path: ['references'],
    title: 'Referências',
    itemTitle: 'Referência',
    createItem: () => ({ name: '', reference: '' }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'reference', label: 'Texto', required: true, type: 'textarea', full: true },
    ],
  },
  {
    path: ['projects'],
    title: 'Projetos',
    itemTitle: 'Projeto',
    createItem: () => ({
      description: '',
      endDate: '',
      entity: '',
      highlights: [],
      keywords: [],
      name: '',
      roles: [],
      startDate: '',
      type: '',
      url: '',
    }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'description', label: 'Descrição', required: true, type: 'textarea', full: true },
      { key: 'highlights', label: 'Destaques', type: 'list', full: true },
      { key: 'keywords', label: 'Tecnologias', type: 'list', full: true },
      { key: 'startDate', label: 'Início' },
      { key: 'endDate', label: 'Fim' },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'roles', label: 'Papéis', type: 'list', full: true },
      { key: 'entity', label: 'Entidade' },
      { key: 'type', label: 'Tipo' },
    ],
  },
  {
    path: ['certificates'],
    title: 'Certificados',
    itemTitle: 'Certificado',
    createItem: () => ({ date: '', issuer: '', name: '', url: '' }),
    fields: [
      { key: 'name', label: 'Nome', required: true },
      { key: 'date', label: 'Data' },
      { key: 'url', label: 'URL', type: 'url' },
      { key: 'issuer', label: 'Emissor' },
    ],
  },
]

export function sectionKey(section: Pick<ObjectSectionDefinition, 'key'> | Pick<ArraySectionDefinition, 'path'>) {
  return 'key' in section ? section.key : section.path.join('.')
}
