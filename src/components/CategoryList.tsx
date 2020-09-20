import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Category } from './Category'
import { CATEGORIES } from '../constants'
import { breakpoints } from '../styles/breakpoints'

type Category = {
  title: string
  photoUrl: string
}

export type CategoryListProps = {
  categories: Category[]
}

const StyledContainer = styled.div`
  gap: 12px;
  display: grid;
  padding-bottom: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));

  @media ${breakpoints.M} {
    gap: 24px;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  @media ${breakpoints.XL} {
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  }
`

export const CategoryList = ({ categories }: CategoryListProps) => {
  return (
    <StyledContainer>
      {categories.map((category) => (
        <Link to={`/categories/${category.title}`}>
          <Category {...category} title={CATEGORIES[category.title]} />
        </Link>
      ))}
    </StyledContainer>
  )
}
