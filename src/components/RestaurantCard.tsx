import React from 'react'
import { Link } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import styled, { css } from 'styled-components'
import { Heading } from './typography/Heading'
import { Body } from './typography/Body'
import { Badge } from './Badge'

export type RestaurantCardProps = {
  className?: string
  restaurant: Restaurant
}

export type FoodItem = {
  id: number
  name: string
  description: string
  price: number
}

export type Restaurant = {
  name: string
  id?: string
  mapsUrl?: string
  url?: string
  address?: string
  specialty: string
  photoUrl: string
  isClosed?: boolean
  categories?: string[]
  isLoading?: boolean
  isNew?: boolean
  menu: {
    food: FoodItem[]
    dessert: FoodItem[]
    drinks: FoodItem[]
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  width: 100%;
`

const StyledContent = styled.div(
  ({ theme: { color } }) => css`
    padding: 24px;
    background: ${color.cardBackground};
    border-radius: 0px 0px 8px 8px;
    .review-text {
      color: ${color.reviewText};
    }
  `
)

const NewTag = styled.span`
  position: absolute;
  padding: 8px;
  background: #e5f8bc;
  display: inline-block;
  top: 0.5rem;
  left: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  z-index: 1;
`

const Closed = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 8px 8px 0 0;
  background: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  span {
    color: white;
    line-height: 210px;
  }
`

const RestaurantImage = styled.img<{ $isClosed: boolean }>`
  height: 200px;
  width: 100%;
  border-radius: 8px 8px 0px 0px;
  object-fit: cover;
  filter: ${({ $isClosed }) => ($isClosed ? 'grayscale(1)' : 'none')};
`
const Description = styled(Body)`
  margin-top: 8px;
  margin: 0;
  max-height: 38px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

const RestaurantCardSkeleton = () => (
  <Container>
    <Skeleton height={200} width="100%" />
    <StyledContent>
      <Heading level={4}>
        <Skeleton width="50%" />
      </Heading>
      <Body type="span">
        <Skeleton width="35%" />
      </Body>
      <Description>
        <Skeleton />
      </Description>
      <Body type="span">
        <Skeleton width="25%" height="20px" />
      </Body>
    </StyledContent>
  </Container>
)

export const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  className,
}) => {
  const {
    photoUrl,
    name,
    id,
    specialty,
    isClosed = false,
    isLoading = false,
    isNew = false,
  } = restaurant

  if (isLoading) {
    return <RestaurantCardSkeleton />
  }

  return (
    <Container className={className}>
      {isNew && <NewTag>new</NewTag>}
      <Link
        to={`/restaurants/${id}`}
        style={{ position: 'relative', display: 'flex' }}
      >
        {isClosed && (
          <Closed>
            <Body type="span">This restaurant is closed.</Body>
          </Closed>
        )}
        <RestaurantImage
          $isClosed={isClosed}
          loading="lazy"
          src={photoUrl}
          alt="restaurant"
        />
      </Link>
      <StyledContent>
        <Heading level={4}>{name} </Heading>
        <Body size="S" type="span" className="review-text">
          ★ 4.2 Very Good
        </Body>
        <Description fontWeight="regular">{specialty}</Description>
        {restaurant.categories?.map((category) => (
          <Badge key={category} text={category} />
        ))}
      </StyledContent>
    </Container>
  )
}
