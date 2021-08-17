import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DefaultTemplate } from '../../templates/PageTemplate'

import { CategoryDetailPage } from './CategoryDetailPage'

export default {
  title: 'Pages/CategoryDetailPage',
  component: CategoryDetailPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof CategoryDetailPage>

const Template: ComponentStory<typeof CategoryDetailPage> = () => (
  <DefaultTemplate>
    <CategoryDetailPage />
  </DefaultTemplate>
)

export const Default = Template.bind({})
Default.parameters = {
  deeplink: { route: '/categories/pizza', path: '/categories/:id' },
}

export const Missing = Template.bind({})
Missing.parameters = {
  deeplink: { route: '/categories/wrong', path: '/categories/:id' },
}
