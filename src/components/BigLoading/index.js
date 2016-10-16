import React from 'react';
import { Loader, Image, Segment } from 'semantic-ui-react';

export default function Item(props) {
  return (
    <Segment>
      <div className='ui active inverted dimmer'>
        <Loader size='massive'>Loading</Loader>
      </div>

      <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png'/>
      <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png'/>
      <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png'/>
    </Segment>
  )
}
