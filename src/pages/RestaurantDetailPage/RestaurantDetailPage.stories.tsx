import { ComponentStory, ComponentMeta } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { rest } from 'msw'

import { BASE_URL } from '../../api'
import { restaurants } from '../../stub/restaurants'
import { cartItems } from '../../stub/cart-items'

import { RestaurantDetailPage } from './RestaurantDetailPage'

export default {
  title: 'Pages/RestaurantDetailPage',
  component: RestaurantDetailPage,
  parameters: {
    layout: 'fullscreen',
    deeplink: {
      route: '/restaurants/1',
      path: '/restaurants/:id',
    },
  },
} as ComponentMeta<typeof RestaurantDetailPage>

const Template: ComponentStory<typeof RestaurantDetailPage> = () => (
  <>
    <RestaurantDetailPage />
    <div id="modal" />
  </>
)

export const Success = Template.bind({})
Success.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=169%3A510',
  },
  msw: [
    rest.get(BASE_URL, (req, res, ctx) => {
      return res(ctx.json(restaurants[0]))
    }),
  ],
}

export const WithItemsInTheCart = Template.bind({})
WithItemsInTheCart.parameters = {
  ...Success.parameters,
  store: {
    initialState: { cart: { items: cartItems } },
  },
}

export const WithModalOpen = Template.bind({})
WithModalOpen.parameters = {
  ...Success.parameters,
}
WithModalOpen.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const item = await canvas.findByText(/Cheeseburger/i)
  await userEvent.click(item)
  await expect(canvas.getByTestId('modal')).toBeInTheDocument()
}

export const Loading = Template.bind({})
Loading.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=2152%3A3158',
  },
  msw: {
    handlers: [
      rest.get(BASE_URL, (req, res, ctx) => {
        return res(ctx.delay('infinite'))
      }),
    ],
  },
}

export const NotFound = Template.bind({})
NotFound.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1097%3A3785',
  },
  msw: {
    handlers: [
      rest.get(BASE_URL, (req, res, ctx) => {
        return res(ctx.status(404))
      }),
    ],
  },
}

export const Error = Template.bind({})
Error.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/3Q1HTCalD0lJnNvcMoEw1x/Mealdrop?node-id=1091%3A4537',
  },
  msw: {
    handlers: [
      rest.get(BASE_URL, (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    ],
  },
}
