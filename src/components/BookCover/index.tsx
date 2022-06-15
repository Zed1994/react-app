import { render } from '@testing-library/react';
import './index.scss';
import React from 'react';
interface IbookCoverProp {
  src: string
}
export default function BookCover (props: IbookCoverProp) {
  return (
    <div className='book-cover'>
      <img src={props.src} alt="" />
    </div>
  )
}