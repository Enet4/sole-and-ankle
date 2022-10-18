import React from 'react';
import styled from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const sale = typeof salePrice === 'number';
  const variant = sale
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price sale={sale}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {sale && (<SalePrice>{formatPrice(salePrice)}</SalePrice>)}
        </Row>
        {variant !== 'default' && (<VariantTip variant={variant}>{{
          'on-sale': 'Sale',
          'new-release': 'Just released!'
        }[variant]}</VariantTip>)}
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 280px;
  max-width: 600px;
`;

const Wrapper = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: #f2f3f3;
  border-radius: 16px 16px 4px 4px;
  padding-top: 40px;
  padding-bottom: 32px;
`;

const Image = styled.img`
  width: 100%;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: ${props => props.sale ? '#60666c': 'inherit'};
  text-decoration: ${props => props.sale ? 'line-through': 'none'};
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const VariantTip = styled.span`
  position: absolute;
  top: 12px;
  right: -4px;
  background-color: ${({variant}) => ({
    'on-sale': '#C5295D',
    'new-release': '#6868D9'
    }[variant])};
  text-align: right;
  border-radius: 2px;
  font-family: 'Raleway';
  font-size: 10pt;
  font-weight: 700;
  line-height: 16px;
  padding: 10px 7px;
  color: #fff;
`;

export default ShoeCard;
